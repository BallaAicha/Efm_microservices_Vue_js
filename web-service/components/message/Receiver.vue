<template>
    <div>
      <h1>WebSocket Receiver : {{  recipient.userId }}</h1>
      <div>
        <p v-if="isConnected">🟢 Connecté</p>
        <p v-else>🔴 Déconnecté</p>
      </div>
      <div class="mt-3">
        <h2>Messages reçus :</h2>
        <v-card variant="tonal" :color="msg.senderId === user.id ? 'primary' : 'grey'" v-for="(msg, index) in messages" :key="index" class="pa-3 mt-2">
          <div>{{ msg.content }}</div>
          <div>{{ msg.senderName }}</div>
        </v-card>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Client } from "@stomp/stompjs";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";

const props = defineProps<{
  recipient: ListingInterface
}>();

const { user } = storeToRefs(useAuthStore());

const config = useRuntimeConfig();
const wsEndpoint = config.public.apiUrl + "/auth/ws/websocket";
const token = useCookie("access_token").value;
// const recipientId = user.value.id;
// const recipientId = "8d1d6be7-790b-4bd6-b096-643c41b86e21";
const topic = `/topic/messages/${user.value.id}`;

const isConnected = ref(false);
const messages = ref([]);
let client;

const connectWebSocket = () => {
  client = new Client({
    brokerURL: wsEndpoint,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: function (str) {
      console.log(str);
    },
    onConnect: () => {
      isConnected.value = true;
      client.subscribe(topic, (message) => {
        messages.value.push(JSON.parse(message.body));
      });
    },
    onStompError: (frame) => {
      console.error("Erreur STOMP: ", frame.headers["message"]);
    },
    onDisconnect: () => {
      isConnected.value = false;
    },
  });

  client.activate();
};

const disconnectWebSocket = () => {
  if (client) {
    client.deactivate();
  }
};

onMounted(() => {
  connectWebSocket();
});

onBeforeUnmount(() => {
  disconnectWebSocket();
});
</script>

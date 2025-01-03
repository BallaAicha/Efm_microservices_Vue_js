<template>
  <div class="border pa-3">
    <h1>WebSocket Receiver</h1>
    <div>
      <p v-if="isConnected">🟢 Connecté</p>
      <p v-else>🔴 Déconnecté</p>
    </div>
    <div class="mt-3">
      <h2>Messages reçus :</h2>
      <v-card
        variant="tonal"
        :color="msg.senderId === user?.id ? 'primary' : 'grey-darken-3'"
        v-for="(msg, index) in messages"
        :key="index"
        class="pa-3 mt-2 d-flex flex-column align-end"
      >
        <div>{{ msg.content }}</div>
        <div
          v-if="msg.senderId !== user?.id"
          @click="emit('selectedRecipient', msg.senderId)"
          class="d-flex align-center ga-2 reply"
        >
          <v-icon icon="mdi-arrow-left-top" size="small"></v-icon>
          <div>{{ msg.senderName }}</div>
        </div>
        <div v-else>
          <div>{{ msg.senderName }}</div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Client } from "@stomp/stompjs";

const emit = defineEmits(["selectedRecipient"]);

const { user } = storeToRefs(useAuthStore());

const config = useRuntimeConfig();
const wsEndpoint = config.public.apiUrl + "/auth/ws/websocket";
const token = useCookie("access_token").value;
const topic = `/topic/messages/${user.value?.id}`;

const isConnected = ref(false);
const messages = ref<any>([]);
let client: Client;

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

<style lang="scss">
.reply {
  cursor: pointer;
}
</style>

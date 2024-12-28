<template>
  <v-container>
    <div>
      <h1>WebSocket Receiver</h1>
      <div>
        <p v-if="isConnected">🟢 Connecté</p>
        <p v-else>🔴 Déconnecté</p>
      </div>
      <div class="mt-3">
        <h2>Messages reçus :</h2>
        <v-card variant="tonal" color="primary" v-for="(msg, index) in messages" :key="index" class="pa-3 mt-2">
          {{ msg }}
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Client } from "@stomp/stompjs";

const config = useRuntimeConfig();
const wsEndpoint = config.public.apiUrl + "/auth/ws/websocket";
const token = useCookie("access_token").value;
const recipientId = "8d1d6be7-790b-4bd6-b096-643c41b86e21";
const topic = `/topic/messages/${recipientId}`;

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
        messages.value.push(JSON.parse(message.body).content);
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

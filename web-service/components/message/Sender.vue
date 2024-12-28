<template>
  <v-container>
    <div>
      <h1>WebSocket Sender</h1>
      <div>
        <p v-if="isConnected">🟢 Connecté</p>
        <p v-else>🔴 Déconnecté</p>
      </div>
      <div class="d-flex align-center mt-3 ga-4">
        <v-textarea
          v-model="messageToSend"
          variant="solo-filled"
          elevation="0"
          rows="1"
          flat
          hide-details
          placeholder="Tapez un message..."
          max-rows="3"
          auto-grow
          @keyup.enter="createTopicAndSendMessage"
          class="input-container__textarea"
        ></v-textarea>
        <v-btn
          icon="mdi-send"
          variant="plain"
          class="input-container__btn"
          @click="createTopicAndSendMessage"
        ></v-btn>
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

const isConnected = ref(false);
const messageToSend = ref("");
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

const createTopicAndSendMessage = () => {
  if (isConnected.value && messageToSend.value) {
    const recipientId = "8d1d6be7-790b-4bd6-b096-643c41b86e21";
    const topic = `/topic/messages/${recipientId}`;
    const chatMessage = {
      content: messageToSend.value,
      senderId: "SENDER_ID", // Remplacez par l'ID de l'expéditeur
      recipientId,
      tstamp: new Date().getTime().toString(),
    };

    client.publish({
      destination: `/app/chat/${recipientId}`,
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(chatMessage),
    });

    messageToSend.value = "";
  }
};

onMounted(() => {
  connectWebSocket();
});

onBeforeUnmount(() => {
  disconnectWebSocket();
});
</script>

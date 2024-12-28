<template>
  <v-container>
    <div>
      <h1>WebSocket Test</h1>
      <div>
        <p v-if="isConnected">🟢 Connecté</p>
        <p v-else>🔴 Déconnecté</p>
      </div>
      <div>
        <h2>Messages reçus :</h2>
        <ul>
          <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
        </ul>
      </div>
      <div>
        <input
          v-model="messageToSend"
          type="text"
          placeholder="Écrivez un message"
        />
        <button @click="sendMessage">Envoyer</button>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Client } from "@stomp/stompjs";

const config = useRuntimeConfig();
const wsEndpoint = config.public.apiUrl + "/auth/ws/websocket"; // Remplacez par votre URL WebSocket
const token = useCookie("access_token").value;
const recipientId = "8d1d6be7-790b-4bd6-b096-643c41b86e21";
const topic = `/topic/messages/${recipientId}`; // Remplacez par votre topic

const isConnected = ref(false);
const messages = ref([]);
const messageToSend = ref("");
let client;

const connectWebSocket = () => {
  client = new Client({
    brokerURL: wsEndpoint,
    connectHeaders: {
      // Ajoutez des headers si nécessaire
      Authorization: `Bearer ${token}`,
    },
    debug: function (str) {
      console.log(str);
    },
    onConnect: () => {
      isConnected.value = true;
      client.subscribe(topic, (message) => {
        messages.value.push(message.body);
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

const sendMessage = () => {
  if (isConnected.value && messageToSend.value) {
    const chatMessage = {
      content: messageToSend.value,
      senderId: recipientId, // ID de l'utilisateur actuel comme expéditeur
      recipientId: recipientId,
      senderName: "Annonceur", // Nom de l'expéditeur
      // chatChannel: this.currentChatChannel,
      tstamp: new Date().getTime().toString(), // Timestamp du message
    };

    client.publish({
      destination: `/app/chat/${recipientId}`, // Remplacez par votre endpoint d'envoi
      headers: { Authorization: `Bearer ${token}` },
      // body: messageToSend.value,
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

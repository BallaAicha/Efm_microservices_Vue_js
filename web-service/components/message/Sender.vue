<template>
    <div class="border pa-3">
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
</template>

<script lang="ts" setup>
import { Client } from "@stomp/stompjs";

const props = defineProps<{
  recipientId: string
}>();

const config = useRuntimeConfig();
const wsEndpoint = config.public.apiUrl + "/auth/ws/websocket";
const token = useCookie("access_token").value;

const isConnected = ref(false);
const messageToSend = ref("");
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

const { user } = storeToRefs(useAuthStore());

const createTopicAndSendMessage = () => {
  if (isConnected.value && messageToSend.value && user.value) {
    // const topic = `/topic/messages/${props.recipient.userId}`;
    const chatMessage = {
      content: messageToSend.value,
      senderName: user.value.firstName + ' ' + user.value.lastName,
      senderId: user.value.id,
      recipientId: props.recipientId,
      tstamp: new Date().getTime().toString(),
    };

    client.publish({
      destination: `/app/chat/${props.recipientId}`,
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

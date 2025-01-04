<template>
    <!-- Champ d'envoi -->
    <div
      class="input-container d-flex align-center pa-4 ga-4"
      :class="[themeStore.isDark ? 'bg-surface' : 'bg-grey-lighten-1']"
    >
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
</template>

<script lang="ts" setup>
import { Client } from "@stomp/stompjs";
const themeStore = useThemeStore();

const props = defineProps<{
  recipientId: string;
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
      senderName: user.value.firstName + " " + user.value.lastName,
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

<style lang="scss" scoped>
.discussion-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  /* Masquer scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer */
}

.messages::-webkit-scrollbar {
  display: none; /* Webkit */
}

.message {
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  position: relative;
  line-height: 1.5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &.sent {
    align-self: flex-end;
    background-color: color.adjust($primary, $lightness: 15%);
    color: $light;
  }

  &.received {
    align-self: flex-start;
    background-color: $light;
    color: $dark;
  }
}

.input-container {
//   border-top: 1px solid rgba(0, 0, 0, 0.12);

  .input-container__btn {
    transition: all 0.3s;

    &:hover {
      transform: rotate(-90deg) scale(1.25);
      color: $primary;
    }
  }
}
</style>
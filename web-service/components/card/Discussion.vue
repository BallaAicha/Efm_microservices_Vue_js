<template>
  <div
    class="discussion-container"
    :class="[themeStore.isDark ? 'bg-surface' : 'bg-grey-lighten-2']"
  >
    <!-- Liste des messages -->
    <div ref="messageContainer" class="messages">
      <div
        v-for="(message, i) in messages"
        :key="i"
        :class="['message', message.senderId === user?.id ? 'sent' : 'received']"
      >
        <p>{{ message.content }}</p>
        <p class="text-caption d-block text-end">
          {{ formatTimestamp(message.tstamp) }}
        </p>
      </div>
    </div>

    <!-- Champ d'envoi -->
    <div
      class="input-container d-flex align-center pa-4 ga-4"
      :class="[themeStore.isDark ? 'bg-surface' : 'bg-grey-lighten-2']"
    >
      <v-textarea
        v-model="newMessage"
        variant="solo-filled"
        elevation="0"
        rows="1"
        flat
        hide-details
        placeholder="Tapez un message..."
        max-rows="3"
        auto-grow
        @keyup.enter="sendMessage"
        class="input-container__textarea"
      ></v-textarea>
      <v-btn
        icon="mdi-send"
        variant="plain"
        class="input-container__btn"
        @click="sendMessage"
      ></v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Client } from "@stomp/stompjs";
import anime from "animejs";
import type { MessageInterface } from "~/interfaces/message.interface";

const props = defineProps<{
  recipientId: string;
}>();

const themeStore = useThemeStore();

// Données
const messages = ref<MessageInterface[]>([]);
const newMessage = ref("");

// Référence au conteneur des messages
const messageContainer = ref<HTMLElement | null>(null);

// WebSocket Configuration
const config = useRuntimeConfig();
const wsEndpoint = config.public.apiUrl + "/auth/ws/websocket"; // Replacez par votre URL WebSocket
const token = useCookie("access_token").value;

// ID du topic
// const recipientId = "8d1d6be7-790b-4bd6-b096-643c41b86e21";
const topic = `/topic/messages/${props.recipientId}`;

// WebSocket Client
let client: Client;

// Scroller vers le bas
const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

const { user } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const chatMessage = ref<MessageInterface>({
  senderId: user.value?.id || "",
  recipientId: props.recipientId,
  senderName: "me",
  tstamp: new Date().toISOString(),
  content: "",
});

// Envoyer un message via WebSocket
const sendMessage = () => {
  if (newMessage.value.trim()) {
    chatMessage.value = {
      senderId: user.value?.id || "",
      recipientId: props.recipientId,
      senderName: "me",
      tstamp: new Date().toISOString(),
      content: newMessage.value,
    };

    // Envoyer le message via WebSocket
    if (client?.connected) {
      client.publish({
        destination: `/app/chat/${props.recipientId}`,
        body: JSON.stringify(chatMessage),
      });

      // Ajouter localement pour feedback instantané
      messages.value.push(chatMessage.value);

      // Animation ciblant uniquement le dernier message envoyé
      nextTick(() => {
        const lastMessage = document.querySelector(".message.sent:last-child");
        if (lastMessage) {
          anime({
            targets: lastMessage,
            opacity: [0, 1],
            translateX: [200, 0],
            duration: 500,
            easing: "easeOutQuad",
          });
        }
      });

      newMessage.value = "";
      nextTick(scrollToBottom); // Scroller après le rendu
    }
  }
};

// Recevoir un message via WebSocket
const onMessageReceived = (message: any) => {
  const parsedMessage = JSON.parse(message.body);
  messages.value.push(parsedMessage);

  // Animation pour l'apparition du message reçu
  nextTick(() => {
    const lastMessage = document.querySelector(".message.received:last-child");
    if (lastMessage) {
      anime({
        targets: lastMessage,
        opacity: [0, 1],
        translateX: [-200, 0],
        duration: 500,
        easing: "easeOutQuad",
      });
    }
  });

  nextTick(scrollToBottom); // Scroller après le rendu
};

// Connexion WebSocket
const connectWebSocket = () => {
  client = new Client({
    brokerURL: wsEndpoint,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str) => console.log(str),
    onConnect: () => {
      // S'abonner au topic
      client.subscribe(topic, onMessageReceived);
    },
    onStompError: (frame) => {
      console.error("Erreur STOMP: ", frame.headers["message"]);
    },
  });

  client.activate();
};

// Déconnexion WebSocket
const disconnectWebSocket = () => {
  if (client) {
    client.deactivate();
  }
};

// Scroller au bas à l'initialisation
onMounted(() => {
  connectWebSocket();
  nextTick(scrollToBottom);
});

// Déconnexion lors du démontage
onBeforeUnmount(() => {
  disconnectWebSocket();
});

// Formater le timestamp
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
};
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
  border-top: 1px solid rgba(0, 0, 0, 0.12);

  .input-container__btn {
    transition: all 0.3s;

    &:hover {
      transform: rotate(-90deg) scale(1.25);
      color: $primary;
    }
  }
}
</style>

<template>
  <!-- Liste des messages -->
  <div ref="messageContainer" class="messages">
    <div
      v-for="(message, i) in messages"
      :key="i"
      :class="['message', message.senderId === user?.id ? 'sent' : 'received']"
    >
      <p>{{ message.content }}</p>
      <p class="text-caption d-block text-end">
        {{ convertTimestampToTime(message.tstamp) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Client } from "@stomp/stompjs";
import type { MessageInterface } from "~/interfaces/message.interface";
const themeStore = useThemeStore();
import anime from "animejs";

const emit = defineEmits(["selectedRecipient"]);

const { user } = storeToRefs(useAuthStore());

const config = useRuntimeConfig();
const wsEndpoint = config.public.apiUrl + "/auth/ws/websocket";
const token = useCookie("access_token").value;
const topic = `/topic/messages/${user.value?.id}`;

// Référence au conteneur des messages
const messageContainer = ref<HTMLElement | null>(null);

// Scroller vers le bas
const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

const props = defineProps<{
  messages: MessageInterface[];
  //   messages: any[];
}>();

const isConnected = ref(false);
// const messages = ref<any>([]);
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
        const parsedMessage = JSON.parse(message.body);
        props.messages.unshift(parsedMessage);

        // Animation pour les messages
        nextTick(() => {
          const lastMessage = document.querySelector(".message:first-child");
          if (lastMessage) {
            if (parsedMessage.senderId !== user.value?.id) {
              // Animation pour les messages reçus
              anime({
                targets: lastMessage,
                opacity: [0, 1],
                translateX: [-200, 0],
                duration: 500,
                easing: "easeOutQuad",
              });
            } else {
              // Animation pour les messages envoyés
              anime({
                targets: lastMessage,
                opacity: [0, 1],
                translateX: [200, 0],
                duration: 500,
                easing: "easeOutQuad",
              });
            }
          }
        });

        nextTick(scrollToBottom); // Scroller après le rendu
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
  nextTick(scrollToBottom);
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
  flex-direction: column-reverse;
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

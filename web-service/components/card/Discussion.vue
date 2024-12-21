<template>
  <div
    class="discussion-container"
    :class="[themeStore.isDark ? 'bg-surface' : 'bg-grey-lighten-2']"
  >
    <!-- Liste des messages -->
    <div ref="messageContainer" class="messages">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['message', message.sender === 'me' ? 'sent' : 'received']"
      >
        <p>{{ message.text }}</p>
        <p class="text-caption d-block text-end">
          {{ formatTimestamp(message.timestamp) }}
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
const themeStore = useThemeStore();

import { ref, onMounted, nextTick } from "vue";
import discussionData from "~/data/discussions.json";

import anime from "animejs";

// Données
const messages = ref([...discussionData]); // Charger les messages depuis le JSON
const newMessage = ref("");

// Référence au conteneur des messages
const messageContainer = ref<HTMLElement | null>(null);

// Scroller vers le bas
const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

// Envoyer un message
const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: messages.value.length + 1,
      text: newMessage.value.trim(),
      sender: "me",
      timestamp: new Date().toISOString(),
    });

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
};

// Fonction pour recevoir un message
const receiveMessage = () => {
  const message = {
    id: messages.value.length + 1,
    text: "Message automatique reçu. " + new Date().toISOString(),
    sender: "other",
    timestamp: new Date().toISOString(),
  };

  messages.value.push(message);

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

  //   scrollToBottom(); // Scroller après l'animation
  nextTick(scrollToBottom); // Scroller après le rendu
};

// Scroller au bas à l'initialisation
onMounted(() => {
  scrollToBottom();
  setInterval(receiveMessage, 60000);
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

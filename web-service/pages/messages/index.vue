<template>
  <v-container>
    <div class="chat-container">
      <h1>Conversation</h1>
      <div class="messages">
        <div v-for="(msg, index) in messages" :key="index" class="message">
          {{ msg }}
        </div>
      </div>
      <div class="input-container">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
        <button @click="sendMessage">Envoyer</button>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const messages = ref<string[]>([]);
const newMessage = ref<string>("");
let socket: WebSocket | null = null;

const connectWebSocket = () => {
  socket = new WebSocket("ws://localhost:6700/ws");

  socket.onopen = () => console.log("WebSocket connected");
  socket.onmessage = (event) => {
    messages.value.push(event.data);
  };
  socket.onerror = (error) => console.error("WebSocket error:", error);
  socket.onclose = () => console.log("WebSocket disconnected");
};

const sendMessage = () => {
  if (socket && newMessage.value.trim()) {
    socket.send(newMessage.value);
    newMessage.value = "";
  }
};

onMounted(connectWebSocket);
onBeforeUnmount(() => {
  if (socket) {
    socket.close();
  }
});

// const socket = new WebSocket("ws://localhost:6700/ws");

// onMounted(() => {
//   socket.onopen = () => {
//     console.log("WebSocket connection established");
//     socket.send("Hello Server!");
//   };

//   socket.onmessage = (event) => {
//     console.log("Message from server:", event.data);
//   };

//   socket.onerror = (error) => {
//     console.error("WebSocket error:", error);
//   };

//   socket.onclose = () => {
//     console.log("WebSocket connection closed");
//   };
// });
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.message {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.input-container {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 3px;
}

button:hover {
  background-color: #0056b3;
}
</style>

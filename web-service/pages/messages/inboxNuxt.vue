<template>
  <div>
    <h1>Boîte de réception des messages</h1>

    <ClientOnly>
      <div id="messages">
        <h2>Messages reçus :</h2>
        <ul id="message-list">
          <li v-for="message in receivedMessages" :key="message.tstamp">
            <strong>De :</strong> {{ message.senderName }} <br />
            <strong>Message :</strong> {{ message.content }} <br />
            <strong>À propos de :</strong> Listing ID {{ message.listingId }} <br />
            <span><em>Reçu à : {{ new Date(parseInt(message.tstamp)).toLocaleString() }}</em></span><br />
            <button @click="selectRecipient(message.senderId, message.senderName, message.chatChannel)">
              Répondre
            </button>
          </li>
        </ul>
      </div>

      <div id="reply-box" v-if="selectedRecipientId">
        <h2>Répondre à : {{ selectedRecipientName }}</h2>
        <textarea v-model="replyMessage" placeholder="Tapez votre message..."></textarea><br />
        <button @click="sendReply">Envoyer</button>
      </div>

      <template #fallback>
        <p>Chargement de la messagerie...</p>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from "~/interfaces/chat";

const token = useCookie("access_token");
const recipientId = ref('votre-recipient-id')
const selectedRecipientId = ref<string | null>(null)
const selectedRecipientName = ref<string | null>(null)
const currentChatChannel = ref<string | null>(null)
const replyMessage = ref('')

const { stompClient, receivedMessages, connectWebSocket, disconnectWebSocket } = useWebSocket()

// Sélectionner un destinataire pour répondre
const selectRecipient = (recipientId: string, recipientName: string, chatChannel: string) => {
  selectedRecipientId.value = recipientId
  selectedRecipientName.value = recipientName
  currentChatChannel.value = chatChannel
}

// Envoyer une réponse
const sendReply = () => {
  if (!replyMessage.value || !selectedRecipientId.value || !currentChatChannel.value) {
    alert("Veuillez sélectionner un destinataire et entrer un message !")
    return
  }

  const chatMessage: ChatMessage = {
    content: replyMessage.value,
    senderId: recipientId.value,
    recipientId: selectedRecipientId.value,
    senderName: 'Annonceur',
    chatChannel: currentChatChannel.value,
    tstamp: new Date().getTime().toString(),
    listingId: '12345',
  }

  stompClient.value?.publish({
    destination: `/app/chat/${selectedRecipientId.value}`,
    headers: { Authorization: `Bearer ${token.value}` },
    body: JSON.stringify(chatMessage),
  })

  // Réinitialisation
  replyMessage.value = ''
  selectedRecipientId.value = null
  selectedRecipientName.value = null
  currentChatChannel.value = null
}

// Connexion WebSocket au montage du composant (côté client uniquement)
onMounted(() => {
  connectWebSocket(recipientId.value)
})

// Déconnexion propre lors du démontage
onUnmounted(() => {
  disconnectWebSocket()
})
</script>
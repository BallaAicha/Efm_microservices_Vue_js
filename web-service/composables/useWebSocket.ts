// // composables/useWebSocket.ts
// import { ref } from 'vue'
// import type { Client as Stomp } from '@stomp/stompjs'
// import type { ChatMessage } from '~/interfaces/chat'

// export function useWebSocket() {
//   const stompClient = ref<Stomp | null>(null)
//   const receivedMessages = ref<ChatMessage[]>([])
//   const isConnected = ref(false)
//   const config = useRuntimeConfig();
//   const apiUrl = config.public.apiUrl + "/ws";
//   const token = useCookie("access_token").value;

//   const connectWebSocket = async (recipientId: string) => {
//     // Vérifier si on est côté client
//     if (process.server) return

//     const { $createStompClient } = useNuxtApp()
    
//     try {
//       stompClient.value = $createStompClient(`${apiUrl}`)
      
//       stompClient.value.connectHeaders = {
//         Authorization: `Bearer ${token}`,
//       }

//       stompClient.value.onConnect = () => {
//         console.log("Connexion établie au serveur STOMP.")
//         isConnected.value = true
        
//         const topic = `/topic/messages/${recipientId}`
//         stompClient.value?.subscribe(topic, (message) => {
//           const parsedMessage: ChatMessage = JSON.parse(message.body)
//           receivedMessages.value.push(parsedMessage)
//         })
//       }

//       stompClient.value.onStompError = (error) => {
//         console.error("Erreur lors de la connexion STOMP :", error)
//         isConnected.value = false
//       }

//       stompClient.value.activate()
//     } catch (error) {
//       console.error("Erreur lors de l'initialisation du WebSocket :", error)
//     }
//   }

//   const disconnectWebSocket = () => {
//     if (stompClient.value && isConnected.value) {
//       stompClient.value.deactivate()
//       isConnected.value = false
//     }
//   }

//   return {
//     stompClient,
//     receivedMessages,
//     isConnected,
//     connectWebSocket,
//     disconnectWebSocket
//   }
// }
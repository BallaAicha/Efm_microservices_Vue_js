import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const connectWebSocket = (onMessageReceived: (message: any) => void) => {
  const socket = new SockJS("http://localhost:6700/ws");
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    console.log("Connected to WebSocket");

    // S'abonner au canal "/topic/messages"
    stompClient.subscribe("/topic/messages", (message) => {
      const parsedMessage = JSON.parse(message.body);
      onMessageReceived(parsedMessage);
    });
  });

  return stompClient;
};

export default connectWebSocket;

// plugins/websocket.client.ts
// import SockJS from "sockjs-client";
import SockJS from 'sockjs-client/dist/sockjs.js';
import { Client as Stomp } from "@stomp/stompjs";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      createStompClient: (url: string) => {
        const socket = new SockJS(url);
        return new Stomp({
          webSocketFactory: () => socket,
          reconnectDelay: 5000,
        });
      },
    },
  };
});

// types/chat.ts
export interface MessageInterface {
  content: string;
  senderId: string;
  recipientId: string;
  senderName: string;
  chatChannel?: string;
  tstamp: string;
}

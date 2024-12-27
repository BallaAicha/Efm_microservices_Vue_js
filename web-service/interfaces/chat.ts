// types/chat.ts
export interface ChatMessage {
  content: string;
  senderId: string;
  recipientId: string;
  senderName: string;
  chatChannel: string;
  tstamp: string;
  listingId: string;
}

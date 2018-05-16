export interface Message {
  conversationID: string,
  senderID: string,
  receiverID: string,
  date: number,
  time: string,
  class: string,
  read: boolean,
  sender_name: string;
  content: string
}

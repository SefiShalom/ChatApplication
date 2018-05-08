export interface Message {
  conversationID: string,
  senderID: string,
  receiverID: string,
  date: number,
  time: string,
  class: string,
  read: boolean,
  content: string
}

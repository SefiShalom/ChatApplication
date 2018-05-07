export interface Message {
  conversationID: string,
  senderID: string,
  receiverID: string,
  date: number,
  time: string,
  class: string,
  content: string
}

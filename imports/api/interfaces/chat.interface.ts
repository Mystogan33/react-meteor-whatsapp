export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE'
};

export interface Message {
  _id?: string;
  chatId?: string;
  content?: string;
  createdAt?: Date;
  type?: MessageType;
  ownership?: string;
  senderId?: string;
  read?: string;
}

export interface Chat {
  _id?: string;
  title?: string;
  picture?: string;
  participants?: [string, string];
  lastMessage?: Message;
};
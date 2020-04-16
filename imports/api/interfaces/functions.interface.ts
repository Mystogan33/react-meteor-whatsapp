import { UserCredentials, User } from "./user.interface";
import { Chat, Message } from "./chat.interface";
import { ChangeEvent } from "react";

export type ICreateDummyUsers = (users: User[]) => void;
export type ICreateDummyChats = (chats: Chat[]) => void;
export type ICreateDummyMessages = (messages: Message[]) => void;

export type IFindChats = () => Chat[];
export type IFindOtherId = (participants: Chat["participants"]) => string;
export type IFindOtherUser = (id: User["_id"]) => User | undefined;
export type IFindLastMessage = (chatId: Chat["_id"]) => Message | null;

export type IHandleLogin = (userCreds: UserCredentials) => void;
export type IHandleChatClick = (_id: Chat["_id"]) => void;
export type IHandleFooterChange = (e: ChangeEvent<HTMLInputElement>) => void;
export type IHandleFooterSend = (content: Message["content"]) => void;

export type IHandleFabInputChange = (e: ChangeEvent<HTMLInputElement>) => void;

export type IUploadFile = (file: any) => void;
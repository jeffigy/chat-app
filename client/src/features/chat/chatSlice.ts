import { Message } from "@/types/message";
import { User } from "@/types/user";
import { Socket } from "socket.io-client";
import { StateCreator } from "zustand";

type ChatState = {
  selectedUser: User | null;
  onlineUsers: string[];
  socket: null | Socket;
  messages: Message[];
};

type ActionState = {
  setSelectedUser: (selectedUser: User | null) => void;
  setSocket: (socket: null | Socket) => void;
  setOnlineUsers: (onlineUsers: string[]) => void;
  setMessages: (messages: Message[]) => void;
};

export type ChatSlice = ChatState & ActionState;

const initialState: ChatState = {
  selectedUser: null,
  onlineUsers: [],
  socket: null,
  messages: [],
};
const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  ...initialState,

  setSelectedUser: (selectedUser: User | null) => set({ selectedUser }),
  setSocket: (socket: null | Socket) => set({ socket }),
  setOnlineUsers: (onlineUsers: string[]) => set({ onlineUsers }),
  setMessages: (messages: Message[]) => set({ messages }),
});

export default createChatSlice;

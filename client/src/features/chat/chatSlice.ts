import { User } from "@/types/user";
import { StateCreator } from "zustand";

type ChatState = {
  messages: any[];
  selectedUser: User | null;
  onlineUsers: User[];
};

type ActionState = {
  setMessages: (messages: any) => void;
  setSelectedUser: (selectedUser: User) => void;
};

export type ChatSlice = ChatState & ActionState;

const initialState: ChatState = {
  messages: [],
  selectedUser: null,
  onlineUsers: [],
};
const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  ...initialState,
  setMessages: (messages: any[]) =>
    set({
      messages,
    }),
  setSelectedUser: (selectedUser: User) => set({ selectedUser }),
});

export default createChatSlice;

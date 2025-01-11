import { User } from "@/types/user";
import { StateCreator } from "zustand";

type ChatState = {
  selectedUser: User | null;
  onlineUsers: string[];
};

type ActionState = {
  setSelectedUser: (selectedUser: User | null) => void;
};

export type ChatSlice = ChatState & ActionState;

const initialState: ChatState = {
  selectedUser: null,
  onlineUsers: [],
};
const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  ...initialState,

  setSelectedUser: (selectedUser: User | null) => set({ selectedUser }),
});

export default createChatSlice;

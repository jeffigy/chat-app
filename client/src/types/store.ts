import { AuthSlice } from "@/features/auth/authSlice";
import { ChatSlice } from "@/features/chat/chatSlice";

export type Store = AuthSlice & ChatSlice;

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchChatList, fetchChatMessages } from "./chatApi";
import useStore from "@/store/useStore";

export function useChatList() {
  const { isAuthenticated } = useStore();
  return useQuery({
    queryKey: ["chatlist"],
    queryFn: () => fetchChatList(),
    placeholderData: keepPreviousData,
    enabled: isAuthenticated,
  });
}

export function useChatMessages() {
  const { isAuthenticated, selectedUser } = useStore();
  return useQuery({
    queryKey: ["chat-messages", selectedUser?.id],
    queryFn: () => fetchChatMessages({ id: selectedUser?.id }),
    placeholderData: keepPreviousData,
    enabled: isAuthenticated,
  });
}

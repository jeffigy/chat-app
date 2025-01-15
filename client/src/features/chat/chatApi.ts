import axiosInstance from "@/lib/axiosInstance";
import { subscribeToMessages } from "@/lib/socket";
import useStore from "@/store/useStore";
import { SendMessage } from "@/types/message";

const BASE_URL = "/api/messages";
export const fetchChatList = async () => {
  return (await axiosInstance.get(`${BASE_URL}`)).data;
};

export const fetchChatMessages = async ({ id }: { id: string | undefined }) => {
  const { setMessages } = useStore.getState();
  const { data: messages } = await axiosInstance.get(`${BASE_URL}/${id}`);
  setMessages(messages);
  subscribeToMessages();
  return messages;
};

export const sendMessage = async ({ data }: { data: SendMessage }) => {
  const { selectedUser, messages, setMessages } = useStore.getState();

  const response = await axiosInstance.post(
    `${BASE_URL}/${selectedUser?.id}`,
    data,
  );
  setMessages([...messages, response.data]);

  response.data;
};

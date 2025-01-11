import axiosInstance from "@/lib/axiosInstance";
import useStore from "@/store/useStore";
import { SendMessage } from "@/types/message";

const BASE_URL = "/api/messages";
export const fetchChatList = async () => {
  return (await axiosInstance.get(`${BASE_URL}`)).data;
};

export const fetchChatMessages = async ({ id }: { id: string | undefined }) => {
  return (await axiosInstance.get(`${BASE_URL}/${id}`)).data;
};

export const sendMessage = async ({ data }: { data: SendMessage }) => {
  const { selectedUser } = useStore.getState();

  return (await axiosInstance.post(`${BASE_URL}/${selectedUser?.id}`, data))
    .data;
};

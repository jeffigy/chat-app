import axiosInstance from "@/lib/axiosInstance";
import useStore from "@/store/useStore";

const BASE_URL = "/api/messages";
export const fetchChatList = async () => {
  return (await axiosInstance.get(`${BASE_URL}`)).data;
};

export const fetchChatMessages = async ({ id }: { id: string | undefined }) => {
  return await axiosInstance.get(`${BASE_URL}/${id}`);
};

export const sendMessage = async ({ data }: { data: any }) => {
  const { selectedUser } = useStore.getState();
  console.log(selectedUser?.id);

  return (await axiosInstance.post(`${BASE_URL}/${selectedUser?.id}`, data))
    .data;
};

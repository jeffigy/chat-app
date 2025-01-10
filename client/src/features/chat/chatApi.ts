import axiosInstance from "@/lib/axiosInstance";

export const fetchChatList = async () => {
  return (await axiosInstance.get("/api/messages")).data;
};

export const fetchChatMessages = async ({ id }: { id: string | undefined }) => {
  return await axiosInstance.get(`api/messages/${id}`);
};

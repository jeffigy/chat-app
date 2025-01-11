export type Message = {
  createdAt: string;
  id: string;
  receiverId: string;
  senderId: string;
  text: string;
  image: string | null;
  updatedAt: string;
};

export type SendMessage = {
  text: string | null;
  image: string | null;
};

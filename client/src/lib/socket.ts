import useStore from "@/store/useStore";
import { API_URL } from "@/utils/config";
import { io } from "socket.io-client";

export const socketInstance = io(API_URL, { autoConnect: false });

export const connectSocket = () => {
  const { setOnlineUsers, setSocket, authUser, socket } = useStore.getState();
  if (!authUser || socket?.connected) return;

  socketInstance.io.opts.query = {
    userId: authUser.id,
  };

  socketInstance.connect();
  setSocket(socketInstance);

  socketInstance.on("getOnlineUsers", (userIds) => {
    setOnlineUsers(userIds);
  });
};

export const disconnectSocket = () => {
  const { socket, setSocket } = useStore.getState();
  if (socket?.connected) {
    socket.disconnect();
    setSocket(null);
  }
};

export const subscribeToMessages = () => {
  const { selectedUser, messages, socket, setMessages } = useStore.getState();

  if (!selectedUser) return;
  socket?.on("newMessage", (newMessage) => {
    // Listen for "newMessage" events from the server
    const isMessageSentFromSelectedUser =
      newMessage.senderId === selectedUser.id;
    if (!isMessageSentFromSelectedUser) return; // Ignore messages not from the selected user

    setMessages([...messages, newMessage]); // Correctly append the new message to the current messages
  });
};

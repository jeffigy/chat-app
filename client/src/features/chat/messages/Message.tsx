import useFormattedMessageTime from "@/hooks/useFormattedMessageTIme";
import useStore from "@/store/useStore";
import { Message as MessageType } from "@/types/message";
import { useRef } from "react";

const Message = ({ message }: { message: MessageType }) => {
  const { authUser, selectedUser } = useStore.getState();
  const messageEndRef = useRef(null);
  const createdAt = useFormattedMessageTime(message.createdAt);
  if (!authUser || !selectedUser || !message) return null;

  return (
    <div
      className={`chat ${message.senderId === authUser.id ? "chat-end" : "chat-start"}`}
      ref={messageEndRef}
    >
      <div className="avatar chat-image">
        <div className="size-10 rounded-full border">
          <img
            src={
              message.senderId === authUser.id
                ? authUser.profilePic || "/avatar.png"
                : selectedUser.profilePic || "/avatar.png"
            }
            alt="profile pic"
          />
        </div>
      </div>
      <div className="chat-header mb-1">
        <time className="ml-1 text-xs opacity-50">{createdAt}</time>
      </div>
      <div className="chat-bubble flex flex-col">
        {message.image && (
          <img
            src={message.image}
            alt="Attachment"
            className="mb-2 rounded-md sm:max-w-[200px]"
          />
        )}
        {message.text && <p>{message.text}</p>}
      </div>
    </div>
  );
};

export default Message;

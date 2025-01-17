import { useChatMessages } from "../chatQueries";
import useStore from "@/store/useStore";
import Message from "./Message";
import { Message as MessageType } from "@/types/message";
import { useEffect, useRef } from "react";

const MessagesContainer = () => {
  const { authUser, selectedUser, messages } = useStore();
  const { isLoading } = useChatMessages();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isLoading) return <MessageSkeleton />;

  if (messages.length === 0)
    return (
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {" "}
        <p className="text-center">You don't have any messages yet</p>
      </div>
    );

  if (!authUser || !selectedUser) return null;

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message: MessageType) => (
        <Message
          messageEndRef={messageEndRef}
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
};

const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}
        >
          <div className="avatar chat-image">
            <div className="size-10 rounded-full">
              <div className="skeleton h-full w-full rounded-full" />
            </div>
          </div>

          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-16" />
          </div>

          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton h-16 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesContainer;

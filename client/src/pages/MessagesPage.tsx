import Sidebar from "@/components/Sidebar";
import ChatContainer from "@/features/chat/ChatContainer";
import useStore from "@/store/useStore";
import { MessageSquare } from "lucide-react";

const MessagesPage = () => {
  const { selectedUser } = useStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center px-4 pt-20">
        <div className="shadow-cl h-[calc(100vh-8rem)] w-full max-w-6xl rounded-lg bg-base-100">
          <div className="flex h-full overflow-hidden rounded-lg">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

const NoChatSelected = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center bg-base-100/50 p-16">
      <div className="max-w-md space-y-6 text-center">
        {/* Icon Display */}
        <div className="mb-4 flex justify-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 animate-bounce items-center justify-center rounded-2xl bg-primary/10">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default MessagesPage;

import ChatList from "@/features/chat/ChatList";
import { Users } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="flex h-full w-20 flex-col border-r border-base-300 transition-all duration-200 lg:w-72">
      <div className="w-full border-b border-base-300 p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="hidden font-medium lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        {/* <div className="mt-3 hidden items-center gap-2 lg:flex">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div> */}
      </div>

      <ChatList />
    </aside>
  );
};

export default Sidebar;

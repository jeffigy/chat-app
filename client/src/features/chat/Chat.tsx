import useStore from "@/store/useStore";
import { User } from "@/types/user";

const Chat = ({ user }: { user: User }) => {
  const { selectedUser, setSelectedUser, onlineUsers } = useStore();

  // if (selectedUser) {
  return (
    <button
      key={user.id}
      onClick={() => setSelectedUser(user)}
      className={`flex w-full items-center gap-3 p-3 transition-colors hover:bg-base-300 ${selectedUser?.id === user.id ? "bg-base-300 ring-1 ring-base-300" : ""} `}
    >
      <div className="relative mx-auto lg:mx-0">
        <img
          src={user.profilePic || "/avatar.png"}
          alt={user.fullName}
          className="size-12 rounded-full object-cover"
        />
        {onlineUsers.includes(user.id) && (
          <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 ring-2 ring-zinc-900" />
        )}
      </div>

      {/* User info - only visible on larger screens */}
      <div className="hidden min-w-0 text-left lg:block">
        <div className="truncate font-medium">{user.fullName}</div>
        <div className="text-sm text-zinc-400">
          {onlineUsers.includes(user.id) ? "Online" : "Offline"}
        </div>
      </div>
    </button>
  );
};

export default Chat;

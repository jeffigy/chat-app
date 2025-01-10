import useStore from "@/store/useStore";
import { User } from "@/types/user";

const Chat = ({ user }: { user: User }) => {
  const { selectedUser, setSelectedUser } = useStore();
  return (
    <button
      onClick={() => setSelectedUser(user)}
      key={user.id}
      className={`flex w-full items-center gap-3 p-3 transition-colors hover:bg-base-300 ${selectedUser?.id === user.id ? "bg-base-300 ring-1 ring-base-300" : ""} `}
    >
      <div>{user.fullName}</div>
    </button>
  );
};

export default Chat;

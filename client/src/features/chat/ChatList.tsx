import { User } from "@/types/user";
import { useChatList } from "./chatQueries";
import Chat from "./Chat";

const ChatList = () => {
  const { data, isLoading, isError, error } = useChatList();

  if (isLoading) return <SidebarSkeleton />;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="w-full overflow-y-auto py-3">
      {data.map((user: User) => (
        <Chat key={user.id} user={user} />
      ))}
    </div>
  );
};

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="flex h-full w-20 flex-col border-r border-base-300 transition-all duration-200 lg:w-72">
      {/* Skeleton Contacts */}
      <div className="w-full overflow-y-auto py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="flex w-full items-center gap-3 p-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden min-w-0 flex-1 text-left lg:block">
              <div className="skeleton mb-2 h-4 w-32" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ChatList;

import { useMemo } from "react";

const useFormattedMessageTime = (time: string | undefined) => {
  const formattedTime = useMemo(() => {
    if (!time) return null;
    const date = new Date(time);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, [time]);

  return formattedTime;
};

export default useFormattedMessageTime;

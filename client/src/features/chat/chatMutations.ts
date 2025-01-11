import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "./chatApi";
import { SendMessage } from "@/types/message";

export function useSendMessageMutation() {
  return useMutation({
    mutationFn: (data: SendMessage) => sendMessage({ data }),
    mutationKey: ["send-message"],
  });
}

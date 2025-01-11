import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "./chatApi";

export function useSendMessageMutation() {
  return useMutation({
    mutationFn: (data: any) => sendMessage(data),
    mutationKey: ["send-message"],
  });
}

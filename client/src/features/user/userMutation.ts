import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "./userApi";

export function useUpdateProfileMutation() {
  return useMutation({
    mutationFn: ({ profilePic }: { profilePic: string }) =>
      updateProfile({ profilePic }),
    mutationKey: ["update-profile"],
  });
}

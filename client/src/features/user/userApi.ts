import axiosInstance from "@/lib/axiosInstance";

export const updateProfile = async ({ profilePic }: { profilePic: string }) => {
  return (
    await axiosInstance.put(
      "/api/user/update-profile",
      JSON.stringify({ profilePic }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  ).data;
};

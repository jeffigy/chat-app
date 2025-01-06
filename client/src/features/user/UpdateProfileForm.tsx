import useFormattedDate from "@/hooks/useFormattedDate";
import useStore from "@/store/useStore";
import { useState } from "react";
import { useUpdateProfileMutation } from "./userMutation";
import { toast } from "sonner";
import { Camera, Mail, User } from "lucide-react";

const UpdateProfileForm = () => {
  const { authUser } = useStore();
  const createdAt = useFormattedDate(authUser?.createdAt);
  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfileMutation();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleImageUpload = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result as string;

      await updateProfile(
        { profilePic: base64Image },
        {
          onError: (data) => {
            toast.error(data.message);
          },
          onSuccess: () => {
            toast.success("Profile updated successfully");
          },
        },
      );
      setSelectedImg(base64Image);
    };
  };
  return (
    <div className="mx-auto max-w-2xl p-4 py-8">
      <div className="space-y-8 rounded-xl bg-base-300 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="mt-2">Your profile information</p>
        </div>

        {/* avatar upload section */}

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || authUser?.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-32 rounded-full border-4 object-cover"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 cursor-pointer rounded-full bg-base-content p-2 transition-all duration-200 hover:scale-105 ${isUpdatingProfile ? "pointer-events-none animate-pulse" : ""} `}
            >
              <Camera className="h-5 w-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400">
            {isUpdatingProfile
              ? "Uploading..."
              : "Click the camera icon to update your photo"}
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <User className="h-4 w-4" />
              Full Name
            </div>
            <p className="rounded-lg border bg-base-200 px-4 py-2.5">
              {authUser?.fullName}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Mail className="h-4 w-4" />
              Email Address
            </div>
            <p className="rounded-lg border bg-base-200 px-4 py-2.5">
              {authUser?.email}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-base-300 p-6">
          <h2 className="mb-4 text-lg font-medium">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between border-b border-zinc-700 py-2">
              <span>Member Since</span>
              <span>{createdAt}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;

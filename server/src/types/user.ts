export type UserType = {
  id: string;
  email: string;
  fullName: string;
  profilePic?: string | null | undefined;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

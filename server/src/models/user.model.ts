import { model, Schema } from "mongoose";
import transformToJSON from "../utils/mongooseUtil";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

transformToJSON(UserSchema);

const User = model("User", UserSchema);

export default User;

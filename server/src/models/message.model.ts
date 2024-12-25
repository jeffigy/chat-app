import { model, Schema } from "mongoose";
import transformToJSON from "../utils/mongooseUtil";

const MessageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

transformToJSON(MessageSchema);

const Message = model("Message", MessageSchema);

export default Message;

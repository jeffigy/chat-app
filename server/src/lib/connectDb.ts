import { connect } from "mongoose";
import { MONGODB_URI } from "../utils/config";

const connectDB = async () => {
  try {
    await connect(MONGODB_URI);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

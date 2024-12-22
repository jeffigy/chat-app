import { connection } from "mongoose";
import app from "./app";
import { PORT } from "./utils/config";

connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`app is running @ port ${PORT}`);
  });
});

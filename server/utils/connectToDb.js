import {connect} from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// const dbUri = process.env.MONGODB_URI;
const url = process.env.CONNECTION_STRING

/* export const connectToDb = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("mongoDb connected"))
    .catch((e) => console.error(e));
}; */

export const connectToDb = async () => {
  try {
    // if (!dbUri || typeof dbUri !== "string") {
    if (!url || typeof url !== "string" ) {
      console.error("Please provide a valid db connection string");
      process.exit(1);
    }
    // connect(dbUri);
    connect(url);
  } catch (e) {
    console.error("Connection error : ", e);
    process.exit(1);
  }
};

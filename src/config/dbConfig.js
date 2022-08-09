import mongoose from "mongoose";

export const dbConnect = () => {
  try {
    console.log(
      "====================================",
      process.env.MONGO_CLIENT,
      "==================="
    );
    const conn = mongoose.connect(process.env.MONGO_CLIENT);

    conn && console.log("mongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};

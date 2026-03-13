import mongoose from "mongoose";

export default async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "image-files",
    });
    console.log("Mongo Db connected Successfuly");
  } catch (err) {
    console.error("Monogo DB not connected !");
  }
}

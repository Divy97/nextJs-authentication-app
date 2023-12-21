import mongoose from "mongoose";

export async function connect() {
  try {
    if (!process.env.MONGO_URL) {
      console.log("NO Mongo_URL is given");
      return;
    }
    mongoose.connect(process.env.MONGO_URL);

    let connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database is Connected!");
    });

    connection.on("error", (err) => {
      console.log("Something Went Wrong while connecting the database!");
      console.log(err);
    });
  } catch (error) {
    console.log("Something Went Wrong!");
    console.log(error);
  }
}

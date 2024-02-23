import mongoose from "mongoose";

export default async function(){
    try {
        const databaseInstance = await mongoose.connect(
          `${process.env.MONGODB_URI}/mern-estate`,
        );
        console.log(
          "Databse Connected to Host",
          `HostName: ${databaseInstance.connection.host}`
        );
        return databaseInstance;
      } catch (error) {
        console.error("ERROR: Issues while connecting to Database", error);
      }
}
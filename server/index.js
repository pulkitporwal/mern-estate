import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.config.js";

dotenv.config({ path: "./.env" });

const app = express();

connectToDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `Server is running at http://localhost:${process.env.PORT || 3000}`
    );
  });
})
.catch((err)=>{
  console.error("MongoDB is Failed to connect with app",err);
})

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    avatar:{
      type: String,
      default: "https://firebasestorage.googleapis.com/v0/b/mern-estate-jivans.appspot.com/o/default_profile.png?alt=media&token=3cf10f7a-56b4-4653-b720-a2180a87be4f"
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

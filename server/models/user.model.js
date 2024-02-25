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
      default: "https://firebasestorage.googleapis.com/v0/b/mern-estate-jivan.appspot.com/o/default_profile.png?alt=media&token=23f2db5b-2039-441b-9c2f-55544ed69583"
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

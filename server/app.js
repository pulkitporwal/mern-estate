import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ limit: "20kb" }));
app.use(cookieParser());

import userRouter from "./routers/user.router.js";
app.use("/api/user", userRouter);

import authRouter from "./routers/auth.router.js";
app.use("/api/auth", authRouter);

export default app;

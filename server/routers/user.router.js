import express from "express";
import {
	deleteUser,
	getLandlordUser,
	showUserListings,
	testController,
	updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyJWT.js";

const router = express.Router();

router.get("/test", testController);

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/mylistings/:id", verifyToken, showUserListings);
router.get("/getlandlord/:id",verifyToken, getLandlordUser);

export default router;

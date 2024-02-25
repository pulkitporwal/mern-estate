import { Router } from "express";
import {
	createListing,
	deleteListing,
	getListing,
	updateListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyJWT.js";

const router = Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/getlisting/:id", getListing);

export default router;

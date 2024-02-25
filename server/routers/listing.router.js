import { Router } from "express";
import {
	createListing,
	deleteListing,
	getListing,
	updateListing,
	searchListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyJWT.js";

const router = Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/getlisting/:id", getListing);
router.get("/search", searchListing);

export default router;

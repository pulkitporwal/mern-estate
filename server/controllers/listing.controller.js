import Listing from "../models/listing.model.js";

export const createListing = async (req, res) => {
	const listing = await Listing.create(req.body);

	return res
		.status(201)
		.json({ success: true, message: "Listing Created Successfully" });
};

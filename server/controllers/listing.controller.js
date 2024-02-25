import Listing from "../models/listing.model.js";

export const createListing = async (req, res) => {
	const listing = await Listing.create(req.body);

	return res
		.status(201)
		.json({ success: true, message: "Listing Created Successfully" });
};

export const deleteListing = async (req, res, next) => {
	const listing = await Listing.findById(req.params.id);

	if (!listing) {
		return res
			.status(403)
			.json({ success: false, message: "Listing Not found" });
	}

	if (req.userData.id !== listing.userRef) {
		return next(
			errorHandler(401, "You can only delete your own listings!")
		);
	}

	try {
		await Listing.findByIdAndDelete(req.params.id);
		return res.status(200).json("Listing has been deleted!");
	} catch (error) {
		return res
			.status(403)
			.json({ success: false, message: "Error in Deleting Listing" });
	}
};

export const updateListing = async (req, res) => {
	try {
		const listingData = await Listing.findById(req.params.id);

		if (!listingData) {
			return res
				.status(404)
				.json({ success: false, message: "Listing Not Found!" });
		}

		if (listingData.userRef !== req.userData.id) {
			return res.status(403).json({
				success: false,
				message: "You can only update your Listings",
			});
		}

		const updatedListing = await Listing.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		return res.status(200).json({
			success: true,
			message: "Listing Updated Successfully",
			updatedListing,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in updating listing",
			error: error.message,
		});
	}
};

export const getListing = async (req, res) => {
	try {
		const listingData = await Listing.findById(req.params.id);

		if (!listingData) {
			return res
				.status(404)
				.json({ success: false, message: "Listing Not Found!" });
		}

		return res.status(200).json({
			success: true,
			message: "Listing Found Successfully",
			listingData,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in Getting Listing Data",
			error: error.message,
		});
	}
};

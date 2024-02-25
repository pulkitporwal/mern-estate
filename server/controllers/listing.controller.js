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
		return res.status(403).json({success: false, message: "Listing Not found"})
	}
  
	if (req.userData.id !== listing.userRef) {
	  return next(errorHandler(401, 'You can only delete your own listings!'));
	}
  
	try {
	  await Listing.findByIdAndDelete(req.params.id);
	  return res.status(200).json('Listing has been deleted!');
	} catch (error) {
	  return res.status(403).json({success: false, message: "Error in Deleting Listing"})
	}
  };
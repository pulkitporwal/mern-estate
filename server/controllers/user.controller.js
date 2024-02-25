import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import bcryptjs from "bcryptjs";

export const testController = (req, res) => {
	res.json({ message: "API is working" });
};

export const updateUser = async (req, res, next) => {
	if (req.userData.id !== req.params.id)
		return res.status(402).json({
			success: false,
			message: "You can not update this account",
		});

	try {
		if (req.body.password) {
			req.body.password = bcryptjs.hashSync(req.body.password, 10);
		}

		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				avatar: req.body.avatar,
			},
			{
				new: true,
			}
		);
		const { password, ...restUpdatedUser } = updatedUser._doc;

		return res.status(200).json({
			success: true,
			message: "User Updated Successfully",
			userData: restUpdatedUser,
		});
	} catch (error) {
		return res.status(406).json({
			success: false,
			message: "Error while updating User Data",
			error,
		});
	}
};

export const deleteUser = async (req, res, next) => {
	if (req.userData.id !== req.params.id)
		return res.status(400).json({
			success: false,
			message: "You can delete your own account",
		});
	try {
		await User.findByIdAndDelete(req.params.id);
		res.clearCookie("access_token");
		res.status(200).json("User has been deleted!");
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Error while deleting your account",
		});
	}
};

export const showUserListings = async (req, res) => {
	if (req.userData.id === req.params.id) {
		const listingsArray = await Listing.find({ userRef: req.params.id });
		return res.status(201).json({
			success: true,
			message: "Listings Found",
			listingsArray,
		});
	} else {
		return res
			.status(404)
			.json({
				success: false,
				message: "Error Occured while getting data",
			});
	}
};


export const getLandlordUser = async (req,res)=>{
	try {
    
		const landlord = await User.findById(req.params.id);
	  
		if (!landlord) return next(errorHandler(404, 'User not found!'));
	  
		const { password: pass, ...landlordInfo } = landlord._doc;
	  
		return res.status(200).json(landlordInfo);
	  } catch (error) {
		return res.status(400).json({success: false, message: "Error while getting landlord information"})
	  }
}
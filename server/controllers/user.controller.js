import User from "../models/user.model.js";

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
			restUpdatedUser,
		});
	} catch (error) {
		return res.status(406).json({
			success: false,
			message: "Error while updating User Data",
			error,
		});
	}
};

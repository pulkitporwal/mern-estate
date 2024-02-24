import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
	const { username, email, password } = req.body;

	const hashedPassword = bcryptjs.hashSync(password, 15);

	const newUser = new User({
		username,
		email,

		password: hashedPassword,
	});

	try {
		await newUser.save();
		res.status(201).json({
			success: true,
			message: "User Created Successfully",
		});
	} catch (error) {
		res.status(501).json({ success: false, message: error.message });
	}
};

const signin = async (req, res) => {
	const { email, password } = req.body;

	const validUser = await User.findOne({ email });

	if (!validUser)
		return res
			.status(404)
			.json({ success: false, message: "User does not Exist" });

	const passwordValidate = bcryptjs.compareSync(password, validUser.password);

	if (!passwordValidate)
		return res
			.status(401)
			.json({ success: false, message: "Wrong Credentials" });

	const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

	const { password: pass, ...rest } = validUser._doc;

	return res
		.status(200)
		.cookie("accessToken", token, { httpOnly: true })
		.json({
			success: true,
			message: "User Signed in successfully",
			userData: rest,
		});
};

export { signup, signin };

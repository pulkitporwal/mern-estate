import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const verifyToken = (req, res, next) => {
	const token = req.cookies.accessToken;

	if (!token)
		return res.status(404).json({
			success: false,
			message: "Unauthorized Access",
		});

	jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
		if (err) return res.status(403).json({ success: false, message: err });
		req.userData = userData;
		next();
	});
};

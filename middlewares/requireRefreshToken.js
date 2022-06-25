import { tokenVerificationErrors } from "../utils/TokenManager.js";
import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
	try {
		const refreshTokenCookies = req.cookies.refreshToken;
		if (!refreshTokenCookies) throw new Error("Token does not exist");

		const { id } = jwt.verify(refreshTokenCookies, process.env.JWT_REFRESH);
		req.id = id;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: tokenVerificationErrors[error.message] });
	}
};

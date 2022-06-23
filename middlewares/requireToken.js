import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/TokenManager.js";

export const requireToken = (req, res, next) => {
	try {
		let token = req.headers?.authorization;

		if (!token) throw new Error("No token provided");

		token = token.split(" ")[1];
		const { decoded } = jwt.verify(token, process.env.JWT_SECRET);
		req.decoded = decoded;

		next();
	} catch (error) {
		console.log(error);
		return res.status(401).send(tokenVerificationErrors[error.message]);
	}
};

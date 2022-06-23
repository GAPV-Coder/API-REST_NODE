import jwt from "jsonwebtoken";

export const generateToken = (id) => {
	const expiresIn = 60 * 15;
	try {
		const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
		return { token, expiresIn };
	} catch (error) {
		console.log(error);
	}
};

export const generateRefreshToken = (id, res) => {
	const expiresIn = 60 * 60 * 24 * 30;
	try {
		const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH, {
			expiresIn,
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: !(process.env.NODE_ENV === "development"),
			expires: new Date(Date.now() + expiresIn * 1000),
		});
	} catch (error) {
		console.log(error);
	}
};

// Firm to validate JWT token
export const tokenVerificationErrors = {
	"invalid signature": "Invalid signature",
	"jwt expired": "Token expired",
	"invalid token": "Invalid token",
	"No Bearer": "No Bearer",
	"jwt malformed": "Token malformed",
};

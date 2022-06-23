import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/TokenManager.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	const { email, password } = req.body;

	// const user = await User.findOne({ email });
	try {
		// Find user by email: Method 1
		let user = await User.findOne({ email });
		if (user) throw { code: 11000 };

		user = new User({ email, password });
		await user.save();

		return res.json({ ok: true });
	} catch (error) {
		// Find default user in mongoose: Method 2
		console.log(error.code);
		if (error.code === 11000) {
			return res.status(400).json({ error: "Email already exists" });
		}
		return res.status(500).json({ error: "Server error" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		let user = await User.findOne({ email });
		if (!user) return res.status(403).json({ error: "User does not exist" });

		const responsePassword = await user.comparePassword(password);
		if (!responsePassword) {
			return res.status(403).json({ error: "Wrong credentials" });
		}

		// Generate JWT token
		const { token, expiresIn } = generateToken(user._id);
		generateRefreshToken(user._id, res);
		// res.cookie("toekn", token, {
		// 	httpOnly: true,
		// 	secure: !(process.env.NODE_ENV === "development"),
		// });

		return res.json({ token, expiresIn });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Server error" });
	}
};

export const infoUser = async (req, res) => {
	try {
		const user = await User.findById(req.id).lean();
		return res.json({ email: user.email, id: user._id });
	} catch (error) {
		// console.log(error);
		return res.status(500).json({ error: "Server error" });
	}
};

export const refreshToken = async (req, res) => {
	try {
		const { token, expiresIn } = generateToken(req.id);
		return res.json({ token, expiresIn });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Server error" });
	}
};

export const logout = (req, res) => {
	res.clearCookie("refreshToken");
	res.json({ ok: true });
};

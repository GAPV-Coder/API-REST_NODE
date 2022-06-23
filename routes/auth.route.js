import express from "express";
import { Router } from "express";
import {
	infoUser,
	login,
	register,
	refreshToken,
	logout,
} from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultInputs } from "../middlewares/validationResults.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = express.Router();

router.post(
	// Validation with express-validates to verify that requests arrive with correct data
	"/register",
	[
		body("email", "Invalid email format").isEmail().normalizeEmail().trim(),
		body("password", "Invalid password format")
			.trim()
			.isLength({ min: 6 })
			.custom((value, { req }) => {
				if (value !== req.body.repassword) {
					throw new Error("Passwords do not match");
				}
				return value;
			}),
	],
	validationResultInputs,
	register
);
router.post(
	// Validation with express-validates to verify that requests arrive with correct data
	"/login",
	[
		body("email", "Invalid email format").trim().isEmail().normalizeEmail(),
		body("password", "Minimun 6 characters").trim().isLength({ min: 6 }),
	],
	validationResultInputs,
	login
);
router.get("/protected", requireToken, infoUser);
router.get("/refresh", refreshToken);
router.get("/logout", logout);
export default router;

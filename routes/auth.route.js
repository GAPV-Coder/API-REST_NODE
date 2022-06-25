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
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import {
	bodyRegisterValidator,
	bodyLoginValidator,
} from "../middlewares/validatorManager.js";

const router = express.Router();

router.post(
	// Validation with express-validates to verify that requests arrive with correct data
	"/register",
	bodyRegisterValidator,
	register
);
router.post(
	// Validation with express-validates to verify that requests arrive with correct data
	"/login",
	bodyLoginValidator,
	login
);
router.get("/protected", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);
export default router;

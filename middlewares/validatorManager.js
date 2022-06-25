import { validationResult, body } from "express-validator";

// Validation of errors if applications arrive with incomplete data
export const validationResultInputs = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

export const bodyRegisterValidator = [
	body("email", "Invalid email format").trim().isEmail().normalizeEmail(),
	body("password", "Invalid password format")
		.trim()
		.isLength({ min: 6 })
		.custom((value, { req }) => {
			if (value !== req.body.repassword) {
				throw new Error("Passwords do not match");
			}
			return value;
		}),
	validationResultInputs,
];

export const bodyLoginValidator = [
	body("email", "Invalid email format").trim().isEmail().normalizeEmail(),
	body("password", "Minimun 6 characters").trim().isLength({ min: 6 }),
	validationResultInputs,
];

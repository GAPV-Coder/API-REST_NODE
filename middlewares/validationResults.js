import { validationResult } from "express-validator";

// Validation of errors if applications arrive with incomplete data
export const validationResultInputs = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

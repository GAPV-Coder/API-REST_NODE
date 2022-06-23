import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

// const { Schema, model } = mongoose;

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		index: { unique: true },
	},
	password: {
		type: String,
		required: true,
	},
});

// Hashing password before saving
userSchema.pre("save", async function (next) {
	const user = this;

	if (!user.isModified("password")) return next();

	try {
		const salt = await bcryptjs.genSalt(10);
		user.password = await bcryptjs.hash(user.password, salt);
		next();
	} catch (error) {
		console.log(error);
		throw new Error("Error hashing password");
	}
});

// Compare password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcryptjs.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);

import mongoose from "mongoose";

try {
	await mongoose.connect(process.env.URI_DATABASE);
	console.log("😎😎 Database connected successfully");
} catch (error) {
	console.log("😒😒" + error);
}

import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
	console.log("Server started on port http://localhost:" + PORT)
);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/router");

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"]; // Add other allowed origins here

app.use(
	cors({
		origin: (origin, callback) => {
			if (allowedOrigins.includes(origin) || !origin) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	})
);

// CORS configuration

// app.use(
// 	cors({
// 		origin: (origin, callback) => {
// 			if (origin === process.env.FRONTEND_URL || origin === "*") {
// 				callback(null, origin);
// 			} else {
// 				callback(new Error("Not allowed by CORS"));
// 			}
// 		},
// 		credentials: true,
// 	})
// );

// Middleware to increase payload size limit
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api", router);

app.get("/", function (req, res) {
	res.send("API is running...!");
});

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log("Connected to DB");
		console.log("Server is running on port " + PORT);
	});
});

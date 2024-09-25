const userModel = require("../../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

async function forgotPasswordController(req, res) {
	try {
		const { email } = req.body;
		if (!email) {
			return res.status(400).json({
				message: "Please enter your email",
				error: true,
				success: false,
			});
		}

		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(404).json({
				message: "User not found",
				error: true,
				success: false,
			});
		}

		const token = jwt.sign(
			{ _id: user._id, email: user.email },
			process.env.TOKEN_SECRET_KEY,
			{
				expiresIn: "1h",
			}
		);

		const mailOptions = {
			from: process.env.UserEmail, // Change this to your email
			to: user.email,
			subject: "Reset Password",
			text: `Reset password link: ${process.env.FRONTEND_URL}/reset-password/${token}`,
		};

		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: "navneetteamdev@gmail.com", // Your SMTP AUTH_EMAIL
				pass: "abhcxvediwsurgqa", // Your SMTP AUTH_PASS
			},
		});

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
				return res.status(500).json({
					message: "Error sending email",
					error: true,
					success: false,
				});
			} else {
				console.log("Email sent: " + info.response);
				res.json({
					message: "Email sent successfully",
					error: false,
					success: true,
				});
			}
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: true,
			success: false,
		});
	}
}

module.exports = forgotPasswordController;

// const userModel = require("../../models/userModels");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

// async function forgotPasswordController(req, res) {
// 	try {
// 		const { email } = req.body;
// 		if (!email) {
// 			return res.status(400).json({
// 				message: "Please enter your email",
// 				error: true,
// 				success: false,
// 			});
// 		}

// 		const user = await userModel.findOne({ email });
// 		if (!user) {
// 			return res.status(404).json({
// 				message: "User not found",
// 				error: true,
// 				success: false,
// 			});
// 		}

// 		const token = jwt.sign(
// 			{ _id: user._id, email: user.email },
// 			process.env.TOKEN_SECRET_KEY,
// 			{
// 				expiresIn: "1h",
// 			}
// 		);

// 		const mailOptions = {
// 			from: process.env.SMTP_EMAIL,
// 			to: user.email,
// 			subject: "Reset Password",
// 			text: `Reset password link: http://localhost:3000/reset-password/${token}`,
// 		};

// 		const transporter = nodemailer.createTransport({
// 			host: "smtp.gmail.com",
// 			port: 465,
// 			secure: true,
// 			auth: {
// 				user: process.env.SMTP_EMAIL,
// 				pass: process.env.SMTP_PASS,
// 			},
// 		});

// 		transporter.sendMail(mailOptions, (error, info) => {
// 			if (error) {
// 				console.error("Error sending email:", error);
// 				return res.status(500).json({
// 					message: "Error sending email",
// 					error: true,
// 					success: false,
// 				});
// 			} else {
// 				console.log("Email sent:", info.response);
// 				res.json({
// 					message: "Email sent successfully",
// 					error: false,
// 					success: true,
// 				});
// 			}
// 		});
// 	} catch (err) {
// 		console.error("Error in forgotPasswordController:", err);
// 		res.status(500).json({
// 			message: "Internal Server Error",
// 			error: true,
// 			success: false,
// 		});
// 	}
// }

// module.exports = forgotPasswordController;

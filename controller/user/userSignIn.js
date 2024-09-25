const userModel = require("../../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
	try {
		const { email, password } = req.body;
		if (!email) {
			return res.status(400).json({
				message: "Please enter your email",
				error: true,
				success: false,
			});
		}
		if (!password) {
			return res.status(400).json({
				message: "Please enter your password",
				error: true,
				success: false,
			});
		}

		const user = await userModel.findOne({ email });
		if (!user) {
			return res
				.status(404)
				.json({ message: "User not found", error: true, success: false });
		}

		const checkPassword = await bcrypt.compare(password, user.password);
		if (!checkPassword) {
			return res.status(401).json({
				message: "please enter correct password",
				error: true,
				success: false,
			});
		}

		const token = jwt.sign(
			{ _id: user._id, email: user.email },
			process.env.TOKEN_SECRET_KEY,
			{
				expiresIn: "8d",
			}
		);

		res.cookie("token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			maxAge: 8 * 24 * 60 * 60 * 1000, // 8 days
		});

		res.json({ message: "Login successful", error: false, success: true });
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ message: "Internal Server Error", error: true, success: false });
	}
}

module.exports = userSignInController;

const userModel = require("../../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function resetPasswordController(req, res) {
	try {
		const { newPassword } = req.body;
		const { token } = req.params;

		if (!token || !newPassword) {
			return res.status(400).json({
				message: "Token and new password are required",
				error: true,
				success: false,
			});
		}

		const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
		const userId = decoded._id;

		const user = await userModel.findById(userId);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
				error: true,
				success: false,
			});
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;
		await user.save();

		res.json({
			message: "Password reset successfully",
			error: false,
			success: true,
		});
	} catch (err) {
		console.error("Error in resetPasswordController:", err);
		res.status(500).json({
			message: "Invalid or expired token",
			error: true,
			success: false,
		});
	}
}

module.exports = resetPasswordController;

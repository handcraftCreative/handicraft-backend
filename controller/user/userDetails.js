const userModel = require("../../models/userModels");

async function userDetailsController(req, res) {
	try {
		const userId = req.userId;
		// console.log("userid", userId);
		if (!userId) {
			throw new Error("User ID is missing from the request");
		}

		const user = await userModel.findById(userId);
		// console.log("user", user);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
				error: true,
				success: false,
			});
		}

		res.status(200).json({
			data: user,
			error: false,
			success: true,
			message: "User details retrieved successfully",
		});
	} catch (err) {
		res.status(400).json({
			message: err.message || err,
			error: true,
			success: false,
		});
	}
}

module.exports = userDetailsController;

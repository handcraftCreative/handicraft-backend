const userModel = require("../models/userModels");

const uploadProductPermission = async (userId) => {
	try {
		const user = await userModel.findById(userId);
		if (!user) {
			throw new Error("User not found");
		}

		if (user.role === "ADMIN") {
			return true;
		}

		return false;
	} catch (err) {
		console.error("Error in permission check:", err.message);
		return false;
	}
};

module.exports = uploadProductPermission;

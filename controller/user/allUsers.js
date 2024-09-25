const userModel = require("../../models/userModels");

async function allUser(req, res) {
	try {
		console.log("user id ", req.userId);
		const Alluser = await userModel.find();
		res.json({
			data: Alluser,
			message: "All user details are available ",
			success: true,
			error: false,
		});
	} catch (err) {
		res.json({
			message: err.message || err,
			error: true,
			success: false,
		});
	}
}
module.exports = allUser;

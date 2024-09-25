const userModel = require("../../models/userModels");
const bcrypt = require("bcrypt");

async function userSignUpcontroller(req, res) {
	try {
		const { email, password, name } = req.body;

		const user = await userModel.findOne({ email });
		// console.log("user", user);
		if (user) {
			throw new Error("user already exists");
		}

		if (!email) {
			throw new Error("Please Provide Email");
		}
		if (!password) {
			throw new Error("Please Provide Password");
		}
		if (!name) {
			throw new Error("Please Provide Name");
		}
		const salt = bcrypt.genSaltSync(10);
		const hashPassword = await bcrypt.hashSync(password, salt);

		if (!hashPassword) {
			throw new Error("Please Provide  Password");
		}

		const payload = {
			...req.body,
			role: "GENERAL",
			password: hashPassword,
		};
		const userData = new userModel(payload);

		const userSave = await userData.save();
		// console.log(userSave);
		res.status(200).json({
			data: userData,
			success: true,
			error: false,
			message: "user created successfully",
		});
	} catch (err) {
		res.json({
			message: err.message || err,
			error: true,
			success: false,
		});
	}
}

module.exports = userSignUpcontroller;

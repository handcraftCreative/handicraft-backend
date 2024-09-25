const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModels");

async function uploadProductController(req, res) {
	try {
		const sessionUserId = req.userId;

		const hasPermission = await uploadProductPermission(sessionUserId);
		if (!hasPermission) {
			return res.status(403).json({
				message: "Permission denied",
				error: true,
				success: false,
			});
		}

		const uploadProduct = new productModel(req.body);
		const saveProduct = await uploadProduct.save();
		res.status(200).json({
			message: "Product saved successfully",
			error: false,
			success: true,
			data: saveProduct,
		});
	} catch (err) {
		res.status(400).json({
			message: err.message || err,
			error: true,
			success: false,
		});
	}
}

module.exports = uploadProductController;

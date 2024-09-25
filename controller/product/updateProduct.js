const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModels");
async function updateProductController(req, res) {
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

		const { _id, ...resBody } = req.body;
		const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);
		res.json({
			message: "Product updated successfully",
			data: updateProduct,
			success: true,
			error: false,
		});
	} catch (err) {
		res.status(400).json({
			message: err.message || err,
			error: true,
			success: false,
		});
	}
}

module.exports = updateProductController;

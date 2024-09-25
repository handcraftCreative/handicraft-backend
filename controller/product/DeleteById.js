const productModel = require("../../models/productModels");

const deleteController = async (req, res) => {
	try {
		const id = req.params.id;
		const product = await productModel.findByIdAndDelete(id);

		if (!product) {
			return res.status(404).json({
				message: "Product not found",
				success: false,
				error: true,
			});
		}

		res.json({
			message: "Product Deleted successfully",
			success: true,
			error: false,
			data: product,
		});
	} catch (err) {
		res.status(400).json({
			message: err.message || err,
			error: true,
			success: false,
		});
	}
};

module.exports = deleteController;

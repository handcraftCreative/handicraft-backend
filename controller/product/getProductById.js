const productModel = require("../../models/productModels");

const getProductByIdController = async (req, res) => {
	try {
		const id = req.params.id;
		const product = await productModel.findById(id);

		if (!product) {
			return res.status(404).json({
				message: "Product not found",
				success: false,
				error: true,
			});
		}

		res.json({
			message: "Product found",
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

module.exports = getProductByIdController;

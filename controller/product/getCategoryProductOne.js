const productModel = require("../../models/productModels");

async function getCategoryProductController(req, res) {
	try {
		const productCategory = await productModel.distinct("category");
		// console.log(productCategory);

		const productByCategory = [];
		for (const category of productCategory) {
			const product = await productModel.findOne({ category });
			if (product) {
				productByCategory.push(product);
			}
		}

		res.json({
			message: "product category",
			data: productByCategory,
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

module.exports = getCategoryProductController;

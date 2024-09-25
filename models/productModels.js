const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		productName: String,
		productRating: String,
		// brandName: String,
		// category: String,
		productImage: [],
		description: String,
		price: String,
		sellingPrice: String,
		description: String,
	},
	{
		timestamps: true,
	}
);

const productModel = mongoose.model("product", ProductSchema);

module.exports = productModel;

const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
	{
		product_Id: String,
		Rating: String,
		ClientName: String,
		ReviewComment: String,
		description: String,
	},
	{
		timestamps: true,
	}
);

const reviewModel = mongoose.model("review", ReviewSchema);

module.exports = reviewModel;

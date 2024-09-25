const reviewModel = require("../../models/ReviewModels");

const getReviewController = async (req, res) => {
	try {
		const allReview = await reviewModel.find();

		res.json({
			message: "All Review",
			success: true,
			error: false,
			data: allReview,
		});
	} catch (err) {
		res.status(400).json({
			message: err.message || err,
			error: true,
			success: false,
		});
	}
};

module.exports = getReviewController;

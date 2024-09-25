const reviewModel = require("../../models/ReviewModels");

async function reviewController(req, res) {
	try {
		const uploadReview = new reviewModel(req.body);
		const saveReview = await uploadReview.save();
		res.status(200).json({
			message: "Review saved successfully",
			error: false,
			success: true,
			data: saveReview,
		});
	} catch (err) {
		res.status(400).json({
			message: err.message || err,
			error: true,
			success: false,
		});
	}
}

module.exports = reviewController;

const reviewModel = require("../../models/ReviewModels");

const deleteReviewController = async (req, res) => {
	try {
		const id = req.params.id;
		const review = await reviewModel.findByIdAndDelete(id);

		if (!review) {
			return res.status(404).json({
				message: "Review not found",
				success: false,
				error: true,
			});
		}

		res.json({
			message: "Review Deleted successfully",
			success: true,
			error: false,
			data: review,
		});
	} catch (err) {
		res.status(400).json({
			message: err.message || err,
			error: true,
			success: false,
		});
	}
};

module.exports = deleteReviewController;

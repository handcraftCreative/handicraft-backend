const mongoose = require("mongoose");
async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to MongoDB");
	} catch (e) {
		console.log("error ", e);
	}
}

mongoose.exports = connectDB;

module.exports = connectDB;

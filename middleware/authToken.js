const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
	try {
		const token = req.cookies?.token;

		if (!token) {
			return res.status(401).json({
				message: "Please log in to access this resource.",
				error: true,
				success: false,
			});
		}

		jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
			if (err) {
				return res.status(401).json({
					message: "Authentication failed, please log in again.",
					error: true,
					success: false,
				});
			}

			if (decoded.exp < Date.now() / 1000) {
				return res.status(401).json({
					message: "Token has expired, please log in again.",
					error: true,
					success: false,
				});
			}

			// Attach the decoded user ID to the request object
			req.userId = decoded._id;
			next();
		});
	} catch (err) {
		res.status(400).json({
			message: err.message || "An error occurred.",
			error: true,
			success: false,
		});
	}
}

module.exports = authToken;

const nodemailer = require("nodemailer");

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: "navneetteamdev@gmail.com", // Your SMTP AUTH_EMAIL
		pass: "abhcxvediwsurgqa", // Your SMTP AUTH_PASS
	},
});

// // Email options
// const mailOptions = {
// 	from: '"handicraft e-commerce" <navneetteamdev@gmail.com>', // Sender address
// 	to: "recipient@example.com", // List of recipients
// 	subject: "Hello from Node.js", // Subject line
// 	text: "This is a test email sent using Node.js and Nodemailer.", // Plain text body
// 	// html: '<b>Hello from Node.js</b>' // HTML body (optional)
// };

// // Send email
// export const sendMail = transporter.sendMail(mailOptions, (error, info) => {
// 	if (error) {
// 		return console.log("Error while sending email:", error);
// 	}
// 	console.log("Email sent successfully:", info.response);
// });

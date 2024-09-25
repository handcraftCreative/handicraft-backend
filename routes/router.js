const express = require("express");
const userSignUpcontroller = require("../controller/user/userSignUp");
const userSignIncontroller = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUser = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const uploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProductController = require("../controller/product/getCategoryProductOne");
const getProductByIdController = require("../controller/product/getProductById");
const deleteController = require("../controller/product/DeleteById");
const reviewController = require("../controller/product/Review");
const getReviewController = require("../controller/product/getReview");
const deleteReviewController = require("../controller/product/deleteReviewById");
const forgotPasswordController = require("../controller/user/forgotPassword");
const resetPasswordController = require("../controller/user/resetPassword");
const router = express.Router();

router.post("/signup", userSignUpcontroller);
router.post("/signin", userSignIncontroller);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

//admin panel

router.get("/all-user", authToken, allUser);
router.post("/update-user", authToken, updateUser);

// product
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProductController);
router.get("/get-ByIdProduct/:id", getProductByIdController);
router.delete("/delete-Product/:id", deleteController);
router.post("/post-Review", reviewController);
router.get("/get-Review", getReviewController);
router.delete("/delete-Review/:id", deleteReviewController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);
module.exports = router;

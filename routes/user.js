const express = require("express");
const userControllers = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/register", userControllers.userRegistration);

router.post("/login", userControllers.userLogin);

router.post("/logout", userControllers.userLogout);

router.post(
  "/add-to-wishlist",
  authMiddleware(["admin", "seller", "buyer"]),
  userControllers.addProductToWishlist
);

router.get(
  "/wishlist",
  authMiddleware(["seller", "buyer", "admin"]),
  userControllers.getUserWishlist
);

router.post(
  "/address",
  authMiddleware(["seller", "buyer", "admin"]),
  userControllers.saveUserAddress
);

module.exports = router;

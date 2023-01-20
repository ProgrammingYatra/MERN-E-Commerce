const express = require("express");
const { isAuthenticate, authorizeRoles } = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  updatePassword,
  getUserDetails,
  getSingleUser,
  updateUserRole,
  deleteUser,
  getAllUser,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticate, getUserDetails);

router.route("/password/update").put(isAuthenticate, updatePassword);
// router.route("/me/update").put(isAuthenticate, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticate, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticate, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticate, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticate, authorizeRoles("admin"), deleteUser);

module.exports = router;

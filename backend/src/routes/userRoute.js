const express=require("express");
const { createUser, loginUser, getUser, updateUser } = require("../controllers/userController");
const { authentication, authorization } = require("../middlewares/auth");
const  router=express.Router();

router.route("/register").post(createUser)

router.route("/login").post(loginUser)

router.route("/user/:userId/profile").get(authentication,getUser).put(authentication,authorization,updateUser)

module.exports=router;
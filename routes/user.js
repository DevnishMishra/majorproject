const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const{saveRedirectUrl}=require("../middleware.js")
const userController=require("../controllers/users.js")


router.route("/signup")
.get(userController.renderSignupForm)// to render signup page
.post(wrapAsync(userController.signup));// to save user info in db and render

router.route("/login")
.get( userController.renderLoginForm)//to render login page
.post(saveRedirectUrl, passport.authenticate('local', {
    
    failureRedirect: '/login',
    failureFlash:true,
  }),userController.login);//for login into page through save user info in database


router.get('/logout',userController.logout);//logout user



  module.exports = router;
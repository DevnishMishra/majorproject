const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const {isLoggedIn,validatelisting,isOwner}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer')
const{storage}=require("../cloudConfig.js");
const upload = multer({ storage});


//new route for rendering new form to add new listing
router.get("/new",isLoggedIn,wrapAsync (listingController.renderNewForm));

router.route("/")
.get(wrapAsync (listingController.index))//index route for showing all listing in webpage
.post(isLoggedIn,upload.single('listing[image]'),validatelisting,wrapAsync (listingController.createListing))//add function to button create route


router.get("/:id/edit",isLoggedIn,wrapAsync (listingController.renderEditForm));//route to render edit .ejs throug edit button in show .ejs //edit route

router.route("/:id")
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validatelisting,wrapAsync (listingController.updateListing))//update route
.delete(isLoggedIn,isOwner,wrapAsync (listingController.destroyListing))//delete route
.get( wrapAsync(listingController.showListing));//show route for giving information of a particular listing with the help of show ejs



module.exports=router;
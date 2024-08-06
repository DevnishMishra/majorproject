const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {reviewlisting, isLoggedIn,isreviewauthor}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js")
//Reviews
//submit review route
router.post("/",isLoggedIn,reviewlisting,wrapAsync(reviewController.createReview));

    
//Delete review route
router.delete("/:reviewId",isLoggedIn,isreviewauthor,wrapAsync(reviewController.destroyReview))

module.exports=router;
// router.post("/listings/:id/reviews", wrapAsync(async (req, res, next) => {:

//     This line sets up a POST route at the path /listings/:id/reviews.
//     :id is a route parameter that represents the ID of the listing to which the review will be added.
//     wrapAsync is a utility function that wraps the async function to catch any errors and pass them to the error handler.
//     let listing = await Listing.findById(req.params.id);:
    
//     req.params.id extracts the id parameter from the route (the ID of the listing).
//     Listing.findById(req.params.id) queries the database to find the listing with the specified ID.
//     await pauses the execution until the listing is found and assigns it to the listing variable.
//     let newReview = new Review(req.body.review);:
    
//     req.body.review contains the review data submitted from the form.
//     new Review(req.body.review) creates a new instance of the Review model using the submitted review data.
//     newReview holds the newly created review object.
//     listing.reviews.push(newReview);:
    
//     This line adds the newly created review (newReview) to the reviews array of the found listing.
//     listing.reviews is an array of review references in the listing document.
//     await newReview.save();:
    
//     This line saves the new review document to the database.
//     await pauses the execution until the review is saved successfully.
//     await listing.save();:
    
//     This line saves the updated listing document, which now includes the new review reference in the reviews array.
//     await pauses the execution until the listing is saved successfully.
//     res.redirect(/listings/${listing._id});:
    
//     After successfully saving both the new review and the updated listing, this line redirects the user to the listing's detail page.
//     The URL is dynamically constructed using the _id of the listing (listing._id).
//     }:
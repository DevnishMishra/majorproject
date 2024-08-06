const { listingSchema } = require("./schema.js");
const Listing = require("./models/listing.js");
const { reviewSchema } = require("./schema.js");
const Review = require("./models/review");
const User = require("./models/user.js");
const ExpressError=require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        console.log(req.originalUrl);
        req.flash("error", "You must be logged in to perform this activity");
        return res.redirect("/login");
    }
    next();
};

// To render the original URL that was clicked before login
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate('owner'); // Populate owner field
    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not authorized to perform this activity");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Joi middleware for validating listing data
module.exports.validatelisting = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Joi middleware for validating review data
module.exports.reviewlisting = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.isreviewauthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId).populate('author'); // Populate author field
    if (!review.author._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not authorized to perform this activity");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

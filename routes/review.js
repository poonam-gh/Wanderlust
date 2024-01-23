import express from 'express';
const router = express.Router({mergeParams: true});
import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";
import Review from '../models/review.js';
import listings from './listing.js';
import Listing from "../models/listing.js";
import { isLoggedIn, validateReview, isReviewAuthor } from '../middleware.js';

import reviewController from '../controllers/reviews.js';

//reviews
//post route (we r creating only post route buz review is accessed with listing no need to specially create new/show/delete/... route for review )
router.post("/" ,
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));


//delete route
router.delete('/:reviewId', 
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview)
);

export default router;
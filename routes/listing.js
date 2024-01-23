import express from 'express';
const router = express.Router();
import Listing from "../models/listing.js";
import wrapAsync from "../utils/wrapAsync.js";
import { isLoggedIn, isOwner, validateListing } from "../middleware.js";

import listingController from "../controllers/listings.js";
import multer from 'multer';
import {storage} from "../cloudConfig.js";
const upload = multer({storage});

//index+create
router
    .route("/")
    .get( wrapAsync(listingController.index))
    // .post(
    //     isLoggedIn,
    //     validateListing,
    //     wrapAsync(listingController.createListing)
    // );
    .post( upload.single("listing[image]"), (req, res)=>{
        res.send(req.file);
    });
    // .post(upload.single('listing[image]'), (req, res, next) => {
    //     if (req.file) {
    //       res.send(req.file);
    //     } else {
    //       next(new Error('No file uploaded'));
    //     }
    //   }, (err, req, res, next) => {
    //     console.error(err);
    //     res.status(500).send('Something went wrong');
// });
      

//new route
router.get('/new',isLoggedIn, listingController.renderNewForm);

//show+update+delete
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        validateListing, 
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

//Index Route
// router.get("/", wrapAsync(listingController.index));  




//show route
// router.get(
//     "/:id", 
//     wrapAsync(listingController.showListing));

//create route
// router.post("/",isLoggedIn,
//  validateListing,
//  wrapAsync(listingController.createListing)
// );

//edit route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListing));

//update route
// router.put(
//     "/:id", 
//     isLoggedIn,
//     isOwner,
//     validateListing, 
//     wrapAsync(listingController.updateListing));

//delete route
// router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

export default router;
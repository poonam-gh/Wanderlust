
import Listing from '../models/listing.js';

const listingController = {
    index: async (req, res) => {
        const allListings= await Listing.find({});
        res.render("listings/index.ejs",{allListings});
    },

    renderNewForm: (req, res) => {
       res.render("listings/new.ejs");
    },

    showListing: async(req,res)=>{
        let {id} = req.params;
        const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate:{
                path:"author",
            },
        })
        .populate("owner");
        if(!listing){
            req.flash('error','Cannot find that listing');
            res.redirect("/listings");
        }
        console.log(listing);
        res.render("listings/show.ejs", {listing});
    },
    createListing: async (req, res) => {
            const newListing = new Listing(req.body.listing);
            newListing.owner = req.user._id;
            await newListing.save();
            req.flash("success", "New Listing Created!");
            res.redirect("/listings");
    },
    editListing: async (req, res) => {
            let {id} = req.params;
            const listing = await Listing.findById(id);
            if(!listing){
                req.flash('error','Cannot find that listing');
                res.redirect("/listings");
            }
            res.render("listings/edit.ejs", {listing});
        
    },
    updateListing: async (req, res) =>{
   
            let {id} = req.params;
            const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing);
            req.flash("success", "Listing Updated!");
            res.redirect(`/listings/${id}`);
        
    },
    deleteListing: async (req, res) => {
            let {id}=req.params;
            let deletedListing = await Listing.findByIdAndDelete(id);
            console.log(deletedListing);
            req.flash("success", "Listing Deleted!");
            res.redirect("/listings");
        
    },


   
};
export default listingController;






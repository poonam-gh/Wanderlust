import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
    comment : String,
    rating: {
        type: Number,
        min :1,
        max:5
    },
    createdAt : {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"  // reference to the User model in our database
    }
});

const review = mongoose.model("Review", reviewSchema);
export default review;
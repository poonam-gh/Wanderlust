import mongoose from 'mongoose';
const { Schema } = mongoose;
import PassportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(PassportLocalMongoose);
const User = mongoose.model("User", userSchema);
export default User;
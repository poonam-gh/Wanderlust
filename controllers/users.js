import User from "../models/user.js";
const userController = {
    renderSignupForm :(req,res)=>{
        res.render("users/signup.ejs");
    },
    signup: async(req,res)=>{
        try {
            let {username, email, password} = req.body;
            const newUser = new User({email, username});
            const registeredUser= await User.register(newUser, password);
            console.log(registeredUser);
            req.login(registeredUser,(err)=>{
                if(err) {
                    return next(err);
                }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");      
            });
        } catch (err) {
            req.flash("error", err.message); // Assuming error message available in 'err.message'
            res.redirect("/signup"); // Redirect to signup again in case of error
        }
    },
    renderLoginForm: (req,res)=>{
        res.render("users/login.ejs");
    },
    login: async(req,res)=>{
        req.flash("success", "Welcome back to Wanderlust!");
        let redirectUrl = req.session.redirectUrl || "/listings";   
        res.redirect(redirectUrl);
    },
    logout: (req,res,next)=>{
        req.logout((err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "You are logged out!");
            res.redirect("/listings");
        }
        )}
}
export default userController;
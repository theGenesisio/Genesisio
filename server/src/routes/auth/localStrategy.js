import passport from "passport";
import { Strategy } from "passport-local";
import { Admin, Profile } from "../../mongodb/models.js";
import { passwordMatch } from "./middleware.js";
import { updateActiveState } from "../../mongodb/methods.js";
passport.serializeUser((user, done) => {
    const userType = user.isAdmin ? 'admin' : 'client';
    let userID = user._id.toString("hex")
    done(null, { id: userID, type: userType })
})
passport.deserializeUser((obj, done) => {
    if (obj.type === 'admin') {
        try {
            Admin.findById(obj.id)
                .then(admin => {
                    if (!admin) { throw new Error("Admin not found") };
                    done(null, admin)
                })
        } catch (error) {
            done(error, null)
        }
    } else {
        try {
            Profile.findById(obj.id)
                .then(profile => {
                    if (!profile) { throw new Error("Profile not found") };
                    done(null, profile)
                })
        } catch (error) {
            done(error, null)
        }
    }
})
export default passport.use("client-local",new Strategy({ usernameField: "email" }, (username, password, done) => {
    try {
        Profile.findOne({ email: username })
            .then(profile => {
                if (!profile) { return done(null, false, { message: 'Login failed. Invalid email', statusCode: 401 }) }
                if (!passwordMatch(password, profile.password)) { return done(null, false, { message: 'Login failed. Invalid password.', statusCode: 401 }) }
                updateActiveState(profile._id)
                done(null, profile)
            })
            .catch(err => done(err, null))
    } catch (err) {
        done(err, null)
    }
}))
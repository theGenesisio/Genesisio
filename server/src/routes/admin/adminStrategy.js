import dotenv from "dotenv";
dotenv.config()
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Admin } from "../../mongodb/models.js";
import { dbCreateAdmin, updateAdminActiveState } from "../../mongodb/methods.js";
import { passwordMatch } from "../auth/middleware.js";

export default passport.use("admin-local", new LocalStrategy(async (username, password, done) => {
    try {
        // Check if the admin exists, if not, create one
        const count = await Admin.countDocuments({ username: process.env.ADMIN_USERNAME });
        if (count < 1) {
            await dbCreateAdmin();
        }

        // Find the admin by username
        const admin = await Admin.findOne({ username: username });
        if (!admin) {
            return done(null, false, { message: 'Login failed. Invalid username', statusCode: 401 });
        }

        // Check if the password matches
        if (!passwordMatch(password, admin.password)) {
            return done(null, false, { message: 'Login failed. Invalid password.', statusCode: 401 });
        }

        // Update admin active state
        await updateAdminActiveState(admin._id);

        // Authentication successful
        done(null, admin);
    } catch (err) {
        done(err, null);
    }
}));

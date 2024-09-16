import passport from "passport"
import { Router as _Router } from "express";
import "./adminStrategy.js"
import { isAuthenticated } from "../../routes/auth/middleware.js";
import { updateAdminActiveState } from "../../mongodb/methods.js";
const Router = _Router();
// ** Admin Routes
// LOGIN 
Router.route('/login')
    .post((req, res) => {
        passport.authenticate('admin-local', (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: 'An error occurred during authentication.' });
            }
            if (!user) {
                return res.status(401).json(info);
            }
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'An error occurred during login.' });
                }
                return res.status(200).json({ message: 'Login successful!', statusCode: 200, admin: user });
            });
        })(req, res);
    });
// LOGOUT 
Router.route('/logout')
    .get(isAuthenticated, (req, res) => {
        if (req.user) {
            updateAdminActiveState(req.user._id, !req.user.active)
            req.logout((err) => {
                if (err) {
                    return res.status(500).json({ message: 'An error occurred during logout.', statusCode: 500 });
                }
                req.session.destroy((err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Failed to log out. Please try again.', statusCode: 500 });
                    }
                    res.status(200).json({ message: 'Admin logged out!', statusCode: 200 });
                });
            });
        }
    });
// check login status
Router.route("/check-session")
    .get((req, res) => {
        if (!req.user) { return res.json({ message: 'Unauthorized request.', statusCode: 204, admin: null }) }
        if (!req.user.isAdmin) { return res.json({ message: 'Unauthorized request.', statusCode: 401, admin: null }) }
        res.status(200).json({ message: 'Admin Access granted', statusCode: 200, admin: req.user });
    });
export default Router
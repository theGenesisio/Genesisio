import passport from "passport"
import { Router as _Router } from "express";
import "./localStrategy.js"
import { completeRegistration, isAuthenticated, otpStore, verifyOTP, onBoardingEmail, requestOTPForReset } from "./middleware.js";
import { dbCreateProfile, updateActiveState, updateProfile, updateProfilePassword } from "../../mongodb/methods.js";
const Router = _Router();
// LOGIN 
Router.route('/login')
    .post((req, res, next) => {
        passport.authenticate('client-local', (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: 'An error occurred during authentication.' });
            }
            if (!user) {
                // Authentication failed, send the error message from info
                return res.status(401).json(info);
            }
            // Manually log in the user
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'An error occurred during login.' });
                }
                // Authentication and login succeeded, send the user profile
                return res.status(200).json({ message: 'Login successful!', statusCode: 200, user: user });
            });
        })(req, res, next);
    });
// LOGOUT 
Router.route('/logout')
    .get(isAuthenticated, (req, res) => {
        if (req.user) {
            updateActiveState(req.user._id, false)
            req.logout((err) => {
                if (err) {
                    return res.status(500).json({ message: 'An error occurred during logout.', statusCode: 500 });
                }
                req.session.destroy((err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Failed to log out. Please try again.', statusCode: 500 });
                    }
                    res.status(200).json({ message: 'Logout successful, but we hope to see you again!', statusCode: 200 });
                });
            });
        }
    });
Router.route("/register")
    .post(completeRegistration, async (req, res) => {
        res.status(200).json({ message: 'OTP sent to your email. Please verify to complete registration.', statusCode: 200 });
    });
Router.route("/complete-registration")
    .post(async (req, res) => {
        const { email, otp } = req.body;

        if (verifyOTP(email, otp)) {
            const { fullname, password } = otpStore[email];
            dbCreateProfile({ fullname, email, password })
                .then(profile => {
                    onBoardingEmail(fullname, email)
                    delete otpStore[email]; // Clean up the store
                    profile && res.status(201).json({ message: 'User registered successfully', statusCode: 201 });
                })
                .catch(err => {
                    console.error('Error during registration:', err);
                    res.status(500).json({ message: `Internal server error during registration ERROR:${err}`, statusCode: 500 });
                })
        } else {
            res.status(400).json({ message: 'Invalid or expired OTP. Please try again.', statusCode: 400 });
        }
    });
// check login status
Router.route("/check-session")
    .get((req, res) => {
        if (!req.user) { return res.status(401).json({ message: 'Unauthorized request.', statusCode: 401, user: null }) }
        if (req.user.isAdmin) { return res.status(401).json({ message: 'Unauthorized request.', statusCode: 401, user: null }) }
        res.status(200).json({ message: 'Access granted', statusCode: 200, user: req.user });
    });
Router.route("/forgot-password")
    .post(requestOTPForReset, async (req, res) => {
        res.status(200).json({ message: 'OTP sent to your email. Please verify to reset password.', statusCode: 200 });
    });
Router.route("/password-reset")
    .post(async (req, res) => {
        const { password, code, email } = req.body;

        if (verifyOTP(email, code)) {
            ///**  reset password here
            let update = await updateProfilePassword(email, password)
            if (!update) {
                res.status(500).json({ message: 'Internal server error in resetting password. Please try again later.', statusCode: 500 });
            }
            res.status(200).json({ message: 'Reset successfull, proceed to login.', statusCode: 200 });
        } else {
            res.status(400).json({ message: 'Invalid or expired OTP. Please try again.', statusCode: 400 });
        }
    })
export default Router; 
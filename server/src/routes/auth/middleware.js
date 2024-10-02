import dotenv from "dotenv";
dotenv.config()
import { compareSync } from "bcrypt";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import nodemailer from "nodemailer"
import { findAnyByUser } from "../../mongodb/methods.js";
import { generateEmailHtml, generateOnboardingEmailHtml, generateUpgradeEmail, resetPasswordHTML } from "./mailing.js";
const handlePreflight = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        return res.status(200).json({});
    }
    next();
};
const setRoutePath = () => (req, res, next) => {
    req.routePath = req.params
    next();
};
const isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    } return res.status(401).json({ message: 'Unauthorized request.', statusCode: 500 });
};
const otpStore = {}; // In-memory store for OTPs and user details

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function storeUserDetails(email, fullname, password, otp) {
    otpStore[email] = {
        otp,
        fullname,
        password,
        expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes from now
    };

    // Set a timeout to remove the OTP and user details after 5 minutes
    setTimeout(() => {
        delete otpStore[email];
    }, 10 * 60 * 1000);
}
function verifyOTP(email, otp) {
    const record = otpStore[email];
    if (!record) return false;
    if (Date.now() > record.expiresAt) {
        delete otpStore[email];
        return false;
    }
    return record.otp === otp;
}
const completeRegistration = async (req, res, next) => {
    const { email, fullname, password } = req.body;
    let isUser = await findAnyByUser({ email: email })
    if (isUser.length === 0) {
        const otp = generateOTP();
        storeUserDetails(email, fullname, password, otp);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465
            auth: {
                user: process.env.MAILER_USERNAME,
                pass: process.env.MAILER_PASSWORD,
            },
        });

        try {
            const info = await transporter.sendMail({
                from: {
                    name: "Genesisio",
                    address: process.env.MAILER_USERNAME
                },
                to: email,
                subject: 'Complete Your Registration',
                html: generateEmailHtml(fullname, otp)
            });

            if (info.accepted.includes(email)) {
                next(); // Proceed to the next middleware or route handler
            } else {
                res.status(400).json({ message: 'Email not accepted. Please try again.', statusCode: 400 });
            }
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Internal Server Error. Please try again later.', statusCode: 500 });
        }
    } else {
        res.status(403).json({ message: 'Email is already associated with a registered user', statusCode: 403 });
    }
};
const upgradeEmail = async (email, instruction, fullname) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465
        auth: {
            user: process.env.MAILER_USERNAME,
            pass: process.env.MAILER_PASSWORD,
        },
    });
    try {
        const info = await transporter.sendMail({
            from: {
                name: "Genesisio",
                address: process.env.MAILER_USERNAME
            },
            to: email,
            subject: 'Upgrade your account tier',
            html: generateUpgradeEmail(instruction, fullname)
        });

        if (info.accepted.includes(email)) {
            return true
        }
    } catch (error) {
        console.error('Error sending upgrade email:', error);
        return false
    }
}
const onBoardingEmail = async (fullname, email) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465
        auth: {
            user: process.env.MAILER_USERNAME,
            pass: process.env.MAILER_PASSWORD,
        },
    });
    try {
        const info = await transporter.sendMail({
            from: {
                name: "Genesisio",
                address: process.env.MAILER_USERNAME
            },
            to: email,
            subject: 'Welcome to Genesisio',
            html: generateOnboardingEmailHtml(fullname)
        });

        if (info.accepted.includes(email)) {
            return true
        }
    } catch (error) {
        console.error('Error sending onboarding email:', error);
        return false
    }
}
function isoToLocaleDateString(isoTimestamp) {
    const date = isoTimestamp ? new Date(isoTimestamp) : new Date();
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

function passwordMatch(password, hash) {
    let result = compareSync(password, hash)
    return result === true ? true : false
}
const requestOTPForReset = async (req, res, next) => {
    const { email } = req.body;
    let isUser = await findAnyByUser({ email: email })
    if (isUser.length !== 1) {
        res.status(403).json({ message: 'Email is not associated with any registered user', statusCode: 403 });
    } else {
        const otp = generateOTP();
        storeUserDetails(email, null, null, otp);
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465
            auth: {
                user: process.env.MAILER_USERNAME,
                pass: process.env.MAILER_PASSWORD,
            },
        });
        try {
            const info = await transporter.sendMail({
                from: {
                    name: "Genesisio",
                    address: process.env.MAILER_USERNAME
                },
                to: email,
                subject: 'Reset your password',
                html: resetPasswordHTML(otp)
            });

            if (info.accepted.includes(email)) {
                next(); // Proceed to the next middleware or route handler
            } else {
                res.status(400).json({ message: 'Email not accepted. Please try again.', statusCode: 400 });
            }
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Internal Server Error. Please try again later.', statusCode: 500 });
        }
    }
}
export { isAuthenticated, isoToLocaleDateString, passwordMatch, generateEmailHtml, completeRegistration, verifyOTP, otpStore, onBoardingEmail, setRoutePath, upgradeEmail, requestOTPForReset, handlePreflight }
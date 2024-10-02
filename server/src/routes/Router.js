import dotenv from "dotenv";
dotenv.config();
import { Router as _Router } from "express";
import { isAuthenticated, setRoutePath } from "./auth/middleware.js";
import { createDeposit, createUpgradeRequest, createWithdrawal, findAny, findAnyByUser, investment, updateProfile } from "../mongodb/methods.js";
import { upload, uploadProfile } from "./admin/adminRouter.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Router = _Router();
// Determine the base directory
const baseDir = process.env.NODE_ENV === 'production' ? process.cwd() : path.join(__dirname, '../../../');
// **  Routes
Router.route("/")
    .get((req, res) => {
        res.status(403).send({ message: 'API working like a charm', statusCode: 403 });
    })
    .post(isAuthenticated, (req, res, next) => {
        res.status(403).send({ message: 'You have accessed a protected route!', statusCode: 403 });

    })
/// ** DEPOSIT CREATION
Router.route("/deposit/upload/:userId-:walletId-:currency-:email-:timeStamp")
    .post(isAuthenticated, setRoutePath(), upload.single("file"), async (req, res) => {
        const { userId, walletId, currency } = req.params
        let fileName = `${req.params.email}_${req.params.timeStamp}.png`;
        let args = {
            img: fileName,
            userId: userId,
            walletId: walletId,
            amount: req.body.amount,
            currency: currency,
            status: "pending"
        }
        let result = await createDeposit(args)
        if (!result) {
            res.status(500).send({ message: 'Internal server error while creating deposit!', statusCode: 500 });
        }
        res.status(201).send({ message: 'Deposit successful, awaiting confirmation!', statusCode: 201 });
    })
/// ** GET PROFILE SPECIFIC DEPOSITS
Router.route("/deposits/:userId")
    .get(isAuthenticated, async (req, res) => {
        let deposits = await findAnyByUser({ userId: req.params.userId }, 2)
        res.status(200).send({ message: 'Here are the deposits!', statusCode: 200, data: { deposits: deposits } });
    })
/// ** GET SPECIFIC NETWORK DETAILS
Router.route("/deposit/load/:network")
    .get(isAuthenticated, async (req, res) => {
        let networks = await findAnyByUser({ networkName: req.params.network }, 5)
        let network = networks[0]
        // get image details
        res.status(200).send({ message: 'Here are the network details!', statusCode: 200, data: { network: network } });
    })
Router.route("/deposits/load-img/:network")
    .get(isAuthenticated, async (req, res) => {
        const filename = `${req.params.network}.png`;
        const options = {
            root: path.join(baseDir, 'server', 'public', 'uploads', 'qrCodes')
        };
        res.sendFile(filename, options, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send({ message: 'Internal server error while sending image!', statusCode: 500 });
            }
        });
    });

/// ** GET PROFILE SPECIFIC WITHDRAWALS
Router.route("/withdrawals/:userId")
    .get(isAuthenticated, async (req, res) => {
        let withdrawals = await findAnyByUser({ userId: req.params.userId }, 3)
        res.status(200).send({ message: 'Here are the withdrawals!', statusCode: 200, data: { withdrawals: withdrawals } });
    })
    .post(isAuthenticated, async (req, res) => {
        const { address, amount, network, walletId } = req.body
        let args = {
            userId: req.params.userId,
            walletId: walletId,
            amount: amount,
            currency: network,
            status: "pending",
            address: address || "XXXX_NO_VALID_ADDRESS_SENT",
        }
        let result = await createWithdrawal(args)
        if (!result) { res.status(500).send({ message: "Withdrawal failed", statusCode: 500, data: { result: result } }); }
        res.status(201).send({ message: 'Withdrawal request made, awaiting validation', statusCode: 201, data: { result: result } });
    })
Router.route("/tiers")
    .get(isAuthenticated, async (req, res) => {
        let tiers = await findAny(7)
        res.status(200).send({ message: 'Here are the options for upgrade!', statusCode: 200, data: { tiers: tiers } });
    })
    .post(isAuthenticated, async (req, res) => {
        let result = await createUpgradeRequest(req.body)
        if (!result) { res.status(500).send({ message: "Upgrade request failed", statusCode: 500, data: { result: result } }); }
        res.status(201).send({ message: 'Upgrade request made, awaiting validation', statusCode: 201, data: { result: result } });
    })
Router.route("/packages/:userId")
    .get(isAuthenticated, async (req, res) => {
        let investments = await findAnyByUser({ userId: req.params.userId }, 4)
        res.status(200).send({ message: 'Here are the investments!', statusCode: 200, data: { investments: investments } });
    })
    .post(isAuthenticated, async (req, res) => {
        const { product, wallet, amount, frequency, duration } = req.body
        const { userId } = req.params
        let purchase = await investment({ product, wallet, amount, frequency, duration, userId })
        if (!purchase) { res.status(500).send({ message: "Investment failed", statusCode: 500, data: { purchase: purchase } }); }
        res.status(200).send({ message: 'Investent successful', statusCode: 200, data: { purchase: purchase } });
    })
Router.route("/profiles/:profileID")
    .get(isAuthenticated, async (req, res) => {
        const { profileID } = req.params
        let profile = await findAnyByID(profileID)
        res.status(200).send({ message: "Here's the  profile!", statusCode: 200, data: { profile: profile } });
    })
    .patch(isAuthenticated, async (req, res) => {
        //todo update to use more than just tiers
        const { profileID } = req.params
        let update = await updateProfile(profileID, { tier: req.body.newTier })
        let message = !update ? `Status change failed` : `Succesfully updated`;
        if (!update) {
            return res.status(500).send({ message: message, statusCode: 500, data: { update: update } });
        }
        res.status(200).send({ message: message, statusCode: 200, data: { update: update } });
    })
Router.route("/profiles/img/:email")
    .get(isAuthenticated, async (req, res) => {
        const filename = `${req.params.email}.png`;
        const options = {
            root: path.join(baseDir, 'server', 'public', 'uploads', 'profileImages')
        };
        res.status(200).sendFile(filename, options, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send({ message: 'Internal server error while sending image!', statusCode: 500 });
            }
        });
    })
    .post(isAuthenticated, setRoutePath(), uploadProfile.single("file"), async (req, res) => {
        const { _id } = req.body
        let fileName = `${req.params.email}.png`;
        let result = await updateProfile(_id, {
            imageFilename: fileName,
        })
        if (!result) {
            res.status(500).send({ message: 'Internal server error while updating image!', statusCode: 500 });
        }
        res.status(200).send({ message: 'Update successfull!', statusCode: 200 });
    })
Router.route("/profile/update/:_id")
    .patch(isAuthenticated, async (req, res) => {
        const { phone, country, city, state, occupation, gender, dob, fullname } = req.body
        let update = {
            fullname: fullname,
            address: { city: city, state: state, country: country },
            phone: phone,
            dob: dob,
            gender: gender,
            occupation: occupation
        }
        let result = await updateProfile(req.params._id, update)
        if (!result) {
            res.status(500).send({ message: 'Internal server error while updating profile!', statusCode: 500 });
        }
        res.status(200).send({ message: 'Update successfull!', statusCode: 200 });
    })
Router.route("/price")
    .get(isAuthenticated, async (req, res) => {
        let prices = await findAny(6)
        if (prices.length < 1) {
            res.status(500).send({ message: 'Internal server error while updating profile!', statusCode: 500, data: { prices: prices } });
        }
        res.status(200).send({ message: `Live prices`, statusCode: 200, data: { prices: prices } });
    })
export default Router;
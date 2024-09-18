import dotenv from "dotenv";
dotenv.config();
import { Router as _Router } from "express";
import { isAuthenticated, setRoutePath, upgradeEmail } from "../../routes/auth/middleware.js";
import { adminCreateDeposit, adminDefaultTiers, adminUpdateNetwork, adminUpdateRecords, adminUpdateTier, creditUser, debitUser, findActiveProfiles, findAny, findAnyByID, findAnyByUser, findNewestEntries, updateProfile } from "../../mongodb/methods.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Router = _Router();
// Determine the base directory
const baseDir = process.env.NODE_ENV === 'production' ? '/var/task' : path.join(__dirname, '../../../');
// Create storage engine with dynamic bucket names
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(baseDir, 'public', 'uploads', 'depositImages');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${req.routePath.email}_${req.routePath.timeStamp}.png`);
    }
});
const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(baseDir, 'public', 'uploads', 'profileImages');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        return cb(null, `${req.routePath.email}.png`)
    }
})
const QRStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(baseDir, 'public', 'uploads', 'qrCodes');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        return cb(null, `${req.routePath.network}.png`)
    }
})
// File filter to validate file type
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only PNG is allowed!'), false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})
const uploadProfile = multer({
    storage: profileStorage,
    fileFilter: fileFilter
});
const uploadQR = multer({
    storage: QRStorage,
    fileFilter: fileFilter
});
// ** Admin Routes
Router.route("/dashboard")
    .get(isAuthenticated, async (req, res) => {
        try {
            const [latestProfiles, activeUsers, newDeposits, latestWithdrawalRequests] = await Promise.all([
                findNewestEntries(0, 5),
                findActiveProfiles(0, 5),
                findNewestEntries(2, 2),
                findNewestEntries(3, 6)
            ]);
            res.status(200).send({
                message: 'Dashboard loading!',
                statusCode: 200,
                data: {
                    profiles: latestProfiles,
                    NewDeposits: newDeposits,
                    ActiveUsers: activeUsers,
                    WithdrawalRequests: latestWithdrawalRequests
                }
            });
        } catch (error) {
            res.status(500).send({ message: 'Error loading dashboard', statusCode: 500, error: error.message });
        }
    });
Router.route("/profiles")
    .get(isAuthenticated, async (req, res) => {
        let profiles = await findAny()
        res.status(200).send({ message: 'Here are the profiles!', statusCode: 200, data: { profiles: profiles } });
    })
Router.route("/profiles/:profileID")
    .get(isAuthenticated, async (req, res) => {
        const { profileID } = req.params
        let profile = await findAnyByID(profileID)
        res.status(200).send({ message: "Here's the  profile!", statusCode: 200, data: { profile: profile } });
    })
    .patch(isAuthenticated, async (req, res) => {
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
            root: path.join(baseDir, 'public', 'uploads', 'profileImages')
        };
        res.status(200).sendFile(filename, options, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send({ message: 'Internal server error while sending image!', statusCode: 500 });
            }
        });
    })
/// ** SUPPLIES DEPOSIT TABLE
Router.route("/deposits")
    .get(isAuthenticated, async (req, res) => {
        let deposits = await findAny(2)
        res.status(200).send({ message: 'Here are the deposits!', statusCode: 200, data: { deposits: deposits } });
    })
    .post(isAuthenticated, async (req, res) => {
        const { email, amount, currency } = req.body;
        let userArray = [];
        userArray = await findAnyByUser({ email: email });
        let length = userArray.length
        if (length <= 0) {
            return res.status(401).send({ message: "Target user not found, verify user email and retry", statusCode: 401, data: { result: false, userCount: length } });
        } else {
            const { _id, wallet } = userArray[0];
            let args = {
                email: email,
                userId: _id,
                walletId: wallet._id,
                amount: amount,
                currency: currency,
            };
            const result = length !== 0 ? await adminCreateDeposit(args) : false;
            let message = !result && length === 0 ? `All operations failed cause targeted user not found` : !result ? `Deposit creation failed` : length === 0 ? `Targeted user not found` : `Loading successful, will reflect in a sec`;
            if (!result) {
                return res.status(500).send({ message: message, statusCode: 500, data: { result: result, userCount: length } });
            }
            res.status(200).send({ message: message, statusCode: 200, data: { result: result, userCount: length } });
        }
    });
Router.route("/deposits/:depositID")
    .get(isAuthenticated, async (req, res) => {
        const { depositID } = req.params
        let deposit = await findAnyByID(depositID, 2)
        res.status(200).send({ message: "Here's the  deposit!", statusCode: 200, data: { deposit: deposit } });
    })
    .patch(isAuthenticated, async (req, res) => {
        const { depositID } = req.params
        const { newStatus } = req.body
        const update = await adminUpdateRecords(depositID, { status: newStatus }, 2)
        let credit = newStatus === "completed" && update ? await creditUser(depositID) : false
        let message = !update && !credit
            ? 'Failed'
            : !update
                ? 'Status change failed'
                : update && newStatus !== "completed"
                    ? 'Status updated'
                    : !credit
                        ? 'Credit failed'
                        : 'Successfully update to completed status and user account credited';

        if (!update) {
            return res.status(500).send({ message: message, statusCode: 500, data: { update: update } });
        }
        res.status(200).send({ message: message, statusCode: 200, data: { update: update } });
    })


Router.route("/withdrawals")
    .get(isAuthenticated, async (req, res) => {
        let withdrawals = await findAny(3)
        res.status(200).send({ message: 'Here are the withdrawals!', statusCode: 200, data: { withdrawals: withdrawals } });
    })
Router.route("/withdrawals/:withdrawalID")
    .get(isAuthenticated, async (req, res) => {
        // todo get specific deposit data and send
        const { withdrawalID } = req.params
        let withdrawal = await findAnyByID(withdrawalID, 3)
        res.status(200).send({ message: "Here's the  withdrawal!", statusCode: 200, data: { withdrawal: withdrawal } });
    })
    .patch(isAuthenticated, async (req, res) => {
        const { withdrawalID } = req.params
        const { newStatus } = req.body
        let update = await adminUpdateRecords(withdrawalID, { status: newStatus }, 3)
        let credit = newStatus === "completed" && update ? await debitUser(withdrawalID) : false
        let message = !update && !credit
            ? 'Failed'
            : !update
                ? 'Status change failed'
                : update && newStatus !== "completed"
                    ? 'Status updated'
                    : !credit
                        ? 'Debit failed'
                        : 'Successfully update to completed status and user account debited';

        if (!update) { res.status(500).send({ message: message, statusCode: 500, data: { update: update } }); }
        res.status(200).send({ message: message, statusCode: 200, data: { update: update } });
    })
Router.route("/networks")
    .get(isAuthenticated, async (req, res) => {
        // todo get all network data and send
        let networks = await findAny(5);
        res.status(200).send({ message: 'Here are the networks!', statusCode: 200, data: { networks: networks } });
    })
/// ** WALLET QRCODE IMAGE UPload
Router.route("/networks/:network")
    .patch(isAuthenticated, setRoutePath(), uploadQR.single("file"), async (req, res) => {
        const { network } = req.params
        const { address } = req.body
        let update = await adminUpdateNetwork(network, address);
        if (!update) {
            return res.status(500).send({ message: "Update failed", statusCode: 500, data: { update: update } });
        }
        res.status(200).send({ message: 'Update complete', statusCode: 200, data: { update: update } });
    });
/// ** DEPOSIT IMAGE Parsing
Router.route("/deposits/img/:imageFileName")
    .get(isAuthenticated, async (req, res) => {
        const filename = req.params.imageFileName;
        const options = {
            root: path.join(baseDir, 'public', 'uploads', 'depositImages')
        };
        res.status(200).sendFile(filename, options, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send({ message: 'Internal server error while sending image!', statusCode: 500 });
            }
        });
    });
///** TIERING
Router.route("/tiers")
    .get(isAuthenticated, async (req, res) => {
        await adminDefaultTiers()
        let tiers = await findAny(7)
        res.status(200).send({ message: 'Here are the tiers!', statusCode: 200, data: { tiers: tiers } });
    })
    .patch(isAuthenticated, async (req, res) => {
        const { newTier, details, instruction } = req.body
        let updates = {
            details: details,
            instructions: instruction
        }
        let update = await adminUpdateTier(newTier, updates);
        if (!update) {
            return res.status(500).send({ message: "Update failed", statusCode: 500, data: { update: update } });
        }
        res.status(200).send({ message: 'Update complete', statusCode: 200, data: { update: update } });
    })
Router.route("/tiers/requests")
    .get(isAuthenticated, async (req, res) => {
        let requests = await findAny(8)
        res.status(200).send({ message: 'Here are the upgrade requests!', statusCode: 200, data: { requests: requests } });
    })
    .patch(isAuthenticated, async (req, res) => {
        const { _id, newStatus } = req.body
        const update = await adminUpdateRecords(_id, { status: newStatus }, 8)
        let message = !update ? `Status change failed` : `Succesfully updated`;
        if (!update) {
            return res.status(500).send({ message: message, statusCode: 500, data: { update: update } });
        }
        res.status(200).send({ message: message, statusCode: 200, data: { update: update } });
    })
Router.route("/tiers/requests/mail/:email-:userId")
    .post(isAuthenticated, async (req, res) => {
        const { email } = req.params
        const { number, _id } = req.body
        const requestedTierArray = await findAnyByUser({ number: number }, 7)
        const { instructions } = requestedTierArray[0]
        let mail = await upgradeEmail(email, instructions)
        mail && await adminUpdateRecords(_id, { status: "mailed" }, 8)
        if (!mail) {
            return res.status(500).send({ message: "Mail operation failed", statusCode: 500, data: { mail: mail } });
        }
        res.status(200).send({ message: "Mail sent", statusCode: 200, data: { mail: mail } });
    })
Router.route("/packages")
    .get(isAuthenticated, async (req, res) => {
        let packages = await findAny(4)
        res.status(200).send({ message: 'Here are the upgrade requests!', statusCode: 200, data: { packages: packages } });
    })
export { Router, upload, uploadProfile, uploadQR }; 
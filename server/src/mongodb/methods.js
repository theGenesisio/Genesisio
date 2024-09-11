import dotenv from "dotenv";
dotenv.config()
import { hashSync } from "bcrypt"
import { Profile, Admin, Deposit, Withdrawal, Package, Network, Price, Tier, UpgradeRequest } from "./models.js"
import { isoToLocaleDateString } from "../routes/auth/middleware.js"
import defaultTiers from "./Tier.js";
const models = [Profile, Admin, Deposit, Withdrawal, Package, Network, Price, Tier, UpgradeRequest];
//FIND METHODS
const findAnyByID = async (_id, modelIndex = 0) => {
    if (modelIndex < 0 || modelIndex >= models.length) {
        return false
    }
    const Model = models[modelIndex];
    try {
        const found = await Model.findById(_id);
        return found || false;
    } catch (err) {
        return err;
    }
};
const findAny = async (modelIndex = 0) => {
    if (modelIndex < 0 || modelIndex >= models.length) {
        return false
    }
    const Model = models[modelIndex];
    try {
        const found = await Model.find();
        return found || [];
    } catch (err) {
        return err;
    }
};
const findAnyByUser = async (filter, modelIndex = 0) => {
    if (modelIndex < 0 || modelIndex >= models.length) {
        return false
    }
    const Model = models[modelIndex];
    try {
        const found = await Model.find(filter);
        return found || [];
    } catch (err) {
        return err;
    }
};
const findActiveProfiles = async (limit = 5) => {
    try {
        const found = await Profile.find({ active: true }).limit(limit);
        return found || [];
    } catch (err) {
        return err;
    }
};
const findNewestEntries = async (modelIndex = 0, limit = 3) => {
    if (modelIndex < 0 || modelIndex >= models.length) {
        return false
    }
    const Model = models[modelIndex];
    try {
        const newestEntries = await Model.find().sort({ createdAt: -1 }).limit(limit);
        return newestEntries;
    } catch (err) {
        return err;
    }
};
//CREATE METHODS
const dbCreateProfile = async (details) => {
    const { fullname, email, password } = details;

    const profile = new Profile({
        email: email,
        password: hashSync(password, 10),
        isAdmin: false,
        fullname: fullname,
        active: true,
        wallet: {
            balances: {
                accountBalance: 0,
                tradingCapital: 0,
                tradingWithdrawn: 0,
                totalDeposit: 0
            },
            cryptoBalances: {
                BTC: 0,
                ETH: 0,
                LTC: 0,
                USDT: 0,
                BNB: 0,
            },
        }
    });

    try {
        let result = await dbSaveDoc(profile);
        return result ? true : false;
    } catch (error) {
        console.error('Error creating profile:', error);
        return false;
    }
};
const dbCreateAdmin = async () => {
    const admin = new Admin({
        username: process.env.ADMIN_USERNAME,
        isAdmin: true,
        password: hashSync(process.env.ADMIN_PASSWORD, 10),
        active: true
    })
    try {
        let result = await dbSaveDoc(admin);
        return result ? true : false;
    } catch (error) {
        console.error('Error creating profile:', error);
        return false;
    }
}
const createDeposit = async (args) => {
    const { img, userId, walletId, amount, currency, status } = args
    try {
        const deposit = new Deposit({
            imageFilename: img,
            userId: userId,
            walletId: walletId,
            amount: amount,
            currency: currency,
            status: status
        })
        let result = await dbSaveDoc(deposit)
        return result ? true : false;
    } catch (error) {
        console.error('Error creating deposit:', error);
        return false;
    }
}
const adminCreateDeposit = async (args) => {
    const { email, userId, walletId, amount, currency } = args
    try {
        const deposit = new Deposit({
            imageFilename: `ADMIN_${email}_${Date.now()}`,
            userId: userId,
            walletId: walletId,
            amount: amount,
            currency: currency,
            status: "pending"
        })
        let result = await dbSaveDoc(deposit)
        return result ? true : false;
    } catch (error) {
        console.error('Error creating deposit:', error);
        return false;
    }
}
const createWithdrawal = async (args) => {
    const { userId, walletId, amount, currency, status, address } = args
    try {
        const withdrawal = new Withdrawal({
            userId: userId,
            walletId: walletId,
            amount: amount,
            currency: currency,
            withdrawalMethod: currency,
            withdrawalAddress: address,
            status: status
        })
        let result = await dbSaveDoc(withdrawal)
        return result ? true : false;
    } catch (error) {
        console.error('Error in registering withdrawal:', error);
        return false;
    }
}
const investment = async (args) => {
    const { product, wallet, amount, frequency, duration, userId } = args
    try {
        const purchase = new Package({
            product: product,
            userId: userId,
            duration: duration,
            amount: amount,
            wallet: wallet,
            frequency: frequency,
            status: "running",
            subscribed: true,
            percentageROI: {
                daily: 5,
                weekly: 35,
                monthly: !duration <= 1 ? null : 60,
            }
        })
        let user = await Profile.findById(userId)
        let currentHolding = getCryptoHolding(user?.wallet, wallet)
        let newHolding = (currentHolding !== undefined && currentHolding !== null) && parseFloat(currentHolding) - parseFloat(amount)
        if (!newHolding) {
            return false
        }
        if (newHolding < 0) {
            return false
        } else {
            let result = newHolding && await updateHoldingField(userId, wallet, newHolding)
            result && await dbSaveDoc(purchase)
            return result
        }
    } catch (error) {
        console.error('Error in registering purchase:', error);
        return false;
    } finally {
        await Promise.all([calcAccountBalance(userId), calcTotalTradingCapital(userId, amount, wallet)])
    }
}
async function adminDefaultTiers() {
    let count = await Tier.countDocuments()
    if (count === 0) {
        let result = await Tier.insertMany(defaultTiers);
        return result
    }
}
//UPDATE METHODS
async function createUpgradeRequest(args) {
    if (!args) {
        return false
    }
    const { number, email, _id } = args
    try {
        let request = await UpgradeRequest.updateOne(
            { number: number, userId: _id }, // Corrected filter property
            {
                $set: {
                    email: email,
                    userId: _id, // Corrected field name
                    status: "pending"
                }
            },
            { upsert: true }
        );
        return request.acknowledged;
    } catch (error) {
        console.error('Error updating request:', error);
        return false;
    }

}
const adminUpdateNetwork = async (network, newAddress) => {
    try {
        const result = await Network.updateOne(
            { networkName: network },
            { $set: { address: newAddress, qrCode: network } },
            { upsert: true }
        );
        return result.acknowledged
    } catch (error) {
        console.error('Error updating network:', error);
        return false
    }
}
const adminUpdateTier = async (number, details) => {
    let count = await Tier.countDocuments()
    if (count === 0) {
        await adminDefaultTiers()
    }
    try {
        const result = await Tier.updateOne(
            { number: number },
            { $set: details },
            { upsert: true }
        );
        return result.acknowledged
    } catch (error) {
        console.error('Error updating tier:', error);
        return false
    }
}
const adminUpdateRecords = async (_id, updates, modelIndex) => {
    if (modelIndex < 0 || modelIndex >= models.length) {
        return false
    }
    const Model = models[modelIndex];
    try {
        const result = await Model.updateOne(
            { _id: _id },
            { $set: updates },
            { upsert: true }
        );
        return result.acknowledged
    } catch (error) {
        console.error('Error updating record:', error);
        return false
    }
}
const updateProfile = async (_id, updates) => {
    try {
        const result = await Profile.updateOne(
            { _id: _id },
            { $set: updates },
            { upsert: false }
        );
        return result.acknowledged
    } catch (error) {
        console.error('Error updating profile:', error);
        return false
    }
};
const updateProfilePassword = async (email, newPassword) => {
    try {
        const result = await Profile.updateOne(
            { email: email },
            { $set: { password: hashSync(newPassword, 10) } },
            { upsert: false }
        );
        return result.acknowledged
    } catch (error) {
        console.error('Error updating profile:', error);
        return false
    }
};
const updateActiveState = async (userId, active = true) => {
    try {
        const result = await Profile.updateOne(
            { _id: userId },
            { $set: { active: active, lastSeen: isoToLocaleDateString() } },
            { upsert: true }
        );
        return result.acknowledged
    } catch (error) {
        console.error('Error updating active state:', error);
    }
};
const updateAdminActiveState = async (adminId, active = true) => {
    try {
        const result = await Admin.updateOne(
            { _id: adminId }, // Filter by admin ID
            { $set: { active: active, lastSeen: isoToLocaleDateString() } },
            { upsert: true }
        );
        return result.acknowledged
    } catch (error) {
        console.error('Error updating admin active state:', error);
    }
};
async function updatePrices(prices) {
    const updatePromises = prices.map(price => {
        return Price.updateOne(
            { id: price.id },
            {
                $set: {
                    name: price.name,
                    symbol: price.symbol,
                    price: price.price,
                    last_updated: isoToLocaleDateString(price.last_updated),
                    percent_change_24h: price.percent_change_24h
                }
            },
            { upsert: true }
        ).exec();
    });

    try {
        await Promise.all(updatePromises);
        console.log('Prices updated successfully');
    } catch (error) {
        console.error('Error updating prices:', error);
    }
}
async function creditUser(depositId) {
    let deposit = await Deposit.findById(depositId)
    const { userId, amount, currency } = deposit
    try {
        let user = await Profile.findById(userId)
        let currentHolding = getCryptoHolding(user?.wallet, currency)
        let newHolding = (currentHolding !== undefined && currentHolding !== null) && parseFloat(currentHolding) + parseFloat(amount)
        if (!newHolding) {
            await adminUpdateRecords(depositId, { status: "failed" }, 2)
            return false
        }
        let result = newHolding && await updateHoldingField(userId, currency, newHolding)
        return result
    } catch (error) {
        await adminUpdateRecords(depositId, { status: "failed" }, 2)
        console.log(error);
        return false
    } finally {
        await Promise.all([calcAccountBalance(userId), calcTotalDeposit(userId, amount, currency)])
    }
}
async function debitUser(withdrawalId) {
    let withdrawal = await Withdrawal.findById(withdrawalId)
    const { userId, amount, currency } = withdrawal
    try {
        let user = await Profile.findById(userId)
        let currentHolding = getCryptoHolding(user?.wallet, currency)
        let newHolding = (currentHolding !== undefined && currentHolding !== null) && parseFloat(currentHolding) - parseFloat(amount)
        if (!newHolding) {
            await adminUpdateRecords(withdrawalId, { status: "failed" }, 3)
            return false
        }
        if (newHolding < 0) {
            await adminUpdateRecords(withdrawalId, { status: "failed" }, 3)
            return false
        } else {
            let result = newHolding && await updateHoldingField(userId, currency, newHolding)
            return result
        }
    } catch (error) {
        await adminUpdateRecords(withdrawalId, { status: "failed" }, 3)
        console.log(error);
        return false
    } finally {
        await Promise.all([calcAccountBalance(userId), calcTotalWithdrawn(userId, amount, currency)])
    }
}
//DELETE METHODS
//SAVE METHODS
const dbSaveDoc = async (doc) => {
    try {
        return doc.save()
    } catch (err) {
        console.error({ message: "Error while saving doc in middleware", error: err })
    }
}
/// MIDDLEWARES
async function calcAccountBalance(userId) {
    try {
        const profile = await Profile.findOne({ _id: userId })
        const wallet = profile.wallet
        const [BTCHolding, ETHHolding, LTCHolding, USDTHolding, BNBHolding, pricesArray] = await Promise.all([getCryptoHolding(wallet, "BTC"), getCryptoHolding(wallet, "ETH"), getCryptoHolding(wallet, "LTC"), getCryptoHolding(wallet, "USDT"), getCryptoHolding(wallet, "BNB"), findAny(6)])
        const [BTClive, ETHlive, LTClive, USDTlive, BNBlive] = [
            pricesArray.find(price => price.id === 1)?.price,
            pricesArray.find(price => price.id === 1027)?.price,
            pricesArray.find(price => price.id === 2)?.price,
            pricesArray.find(price => price.id === 825)?.price,
            pricesArray.find(price => price.id === 1839)?.price
        ]
        const [BTCUSD, ETHUSD, LTCUSD, USDTUSD, BNBUSD] = [coinToUSD(BTClive, BTCHolding), coinToUSD(ETHlive, ETHHolding), coinToUSD(LTClive, LTCHolding), coinToUSD(USDTlive, USDTHolding), coinToUSD(BNBlive, BNBHolding)]
        let newAccountBalance = BTCUSD + ETHUSD + LTCUSD + USDTUSD + BNBUSD
        try {
            const result = await Profile.updateOne(
                { _id: userId },
                { $set: { 'wallet.balances.accountBalance': newAccountBalance } }
            );
            return result.acknowledged
        } catch (error) {
            console.error('Error updating account balance:', error);
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }
}
async function calcTotalDeposit(userId, depositAmount, currency) {
    try {
        const profile = await Profile.findOne({ _id: userId })
        const totalDeposit = profile?.wallet?.balances?.totalDeposit
        const priceObj = await findAnyByUser({ symbol: currency }, 6)
        const currencyLive = priceObj[0].price;
        const currencyUSD = coinToUSD(currencyLive, depositAmount)
        let newTotalDeposit = totalDeposit + currencyUSD
        try {
            const result = await Profile.updateOne(
                { _id: userId },
                { $set: { 'wallet.balances.totalDeposit': newTotalDeposit } }
            );
            return result.acknowledged
        } catch (error) {
            console.error('Error updating deposit balance:', error);
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }
}
async function calcTotalWithdrawn(userId, withdrawalAmount, currency) {
    try {
        const profile = await Profile.findOne({ _id: userId })
        const totalWithdrawn = profile?.wallet?.balances?.totalWithdrawn
        const priceObj = await findAnyByUser({ symbol: currency }, 6)
        const currencyLive = priceObj[0].price;
        const currencyUSD = coinToUSD(currencyLive, withdrawalAmount)
        let newTotalWithdrawn = totalWithdrawn + currencyUSD
        try {
            const result = await Profile.updateOne(
                { _id: userId },
                { $set: { 'wallet.balances.totalWithdrawn': newTotalWithdrawn } }
            );
            return result.acknowledged
        } catch (error) {
            console.error('Error updating withdrawn balance:', error);
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }
}
async function calcTotalTradingCapital(userId, investmentAmount, currency) {
    try {
        const profile = await Profile.findOne({ _id: userId })
        const tradingCapital = profile?.wallet?.balances?.tradingCapital
        const priceObj = await findAnyByUser({ symbol: currency }, 6)
        const currencyLive = priceObj[0].price;
        const currencyUSD = coinToUSD(currencyLive, investmentAmount)
        let newTradingCapital = tradingCapital + currencyUSD
        try {
            const result = await Profile.updateOne(
                { _id: userId },
                { $set: { 'wallet.balances.tradingCapital': newTradingCapital } }
            );
            return result.acknowledged
        } catch (error) {
            console.error('Error updating withdrawn balance:', error);
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }
}
async function updateHoldingField(userId, cryptoType, newHoldingValue) {
    const result = await Profile.updateOne(
        { _id: userId },
        { $set: { [`wallet.cryptoBalances.${cryptoType}.holding`]: newHoldingValue } }
    );
    if (result.acknowledged) {
        return true
    } else {
        return false
    }
}
function coinToUSD(currentValue, amount) {
    return parseFloat(currentValue * amount);
}
function getCryptoHolding(wallet, crypto) {
    if (wallet.cryptoBalances.hasOwnProperty(crypto)) {
        return wallet.cryptoBalances[crypto].holding;
    } else {
        return null;
    }
}
export { dbCreateProfile, updateActiveState, dbSaveDoc, updateAdminActiveState, dbCreateAdmin, findNewestEntries, findAny, findAnyByID, adminUpdateNetwork, adminUpdateRecords, updateProfile, findActiveProfiles, createDeposit, findAnyByUser, createWithdrawal, adminCreateDeposit, updatePrices, adminUpdateTier, adminDefaultTiers, createUpgradeRequest, investment, creditUser, debitUser, updateProfilePassword, coinToUSD, getCryptoHolding }
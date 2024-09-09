import dotenv from "dotenv";
dotenv.config()
import mongoose from 'mongoose';
import { isoToLocaleDateString } from '../routes/auth/middleware.js';
const { Schema } = mongoose;
const upgradeSchema = new Schema({
    number: { type: Number, required: true, default: 1 },
    userId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    email: { type: String, required: true },
    status: { type: String, enum: ['pending', 'mailed', 'completed', 'failed'], default: 'pending' },
}, { timestamps: true })
const tierSchema = new Schema({
    number: { type: Number, required: true },
    details: { type: String, required: true },
    instructions: { type: String, required: true },
}, { timestamps: true })
const livePriceSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    last_updated: { type: String, required: true },
    percent_change_24h: { type: Number, required: true }
}, { timestamps: true });
const depositProviderSchema = new Schema({
    qrCode: { type: String, required: true },
    address: { type: String, required: true },
    networkName: { type: String, required: true },
}, { timestamps: true })
const depositHistorySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    walletId: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
    amount: { type: Number, required: true },
    imageFilename: { type: String, required: true },
    currency: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
}, { timestamps: true });

const withdrawalHistorySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    walletId: { type: Schema.Types.ObjectId, ref: 'Wallet' },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    withdrawalMethod: { type: String, enum: ["BTC", "BNB", "ETH", "LTC", "USDT"] },
    withdrawalAddress: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
}, { timestamps: true });

const packagesSchema = new Schema({
    product: { type: String, enum: ['Crude oil', 'Bitcoin mining', 'Stock', 'Gold'] },
    userId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    duration: Number,
    amount: Number,
    wallet: { type: String, enum: ["BTC", "BNB", "ETH", "LTC", "USDT"] },
    frequency: { type: String, enum: ['Daily', 'Weekly', 'Monthly'] },
    status: { type: String, enum: ['completed', 'running'] },
    subscribed: { type: Boolean, default: false },
    percentageROI: {
        daily: Number,
        weekly: Number,
        monthly: Number,
    }
}, { timestamps: true })
const WalletSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    balances: {
        accountBalance: { type: Number, default: 0.00 },
        tradingCapital: { type: Number, default: 0.00 },
        totalWithdrawn: { type: Number, default: 0.00 },
        totalDeposit: { type: Number, default: 0.00 }
    },
    cryptoBalances: {
        BTC: {
            id: { type: Number, default: 1 },
            holding: { type: Number, default: 0.00 }
        },
        ETH: {
            id: { type: Number, default: 1027 },
            holding: { type: Number, default: 0.00 }
        },
        LTC: {
            id: { type: Number, default: 2 },
            holding: { type: Number, default: 0.00 }
        },
        USDT: {
            id: { type: Number, default: 825 },
            holding: { type: Number, default: 0.00 }
        },
        BNB: {
            id: { type: Number, default: 1839 },
            holding: { type: Number, default: 0.00 }
        },
    }
});

const profileSchema = new Schema({
    isAdmin: { type: Boolean, default: false },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tier: { type: Number, enum: [1, 2, 3], default: 1 },
    imageFilename: String,
    address: {
        city: { type: String, default: null },
        state: { type: String, default: null },
        country: { type: String, default: null }
    },
    wallet: WalletSchema,
    occupation: { type: String, default: null },
    phone: { type: String, default: null },
    dob: { type: Date, default: null },
    gender: { type: String, enum: ['male', 'female', 'rather not say'], default: null },
    active: { type: Boolean, default: false },
    lastSeen: { type: String, default: isoToLocaleDateString() }
}, { timestamps: true });

const adminSchema = new Schema({
    isAdmin: { type: Boolean, default: true },
    password: { type: String, required: true, default: process.env.ADMIN_PASSWORD },
    username: { type: String, required: true, unique: true, default: process.env.ADMIN_USERNAME },
    active: { type: Boolean, default: false },
    lastSeen: { type: String, default: isoToLocaleDateString() }
}, { timestamps: true });

// MONGOOSE CREATE MIDDLEWARE
profileSchema.pre('save', function (next) {
    if (this.isNew) {
        this.wallet.userId = this._id;
        this.tier = 1;
    }
    next();
});
profileSchema.methods.scheduleDeactivation = function () {
    setTimeout(() => {
        this.isActive = false;
        this.save();
    }, 15 * 60 * 1000); // 15 minutes in milliseconds
};

// Middleware to schedule deactivation after each save
profileSchema.post('save', function (doc) {
    doc.scheduleDeactivation();
});
adminSchema.methods.scheduleDeactivation = function () {
    setTimeout(() => {
        this.isActive = false;
        this.save();
    }, 15 * 60 * 1000); // 15 minutes in milliseconds
};

// Middleware to schedule deactivation after each save
adminSchema.post('save', function (doc) {
    doc.scheduleDeactivation();
});

export { profileSchema, depositHistorySchema, withdrawalHistorySchema, packagesSchema, WalletSchema, adminSchema, depositProviderSchema, livePriceSchema, tierSchema, upgradeSchema }
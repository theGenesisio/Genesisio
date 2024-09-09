import mongoose from "mongoose";
import { profileSchema, depositHistorySchema, withdrawalHistorySchema, packagesSchema, adminSchema, depositProviderSchema, livePriceSchema, tierSchema, upgradeSchema } from "./schema.js";

const Profile = mongoose.model('Profile', profileSchema);
const Deposit = mongoose.model('Deposit', depositHistorySchema);
const Withdrawal = mongoose.model('Withdrawal', withdrawalHistorySchema);
const Package = mongoose.model('Package', packagesSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Network = mongoose.model("Network", depositProviderSchema);
const Price = mongoose.model("Price", livePriceSchema);
const Tier = mongoose.model("Tier", tierSchema);
const UpgradeRequest = mongoose.model("UpgradeRequest", upgradeSchema);

export { Profile, Deposit, Withdrawal, Package, Admin, Network, Price, Tier, UpgradeRequest }
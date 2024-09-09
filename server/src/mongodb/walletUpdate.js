import dotenv from "dotenv";
dotenv.config();
import { Profile } from "./models.js";
import { getCryptoHolding, coinToUSD, findAny } from "./methods.js"
async function updateAccountBalances() {
    try {
        const [profiles, pricesArray] = await Promise.all([findAny(), findAny(6)]);
        const [BTClive, ETHlive, LTClive, USDTlive, BNBlive] = [
            pricesArray.find(price => price.id === 1)?.price,
            pricesArray.find(price => price.id === 1027)?.price,
            pricesArray.find(price => price.id === 2)?.price,
            pricesArray.find(price => price.id === 825)?.price,
            pricesArray.find(price => price.id === 1839)?.price
        ];

        if (profiles && profiles.length !== 0) {
            const bulkOps = [];

            for (const profile of profiles) {
                const { wallet } = profile;
                const [BTCHolding, ETHHolding, LTCHolding, USDTHolding, BNBHolding] = await Promise.all([
                    getCryptoHolding(wallet, "BTC"),
                    getCryptoHolding(wallet, "ETH"),
                    getCryptoHolding(wallet, "LTC"),
                    getCryptoHolding(wallet, "USDT"),
                    getCryptoHolding(wallet, "BNB")
                ]);

                const [BTCUSD, ETHUSD, LTCUSD, USDTUSD, BNBUSD] = [
                    coinToUSD(BTClive, BTCHolding),
                    coinToUSD(ETHlive, ETHHolding),
                    coinToUSD(LTClive, LTCHolding),
                    coinToUSD(USDTlive, USDTHolding),
                    coinToUSD(BNBlive, BNBHolding)
                ];

                const newAccountBalance = BTCUSD + ETHUSD + LTCUSD + USDTUSD + BNBUSD;

                bulkOps.push({
                    updateOne: {
                        filter: { _id: profile._id },
                        update: { $set: { 'wallet.balances.accountBalance': newAccountBalance } }
                    }
                });
            }

            if (bulkOps.length > 0) {
                const result = await Profile.bulkWrite(bulkOps);
                console.log(`${result.modifiedCount} profiles updated successfully.`);
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export { updateAccountBalances }
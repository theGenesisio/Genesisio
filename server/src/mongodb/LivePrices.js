import dotenv from "dotenv";
dotenv.config();
import cron from "node-cron"
import { updatePrices } from "./methods.js";
import mongoose from "mongoose";
import { updateAccountBalances } from "./walletUpdate.js";
const { connection } = mongoose;
const url = {
    endpoint: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    query: {
        start: "1",
        limit: "25",
        sort: "market_cap",
        cryptocurrency_type: "all",
        tag: "all"
    }
};

let updatedPrices = [];
const uri = `${url.endpoint}?start=${url.query.start}&limit=${url.query.limit}&sort=${url.query.sort}&cryptocurrency_type=${url.query.cryptocurrency_type}&tag=${url.query.tag}`;

function intervalPromise(uri, interval, duration) {
    return new Promise((resolve, reject) => {
        let elapsed = 0;
        let response = null;

        const id = setInterval(async () => {
            elapsed += interval;

            try {
                console.log('Running live price update task...');
                const res = await fetch(uri, {
                    headers: {
                        'X-CMC_PRO_API_KEY': process.env.COINMARKET_CAP_API_KEY,
                    },
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                response = await res.json();
            } catch (ex) {
                response = null;
                console.log(ex);
                reject(ex);
                clearInterval(id);
                return;
            }

            if (response) {
                async function extractAndTransformData(jsonObject) {
                    const idsToExtract = [1, 2, 825, 1027, 1839];
                    const extractedData = jsonObject.data.filter(item => idsToExtract.includes(item.id));
                    const transformedData = extractedData.map(item => ({
                        id: item.id,
                        name: item.name,
                        symbol: item.symbol,
                        price: item.quote.USD.price,
                        last_updated: item.quote.USD.last_updated,
                        percent_change_24h: item.quote.USD.percent_change_24h
                    }));
                    return transformedData;
                }

                extractAndTransformData(response).then(result => updatedPrices = result);
                resolve(response);
                clearInterval(id);
            }

            if (elapsed >= duration) {
                clearInterval(id);
                if (!response) {
                    reject(new Error('No response within the specified duration'));
                }
            }
        }, interval);
    });
}
let retry = 0;
function fetchData() {
    intervalPromise(uri, 1000, 5000)
        .then(response => {
            response && updatePrices(updatedPrices);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Retry immediately if there was an error
            retry++
            retry < 3 && fetchData()
        });
}
// Schedule the task to run every 6 hours
cron.schedule('0 */6 * * *', async () => {
    console.log('Running live price update task...');
    fetchData()
    await updateAccountBalances()
});
connection.on('connected', () => {
    fetchData()
});

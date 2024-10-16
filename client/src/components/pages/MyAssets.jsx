import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { Badge, Typography } from "@material-tailwind/react";
import Balance from "../subcomponents/Balance";
import MyAssetCard from "../subcomponents/MyAssetCard";
import MyAssetsChart from "../subcomponents/TradeviewWidget/MyassetsChart";
import Lorem from "../../assets/constants";
const MyAssets = (props) => {
  const { user } = useContext(AuthContext);
  const [prices, setPrices] = useState(null);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API}/price`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          setPrices(null);
          setRetry((prev) => prev++);
        }
        const res = await response.json();
        let obj = {
          BTC: res.data.prices.find((price) => price.id === 1),
          ETH: res.data.prices.find((price) => price.id === 1027),
          LTC: res.data.prices.find((price) => price.id === 2),
          USDT: res.data.prices.find((price) => price.id === 825),
          BNB: res.data.prices.find((price) => price.id === 1839),
        };
        res && setPrices(obj);
      } catch (error) {
        setPrices(null);
        setRetry((prev) => prev++);
        console.log(error);
      }
    };

    fetchPrice();
  }, [retry]);
  return (
    <section
      className="flex flex-col min-h-screen py-8
     mx-auto"
    >
      <h1 className="text-accent-green text-start text-demiTopic font-semibold">
        <Badge
          content={user?.tier}
          placement="top-end"
          className={
            user?.tier === 3
              ? "bg-purple-400 text-white"
              : user?.tier === 2
                ? "bg-teal-500 text-white"
                : "bg-blue-700 text-white"
          }
        >
          {user?.fullname}
        </Badge>
      </h1>
      <Balance />
      <div className="flex flex-col-reverse lg:flex-row w-full justify-between lg:gap-5 gap-5 my-5">
        <div className="container flex flex-col gap-2">
          <div className="bg-inherit flex flex-row justify-between text-gray-400 px-3">
            <Typography className="font-bold text-sm">
              Coin
            </Typography>
            <Typography className="font-bold text-sm">
              Price
            </Typography>
            <Typography className="font-bold text-sm">
              Holding
            </Typography>
          </div>
          {prices !== null &&
            Lorem.financeOptions.map((coin) => (
              <MyAssetCard
                key={coin.name}
                name={coin.name}
                data={prices[coin.symbol]}
              />
            ))}
        </div>
        <div className="container">{<MyAssetsChart />}</div>
      </div>
    </section>
  );
};
export default MyAssets;

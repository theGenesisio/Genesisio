import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/subcomponents/WithdrawalCard";
import WithdrawalForm from "../../components/subcomponents/WithdrawalForm";
import Lorem from "../../assets/constants";
import { gsapAnimationBase } from "../../assets/utils";
import { AuthContext } from "../../AuthProvider";
const Withdrawal = () => {
  gsapAnimationBase(".withdraw");
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
          throw new Error(`Error: ${response.status} ${response.message}`);
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
      <h1 className="text-white text-start text-topic font-normal mb-5 withdraw">
        Withdrawal
      </h1>
      <div className="flex flex-col lg:flex-row w-full justify-between lg:gap-5 gap-2">
        <div className="container flex flex-col gap-2">
          {Lorem.financeOptions.map((coin) => (
            <Card
              name={coin.name}
              symbol={coin.symbol}
              bal={user.wallet.cryptoBalances[coin.symbol]}
              prices={prices}
              key={coin.name}
            />
          ))}
        </div>
        <WithdrawalForm prices={prices} />
      </div>
    </section>
  );
};

export default Withdrawal;

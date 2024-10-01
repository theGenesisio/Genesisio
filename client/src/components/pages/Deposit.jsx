import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DepositBTC from "../subcomponents/DepositBTC";
import DepositETH from "../subcomponents/DepositETH";
import DepositLTC from "../subcomponents/DepositLTC";
import DepositUSDT from "../subcomponents/DepositUSDT";
import DepositBNB from "../subcomponents/DepositBNB";
const Deposit = () => {
  let { network } = useParams();
  const [btc, setbtc] = useState(0);
  const [eth, seteth] = useState(0);
  const [ltc, setltc] = useState(0);
  const [usdt, setusdt] = useState(0);
  const [bnb, setbnb] = useState(0);
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
        res && setbtc(obj.BTC);
        res && seteth(obj.ETH);
        res && setltc(obj.LTC);
        res && setusdt(obj.USDT);
        res && setbnb(obj.BNB);
      } catch (error) {
        setbtc(null);
        seteth(null);
        setltc(null);
        setusdt(null);
        setbnb(null);
        setRetry((prev) => prev++);
        console.log(error);
      }
    };

    fetchPrice();
  }, [retry]);
  switch (network) {
    case ":btc":
      return <DepositBTC price={btc}/>;
    case ":eth":
      return <DepositETH price={eth}/>;
    case ":ltc":
      return <DepositLTC price={ltc}/>;
    case ":tether":
      return <DepositUSDT price={usdt}/>;
    case ":binance":
      return <DepositBNB price={bnb}/>;
    default:
      return <DepositBTC price={btc} />;
  }
};
export default Deposit;

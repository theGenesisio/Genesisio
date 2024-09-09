import React from "react";
import { useParams } from "react-router-dom";
import DepositBTC from "../subcomponents/DepositBTC";
import DepositETH from "../subcomponents/DepositETH";
import DepositLTC from "../subcomponents/DepositLTC";
import DepositUSDT from "../subcomponents/DepositUSDT";
import DepositBNB from "../subcomponents/DepositBNB";
const Deposit = () => {
  let { network } = useParams();
  switch (network) {
    case ":btc":
      return <DepositBTC />;
    case ":eth":
      return <DepositETH />;
    case ":ltc":
      return <DepositLTC />;
    case ":tether":
      return <DepositUSDT />;
    case ":binance":
      return <DepositBNB />;
    default:
      return <DepositBTC />;
  }
};
export default Deposit;
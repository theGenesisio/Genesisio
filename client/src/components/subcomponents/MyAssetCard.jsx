import React, { useContext } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { CryptoIcons } from "../../assets/utilities";
import { AuthContext } from "../../AuthProvider";

const MyAssetCard = (props) => {
  const { user } = useContext(AuthContext);
  const { name, data } = props;
  const { price, percent_change_24h, symbol } = data;
  let change = parseFloat(percent_change_24h);
  function coinToUSD(currentValue, amount) {
    return parseFloat(currentValue * amount).toLocaleString();
  }
  return (
    <Card className="sm:w-full  bg-inherit border border-secondary-blue p-0 shadow-sm shadow-secondary-blue withdraw">
      <CardBody className="text-white flex flex-row justify-between">
        <div className="flex flex-row justify-start gap-2">
          {CryptoIcons[symbol]}
          <div className="md:flex md:flex-col hidden">
            <Typography className="font-normal lg:text-demiTopic text-md">
              {name}
            </Typography>
            <Typography className="font-medium lg:text-sm text-gray-400 text-xs">
              {symbol}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col text-end">
          <Typography className="font-medium lg:text-demiTopic text-md">
            {`$${price.toLocaleString()}`}
          </Typography>
          <Typography
            className={`font-normal text-xs ${change > 1 ? " text-accent-change-green" : "  text-accent-red"}`}
          >
            {`${change.toPrecision(3)}%`}
          </Typography>
        </div>
        <div className="flex flex-col text-end">
          <Typography className="font-normal lg:text-demiTopic text-md">
            {`$${coinToUSD(user?.wallet?.cryptoBalances[symbol]?.holding, price)}`}
          </Typography>
          <Typography className="font-medium lg:text-sm text-gray-400 text-xs">
            {user?.wallet?.cryptoBalances[symbol]?.holding.toPrecision(5)}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};
export default MyAssetCard;

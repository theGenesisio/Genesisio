import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { CryptoIcons } from "../../assets/utilities";

const WithdrawalCard = (props) => {
  const { name, symbol, bal, prices } = props;
  function coinToUSD(currentValue, amount) {
    let res = parseFloat(currentValue * amount);
    return res.toFixed(7);
  }
  return (
    <Card className="sm:w-full  bg-inherit border border-secondary-blue p-0 shadow-sm shadow-secondary-blue withdraw">
      <CardBody className="text-white flex flex-row justify-between">
        <div className="flex flex-row justify-start gap-2">
          {CryptoIcons[symbol]}
          <div className="flex flex-col">
            <Typography className="font-medium text-demiTopic">
              {symbol}
            </Typography>
            <Typography className="font-normal text-sm">{name}</Typography>
          </div>
        </div>
        <div className="flex flex-col text-end text-white">
          <Typography className="font-bold text-demiTopic">
            {parseFloat(bal?.holding).toFixed(7)}
          </Typography>
          {prices !== null && (
            <Typography className="font-normal text-xs text-accent-green">{`${coinToUSD(prices[symbol]?.price, bal?.holding)} USD`}</Typography>
          )}
          {prices === null && (
            <Typography className="font-normal text-sm text-accent-green">Converting...</Typography>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
export default WithdrawalCard;

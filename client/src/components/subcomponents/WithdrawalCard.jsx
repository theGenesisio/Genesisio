import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { CryptoIcons } from "../../assets/utilities";

const WithdrawalCard = (props) => {
  const { name, symbol, bal } = props;
  const [price, setPrice] = useState("..requesting");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API}/price/${symbol}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          setPrice("...Loading");
          setRetry((prev) => prev++);
          throw new Error(`Error: ${response.status} ${response.message}`);
        }
        const res = await response.json();
        res && coinToUSD(res?.data.price, bal.holding);
      } catch (error) {
        setPrice("...Loading");
        setRetry((prev) => prev++);
        console.log(error);
      }
    };

    fetchPrice();
  }, [retry]);

  function coinToUSD(currentValue, amount) {
    let res = parseFloat(currentValue * amount);
    return setPrice(res.toLocaleString());
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
            {parseFloat(bal.holding).toFixed(7)}
          </Typography>
          {price && (
            <Typography className="font-normal text-sm text-accent-green">{`${price} USD`}</Typography>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
export default WithdrawalCard;

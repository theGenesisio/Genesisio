import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import FormError from "../subcomponents/FormError";
export default function Web3Dialog(props) {
  const { modal, args } = props;
  const { fullname, email, _id, wallet } = args;
  const [open, setOpen] = useState(modal);
  const handleOpen = () => setOpen((cur) => !cur);
  const [newTier, setNewTier] = useState(null);
  const [response, setResponse] = useState(null);
  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_ADMIN}/profiles/img/${email}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          setResponse(response.message);
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImgURL(imageUrl);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchImg();
  }, []);
  const handleStatus = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_ADMIN}/profiles/${_id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newTier,
          }),
        }
      );
      if (!response.ok) {
        setResponse({
          message: "Network response was not ok",
          statusCode: 500,
        });
      }
      const result = await response.json();
      setResponse(result);
    } catch (error) {
      setResponse({ message: "An error occurred", statusCode: 400 });
    }
  };
  useEffect(() => {
    if (response?.statusCode === 200) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [response]);
  return (
    <>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent"
      >
        <DialogBody>
          <Card className="w-full shadow-lg bg-primary-blue">
            <CardHeader floated={false} color="blue-gray">
              {imgURL && <img src={imgURL} />}
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h5"
                  className="font-normal  flex flex-row gap-2 text-white"
                >
                  Fullname
                </Typography>
                <Typography
                  variant="h5"
                  className="flex items-center gap-1.5 font-normal text-accent-green"
                >
                  {fullname}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-normal  text-gray-400 flex flex-row gap-2"
                >
                  Account balance
                </Typography>
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-white"
                >
                  {`${wallet?.balances?.accountBalance.toLocaleString()} USD`}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-normal  text-gray-400 flex flex-row gap-2"
                >
                  Trading capital
                </Typography>
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-white"
                >
                  {`${wallet?.balances?.tradingCapital.toLocaleString()} USD`}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-normal  text-gray-400 flex flex-row gap-2"
                >
                  Total withdrawn
                </Typography>
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-white"
                >
                  {`${wallet?.balances?.totalWithdrawn.toLocaleString()} USD`}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-normal  text-gray-400 flex flex-row gap-2"
                >
                  Total deposit
                </Typography>
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-white"
                >
                  {`${wallet?.balances?.totalDeposit.toLocaleString()} USD`}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-normal  text-gray-400 flex flex-row gap-2"
                >
                  Bitcoin
                </Typography>
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-white"
                >
                  {wallet.cryptoBalances.BTC?.holding.toFixed(5)}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-normal  text-gray-400 flex flex-row gap-2"
                >
                  Ethereum
                </Typography>
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-white"
                >
                  {wallet.cryptoBalances.ETH?.holding.toFixed(5)}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-normal  text-gray-400 flex flex-row gap-2"
                >
                  Litecoin
                </Typography>
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-white"
                >
                  {wallet.cryptoBalances.LTC?.holding.toFixed(5)}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-normal  text-gray-400 flex flex-row gap-2"
                >
                  Tether
                </Typography>
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-white"
                >
                  {wallet.cryptoBalances.USDT?.holding.toFixed(5)}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-normal  text-gray-400 flex flex-row gap-2"
                >
                  Binance coin
                </Typography>
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-white"
                >
                  {wallet.cryptoBalances.BNB?.holding.toFixed(5)}
                </Typography>
              </div>
              <Select
                label="Upgrade tier to:"
                value={newTier}
                size="xs"
                variant="standard"
                onChange={(val) => setNewTier(val)}
                className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
              >
                <Option
                  className="hover:bg-accent-green hover:text-white"
                  value={1}
                >
                  Tier one
                </Option>
                <Option
                  className="hover:bg-accent-green hover:text-white"
                  value={2}
                >
                  Tier two
                </Option>
                <Option
                  className="hover:bg-accent-green hover:text-white"
                  value={3}
                >
                  Tier three
                </Option>
              </Select>
            </CardBody>
            <CardFooter className="pt-3">
              <button
                type="submit"
                onClick={handleStatus}
                disabled={!newTier}
                fullWidth
                className={`w-full px-6 py-3 text-md font-bold tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 disabled:hidden uppercase deposit`}
              >
                {` Upgrade to tier ${newTier}`}
              </button>
              {response?.message && (
                <FormError err={response.message} code={response.statusCode} />
              )}
            </CardFooter>
          </Card>
        </DialogBody>
      </Dialog>
    </>
  );
}

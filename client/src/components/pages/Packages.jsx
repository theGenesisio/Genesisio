import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { Collapse, Option, Select, Typography } from "@material-tailwind/react";
import { Link, Navigate } from "react-router-dom";
import FormError from "../subcomponents/FormError";
const Packages = () => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const [response, setResponse] = useState(null);
  const [redirect, setRedirect] = useState(null);
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
          setPrices("...Loading");
          setRetry((prev) => prev++);
          setResponse(response.message);
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
        setPrices("...Loading");
        setRetry((prev) => prev++);
        console.log(error);
      }
    };

    fetchPrice();
  }, [retry]);
  function coinToUSD(currentValue, amount) {
    return parseFloat(currentValue * amount).toLocaleString();
  }
  function truthy(...args) {
    return args.every((arg) => Boolean(arg));
  }
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    } else {
      setAmount("");
    }
  };
  const handlePurchase = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/packages/${user?._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product,
            wallet,
            amount,
            frequency,
            duration,
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
      console.log(error);
      setResponse({ message: "An error occurred", statusCode: 400 });
    }
  };
  useEffect(() => {
    if (response?.statusCode === 200) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [response]);
  return (
    <section className="bg-primary-blue">
      <div className="flex items-center justify-center min-h-screen px-6 mx-auto">
        <div className="w-full flex flex-col gap-5  max-w-2xl vessel">
          <div className="flex items-center justify-center my-5">
            <Typography className="w-3/4 pb-4 font-demiTopic text-center text-accent-green capitalize border-b-2 border-accent-green">
              Choose A Package Option
            </Typography>
          </div>
          <Select
            label="Select package product"
            key="package"
            value={product}
            variant="standard"
            onChange={(val) => setProduct(val)}
            className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
          >
            <Option
              value="Stock"
              className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
            >
              Stock
            </Option>
            <Option
              value="Crude oil"
              className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
            >
              Crude oil
            </Option>
            <Option
              value="Bitcoin mining"
              className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
            >
              Bitcoin mining
            </Option>
            <Option
              value="Gold"
              className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
            >
              Gold
            </Option>
          </Select>
          {product && (
            <Select
              label="Choose Payment Wallet"
              value={wallet}
              key="wallet"
              variant="standard"
              onChange={(val) => setWallet(val)}
              className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
            >
              <Option
                value="BTC"
                className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white flex flex-row justify-between"
              >
                <Typography className="flex flex-row gap-2">
                  <span>Bitcoin</span>
                  <span className="text-accent-green font-medium lg:text-sm text-xs">
                    {`= ${coinToUSD(
                      prices?.BTC.price,
                      user?.wallet?.cryptoBalances.BTC?.holding
                    )} USD`}
                  </span>
                </Typography>
              </Option>
              <Option
                value="ETH"
                className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
              >
                <Typography className="flex flex-row gap-2">
                  <span>Ethereum</span>
                  <span className="text-accent-green font-medium lg:text-sm text-xs">
                    {`= ${coinToUSD(
                      prices?.ETH.price,
                      user?.wallet?.cryptoBalances.ETH?.holding
                    )} USD`}
                  </span>
                </Typography>
              </Option>
              <Option
                value="LTC"
                className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white flex flex-row justify-between"
              >
                <Typography className="flex flex-row gap-2">
                  <span>Litecoin</span>
                  <span className="text-accent-green font-medium lg:text-sm text-xs">
                    {`= ${coinToUSD(
                      prices?.LTC.price,
                      user?.wallet?.cryptoBalances.LTC?.holding
                    )} USD`}
                  </span>
                </Typography>
              </Option>
              <Option
                value="USDT"
                className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white flex flex-row justify-between"
              >
                <Typography className="flex flex-row gap-2">
                  <span>Tether</span>
                  <span className="text-accent-green font-medium lg:text-sm text-xs">
                    {`= ${coinToUSD(
                      prices?.USDT.price,
                      user?.wallet?.cryptoBalances.USDT?.holding
                    )} USD`}
                  </span>
                </Typography>
              </Option>
              <Option
                value="BNB"
                className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white flex flex-row justify-between"
              >
                <Typography className="flex flex-row gap-2">
                  <span>Binance coin</span>
                  <span className="text-accent-green font-medium lg:text-sm text-xs">
                    {`= ${coinToUSD(
                      prices?.BNB.price,
                      user?.wallet?.cryptoBalances.BNB?.holding
                    )} USD`}
                  </span>
                </Typography>
              </Option>
            </Select>
          )}
          {wallet && (
            <Collapse open={wallet} className="flex flex-col gap-2">
              <input
                type="text"
                className="block w-full"
                name="amount"
                placeholder="Equivalent of $1,000-$200,000"
                onChange={handleAmountChange}
                value={amount}
                required
              />
              {amount && (
                <p className="text-accent-green font-medium lg:text-sm text-xs">
                  {`= ${coinToUSD(prices[wallet]?.price, amount)} USD`}
                </p>
              )}
              {truthy(amount === "") && (
                <p className="text-accent-red">Amount cannot be empty</p>
              )}
              {truthy(amount > user.wallet.cryptoBalances[wallet]?.holding) && (
                <p className="text-accent-red">{`Can not exceed maximum ${wallet} balance`}</p>
              )}
              {coinToUSD(prices[wallet]?.price, amount) < 1000 && (
                <p className="text-accent-red">
                  Amount must be greater than $1,000
                </p>
              )}
              {truthy(
                parseFloat(amount) >
                  user?.wallet?.cryptoBalances[wallet]?.holding
              ) && (
                <div>
                  <p className="text-accent-red">
                    {`Max ${wallet} balance exceeded`}
                  </p>
                  <Link
                    to={`/genesisio/deposit/:${wallet.toLowerCase()}`}
                    className="font-medium text-accent-green underline"
                  >
                    Consider topping up your wallet
                  </Link>
                </div>
              )}
            </Collapse>
          )}
          {amount && (
            <Select
              label="Duration"
              value={duration}
              key="duration"
              variant="standard"
              onChange={(val) => setDuration(val)}
              className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
            >
              <Option
                value={0.25}
                className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
              >
                One week
              </Option>
              <Option
                value={0.5}
                className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
              >
                Two weeks
              </Option>
              <Option
                value={1}
                className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
              >
                One month
              </Option>
              <Option
                value={3}
                className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
              >
                Three months
              </Option>
            </Select>
          )}
          {duration && (
            <Select
              label="Frequency"
              value={frequency}
              key="freq"
              variant="standard"
              onChange={(val) => setFrequency(val)}
              className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
            >
              <Option
                value="Daily"
                className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
              >
                Daily
              </Option>
              <Option
                value="Weekly"
                className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
              >
                Weekly
              </Option>
              <Option
                value="Monthly"
                className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
              >
                Monthly
              </Option>
            </Select>
          )}
          {truthy(duration < 1 && frequency === "Monthly") && (
            <p className="text-accent-red">Choose a lower frequency</p>
          )}
          {frequency && (
            <button
              fullWidth
              disabled={duration === null}
              onClick={handlePurchase}
              className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 uppercase mt-6 disabled:hidden ${amount > user.wallet.cryptoBalances[wallet]?.holding ? `hidden` : coinToUSD(prices[wallet]?.price, amount) < 1000 ? `hidden` : truthy(amount === "") ? `hidden` : `block`}`}
            >
              {`Subscribe to ${product} package`}
            </button>
          )}
          {response && (
            <FormError err={response.message} code={response.statusCode} />
          )}
          {redirect && <Navigate to="/genesisio/records" />}
        </div>
      </div>
    </section>
  );
};

export default Packages;

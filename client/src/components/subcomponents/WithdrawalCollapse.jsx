import React, { useContext, useEffect, useState } from "react";
import FormError from "../subcomponents/FormError.jsx";
import { Collapse, Typography } from "@material-tailwind/react";
import { AuthContext } from "../../AuthProvider.jsx";
import { Navigate } from "react-router-dom";
const WithdrawalCollapse = (props) => {
  const { user } = useContext(AuthContext);
  const [network, setNetwork] = useState(props.network);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState({});
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setNetwork(props.network);
  }, [props.network]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    } else {
      setAmount("");
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/withdrawals/${user._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address,
            amount,
            network,
            walletId: user.wallet._id,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        setError({
          message: error.data.message || "Network response was not ok",
          statusCode: response.status,
        });
        throw new Error(error.message || "Network response was not ok");
      }

      const result = await response.json();
      setError({ message: result.message, statusCode: result.statusCode });
    } catch (error) {
      setError({
        message: "An error occurred during withdrawal",
        statusCode: 500,
      });
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  useEffect(() => {
    if (error?.statusCode === 201) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [error]);
  function truthy(...args) {
    return args.every((arg) => Boolean(arg));
  }
  switch (network) {
    case "Bank":
      return (
        <Collapse
          open={network ? true : false}
          className="flex flex-col gap-5 text-gray-400 p-5"
        >
          <div className="justify-center flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21l5-5.01V8h5.92C19.97 5.51 16.16 4 12 4m7 14h2v2h-2z"
              />
              <path fill="currentColor" d="M19 10h2v6h-2z" />
            </svg>
          </div>
          <div>
            <Typography as="p" className="font-semibold text-xl text-center">
              This gateway is currently unavailable right now, we recommend
              using another payment gateway
            </Typography>
          </div>
        </Collapse>
      );
    default:
      return (
        <Collapse open={network ? true : false} className="flex flex-col gap-2">
          <input
            type="text"
            className="block w-full"
            name="amount"
            placeholder="0.00"
            onChange={handleAmountChange}
            value={amount}
            required
          />
          {truthy(amount === "") && (
            <p className="text-accent-red">Amount cannot be empty</p>
          )}
          {truthy(amount > user?.wallet?.cryptoBalances[network]?.holding) && (
            <p className="text-accent-red">{`Can not exceed maximum ${network} balance`}</p>
          )}
          {truthy(parseFloat(amount) == 0) && (
            <p className="text-accent-red">Amount must be greater than zero</p>
          )}
          <input
            type="text"
            name="address"
            value={address}
            required
            onChange={handleAddressChange}
            className="block w-full"
            placeholder={`Enter ${network} address`}
          />
          {truthy(address === "") && (
            <p className="text-accent-red">Enter a valid address</p>
          )}

          <button
            fullWidth
            disabled={truthy(parseFloat(amount) === 0)}
            onClick={handleWithdrawal}
            className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 uppercase mt-6 disabled:hidden ${truthy(address === "") ? `hidden` : `block`} ${
              parseFloat(amount) >
                user?.wallet?.cryptoBalances[network]?.holding && `hidden`
            }`}
          >
            Request withdrawal
          </button>
          {error?.statusCode && (
            <FormError err={error.message} code={error.statusCode} />
          )}
          {redirect && <Navigate to="/genesisio/records" />}
        </Collapse>
      );
  }
};
export default WithdrawalCollapse;

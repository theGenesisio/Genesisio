import { Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import { lockIcon, pasteIcon } from "../../../../../assets/utilities";
import FormError from "../../../../subcomponents/FormError";
const AdminNewDeposit = () => {
  const [currency, setCurrency] = useState(null);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    } else {
      setAmount("");
    }
  };
  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const paste = async (e) => {
    e.preventDefault()
    try {
      const text = await navigator.clipboard.readText();
      setEmail(text);
    } catch (err) {
      console.error("Failed to paste: ", err);
    }
  };
  const load = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_ADMIN}/deposits`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currency,
            amount,
            email,
          }),
        }
      );

      const result = await response.json();
      setError({ message: result.message, statusCode: result.statusCode });
      setAmount("");
      setCurrency(null);
      setEmail("");
      if (!response.ok) {
        setError({
          message: result.message || "Network response was not ok",
          statusCode: response.status,
        });
        throw new Error(result.message || "Network response was not ok");
      }
    } catch (error) {
      setError({
        message: error.message || "An error occurred during the operation",
        statusCode: 500,
      });
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-5">
      <div className="w-full bg-transparent text-white">
        <Select
          label="Network to update"
          value={currency}
          size="md"
          variant="standard"
          onChange={(val) => setCurrency(val)}
          className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
        >
          <Option
            value="BTC"
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
          >
            Bitcoin
          </Option>
          <Option
            value="ETH"
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
          >
            Ethereum
          </Option>
          <Option
            value="LTC"
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
          >
            Litecoin
          </Option>
          <Option
            value="USDT"
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
          >
            Tether
          </Option>
          <Option
            value="BNB"
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
          >
            Binance coin
          </Option>
        </Select>
      </div>
      <div>
        <div className="relative flex items-center w-full">
          <input
            required
            type="email"
            value={email}
            onChange={handleEmail}
            className="block w-full"
            placeholder="Target user's address"
            name="email"
          />
          <span
            className="absolute mx-3 text-gray-400 hover:text-accent-green"
            onClick={paste}
          >
            {pasteIcon}
          </span>
        </div>
        {email === "" && <FormError err={"Invalid email"} />}
      </div>
      <div>
        <div className="relative flex items-center">
          <span className="absolute mx-3 text-gray-400">{lockIcon}</span>

          <input
            type="text"
            className="block w-full"
            name="amount"
            placeholder="0.00"
            onChange={handleAmountChange}
            value={amount}
            required
          />
        </div>
        {amount === "" && (
          <p className="text-accent-red">Amount cannot be empty</p>
        )}
        {parseFloat(amount) == 0 && (
          <p className="text-accent-red">Amount must be greater than zero</p>
        )}
      </div>
      {amount !== "" && (
        <button
          fullWidth
          disabled={email === ""}
          onClick={load}
          className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 uppercase disabled:hidden ${currency === null ? `hidden ` : `block `} ${parseFloat(amount) == 0 ? `hidden` : `block`}`}
        >
          Load wallet
        </button>
      )}
      {error && <FormError err={error.message} code={error.statusCode} />}
    </div>
  );
};

export default AdminNewDeposit;

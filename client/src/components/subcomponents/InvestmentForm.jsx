import React from "react";
import Lorem from "../../assets/constants";
import { Select, Option } from "@material-tailwind/react";
import InvestmentCollapse from "./InvestmentCollapse";
const InvestmentForm = () => {
  const [wallet, setWallet] = React.useState(false);
  const [pack, setPack] = React.useState(false);
  const [frequency, setFrequency] = React.useState(false);
  const [Bitcoin, Ethereum, Litecoin, Tether, Binance] = Lorem.financeOptions;
  const [stock, crudeOil, bitcoinMining, gold] = Lorem.packageOptions;
  return (
    <form className="w-full invest">
      <div className="w-full my-10 bg-transparent text-white">
        <Select
          label="Select a package"
          value={pack}
          variant="standard"
          onChange={(val) => setPack(val)}
          className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
        >
          <Option
            value={stock.type}
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white capitalize"
          >
            {stock.type}
          </Option>
          <Option
            value={crudeOil.type}
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white capitalize"
          >
            {crudeOil.type}
          </Option>
          <Option
            value={bitcoinMining.type}
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white capitalize"
          >
            {bitcoinMining.type}
          </Option>
          <Option
            value={gold.type}
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white capitalize"
          >
            {gold.type}
          </Option>
        </Select>
      </div>
      <div className="w-full my-10 bg-transparent text-white">
        <Select
          label="Select a frequency"
          wallet={frequency}
          variant="standard"
          onChange={(val) => setFrequency(val)}
          className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
        >
          {Lorem.packageFrequency.map((freq) => (
            <Option
              key={freq}
              value={freq}
              className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
            >
              {`${freq} month(s)`}
            </Option>
          ))}
        </Select>
      </div>
      <div className="w-full my-10 bg-transparent text-white">
        <Select
          label="Choose Payment Wallet"
          value={wallet}
          variant="standard"
          onChange={(val) => setWallet(val)}
          className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
        >
          <Option
            value={Bitcoin.symbol}
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
          >
            {Bitcoin.name}
          </Option>
          <Option
            value={Ethereum.symbol}
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
          >
            {Ethereum.name}
          </Option>
          <Option
            value={Litecoin.symbol}
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
          >
            {Litecoin.name}
          </Option>
          <Option
            value={Tether.symbol}
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
          >
            {Tether.name}
          </Option>
          <Option
            value={Binance.symbol}
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
          >
            {Binance.name}
          </Option>
        </Select>
      </div>
      <InvestmentCollapse wallet={wallet} />
      {wallet == false ? null : (
        <div className="mt-6">
          <button
            fullWidth
            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 uppercase"
          >
            Invest now
          </button>
        </div>
      )}
    </form>
  );
};
export default InvestmentForm;

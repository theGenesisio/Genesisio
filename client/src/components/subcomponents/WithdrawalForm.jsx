import React from "react";
import Lorem from "../../assets/constants";
import { Select, Option } from "@material-tailwind/react";
import WithdrawalCollapse from "./WithdrawalCollapse";
const WithdrawalForm = () => {
  const [value, setValue] = React.useState(null);
  const [Bitcoin, Ethereum, Litecoin, Tether, Binance] = Lorem.financeOptions;
  return (
    <div className="w-full">
      <div className="flex items-center justify-center mt-6 withdraw">
        <p className="w-full pb-4 font-normal text-demiTopic text-start text-white capitalize md:border-0 border-b-2 border-secondary-blue">
          Request a withdrawal
        </p>
      </div>
      <div className="w-full my-10 bg-transparent text-white withdraw">
        <Select
          label="Choose Payment Method"
          value={value}
          variant="standard"
          onChange={(val) => setValue(val)}
          className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
        >
          <Option
            value="Bank"
            className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
          >
            Bank Transfer
          </Option>
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
      <WithdrawalCollapse network={value} />
    </div>
  );
};
export default WithdrawalForm;

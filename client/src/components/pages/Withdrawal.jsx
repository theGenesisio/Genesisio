import React, { useContext } from "react";
import Card from "../../components/subcomponents/WithdrawalCard";
import WithdrawalForm from "../../components/subcomponents/WithdrawalForm";
import Lorem from "../../assets/constants";
import { gsapAnimationBase } from "../../assets/utils";
import { AuthContext } from "../../AuthProvider";
const Withdrawal = () => {
  gsapAnimationBase(".withdraw");
  const { user } = useContext(AuthContext);
  return (
    <section
      className="flex flex-col min-h-screen py-8
     mx-auto"
    >
      <h1 className="text-white text-start text-topic font-normal mb-5 withdraw">
        Withdrawal
      </h1>
      <div className="flex flex-col lg:flex-row w-full justify-between lg:gap-5 gap-2">
        <div className="container flex flex-col gap-2">
          {Lorem.financeOptions.map((coin) => (
            <Card
              name={coin.name}
              symbol={coin.symbol}
              bal={user.wallet.cryptoBalances[coin.symbol]}
              key={coin.name}
            />
          ))}
        </div>
        <WithdrawalForm />
      </div>
    </section>
  );
};

export default Withdrawal;

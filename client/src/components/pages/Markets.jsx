import React from "react";
import SymbolOverview from "../subcomponents/TradeviewWidget/SymbolOverview";
import Screener from "../subcomponents/TradeviewWidget/Screener";
import { gsapAnimationBase } from "../../assets/utils";

const Markets = () => {
  gsapAnimationBase(".market");
  return (
    <section
      className="flex flex-col min-h-screen py-8
     mx-auto"
    >
      <h1 className="text-white text-start text-topic font-normal mb-5 market">
        Markets
      </h1>
      <div className="w-full h-screen lg:my-10 my-5 gap-5 market">
        <Screener />
      </div>
      <div className="w-full h-screen lg:my-10 my-5 gap-5 market">
        <SymbolOverview />
      </div>
    </section>
  );
};
export default Markets;
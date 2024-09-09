import React from "react";
import SymbolOverview from "../subcomponents/TradeviewWidget/Screener";
import { gsapAnimationScrollTrigger } from "../../assets/utils";

const MarketOverview = () => {
  gsapAnimationScrollTrigger({ identifier: ".market" });
  return (
    <div className="my-10 min-h-[30rem]">
      <h1 className="text-accent-green text-center text-topic font-normal mb-10 capitalize market">
        Market Overview
      </h1>
      <div className="h-[30rem] market">
        <SymbolOverview />
      </div>
    </div>
  );
};

export default MarketOverview;

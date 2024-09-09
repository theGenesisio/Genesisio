import React from "react";
import Herosection from "../subcomponents/Herosection";
import MarketOverview from "../subcomponents/MarketOverview";
import Why from "../subcomponents/Why";
import About from "./About";
import Services from "./Services";
import Testimonies from "../subcomponents/Testimonies";
import FAQs from "../subcomponents/FAQs";
import NumberRow from "../subcomponents/NumberRow";
const Landing = () => {
  return (
    <>
      <Herosection />
      <About />
      <Why />
      <Services />
      <Testimonies />
      <FAQs />
      <MarketOverview />
      <NumberRow />
    </>
  );
};

export default Landing;

import React, { useContext } from "react";
import Herosection from "../subcomponents/Herosection";
import MarketOverview from "../subcomponents/MarketOverview";
import Why from "../subcomponents/Why";
import About from "./About";
import Services from "./Services";
import Testimonies from "../subcomponents/Testimonies";
import FAQs from "../subcomponents/FAQs";
import NumberRow from "../subcomponents/NumberRow";
import { AuthContext } from "../../AuthProvider";
import { Navigate } from "react-router-dom";
const Landing = () => {
  const { user } = useContext(AuthContext);
  if (user !== null) {
    return <Navigate to="/genesisio/dashboard" />;
  } else {
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
  }
};

export default Landing;

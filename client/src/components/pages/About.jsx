import React from "react";
import { Typography } from "@material-tailwind/react";
import { gsapAnimationScrollTrigger } from "../../assets/utils";

const About = () => {
  gsapAnimationScrollTrigger({ identifier: ".about" });
  return (
    <div className="my-10 min-h-[20rem] lg:h-3/5 text-center" id="About-Us">
      <h1 className="text-accent-green text-topic font-normal mb-10 capitalize about">
        About Us
      </h1>
      <Typography variant="paragraph" className="text-white about">
        At Genesisio, we're dedicated to revolutionizing the way you trade
        Assets,within the bounds of legality and regulatory compliance.
      </Typography>
      <Typography variant="paragraph" className="text-white about"></Typography>
      Our platform is designed to empower individuals like you to harness the
      potential of digital assets, particularly Bitcoin and other major
      cryptocurrencies along side exploring the stocks market,focus committed to
      making the world of crypto accessible to everyone.
      <Typography variant="paragraph" className="text-white about">
        We prioritize the privacy and security of our users, we do not require
        unnecessary personal information, providing you with the freedom and
        peace of mind to transact securely without sacrificing your privacy.
      </Typography>
    </div>
  );
};

export default About;

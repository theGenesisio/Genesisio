import React from "react";
import TestimonyCarousel from "./TestimonyCarousel";
import { gsapAnimationScrollTrigger } from "../../assets/utils";

const Testimonies = () => {
  gsapAnimationScrollTrigger({ identifier: ".testimony" });
  return (
    <div className="my-10 min-h-[20rem]">
      <h1 className="text-accent-green text-center text-topic font-normal mb-5 capitalize testimony">
        What our clients say!
      </h1>
      <TestimonyCarousel />
    </div>
  );
};

export default Testimonies;

import React from "react";
import WhyCard from "./WhyCard";
import { whyIcons } from "../../assets/utilities";
import Lorem from "../../assets/constants";
import { gsapAnimationScrollTrigger } from "../../assets/utils";
const Why = () => {
  gsapAnimationScrollTrigger({ identifier: ".reason" });
  const { why } = Lorem;
  return (
    <div className="my-10 min-h-[20rem] lg:h-1/5">
      <h1 className="text-accent-green text-center text-topic font-normal mb-5 capitalize reason">
        Why Us
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2  grid-cols-1 gap-5">
        {why.map((reason, i) => (
          <WhyCard
            key={reason.heading}
            icon={whyIcons[i]}
            heading={reason.heading}
            text={reason.text}
          />
        ))}
      </div>
    </div>
  );
};
export default Why;

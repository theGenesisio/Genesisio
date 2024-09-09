import React from "react";
import ServiceCard from "../subcomponents/ServiceCard";
import { serviceIcons } from "../../assets/utilities";
import Lorem from "../../assets/constants";
import { gsapAnimationScrollTrigger } from "../../assets/utils";

const Services = () => {
  gsapAnimationScrollTrigger({ identifier: ".service" });
  const { services } = Lorem;
  return (
    <div className="my-10 min-h-[20rem] lg:h-1/5" id="Our-Services">
      <h1 className="text-accent-green text-center text-topic font-normal mb-5 capitalize service">
        Our Services
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-10 gap-5">
        {services.map((service, i) => (
          <ServiceCard
            key={service.heading}
            icon={serviceIcons[i]}
            heading={service.heading}
            text={service.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;

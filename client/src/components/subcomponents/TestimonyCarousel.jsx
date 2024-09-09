import { Carousel } from "@material-tailwind/react";
import TestimonyCard from "./TestimonyCard";
import Lorem from "../../assets/constants";
export default function CarouselTransition() {
  const { testimonies } = Lorem;
  return (
    <Carousel transition={{ duration: 2 }} className="rounded-xl testimony">
      {testimonies.map((testimony) => (
        <TestimonyCard
          key={testimony.clientName}
          img={testimony.img}
          clientName={testimony.clientName}
          location={testimony.location}
          text={testimony.text}
        />
      ))}
    </Carousel>
  );
}

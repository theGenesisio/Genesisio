import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { gsapAnimationScrollTrigger } from "../../assets/utils";
const NumberCounter = () => {
  const [num, setnum] = useState(44273632);
  let random = Math.floor(Math.random() * 5);
  useEffect(() => {
    setInterval(() => {
      setnum((cur) => (cur += random));
    }, 3000);
  }, []);

  gsapAnimationScrollTrigger({ identifier: ".numberRow" });
  return (
    <div className="flex flex-col justify-center items-center text-white sm:w-full">
      <p className="text-7xl font-black numberRow">{num.toLocaleString()}</p>
      <p className="text-demiTopic numberRow">Transactions processed!</p>
      <Link to="/auth/sign-in" className="sm:w-1/2 lg:w-1/3 numberRow">
        <Button fullWidth size="lg" className="bg-accent-green text-white mt-5">
          Invest now
        </Button>
      </Link>
    </div>
  );
};
export default NumberCounter;
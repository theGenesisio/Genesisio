import React, { useEffect, useState } from "react";
import UpgradeCard from "../subcomponents/UpgradeCard";
const Upgrade = () => {
  const [tiers, setTiers] = useState(null);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API}/tiers`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          setError({ message: "An error occurred", statusCode: 500 });
          setRetry((prevRetry) => prevRetry + 1);
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setTiers(result.data.tiers);
        setError(null);
      } catch (error) {
        setError({ message: "An error occurred", statusCode: 400 });
        setRetry((prevRetry) => prevRetry + 1);
      }
    };
    fetchData();
  }, [retry]);
  return (
    <section
      className="flex flex-col min-h-screen py-8
     mx-auto"
    >
      <h1 className="text-white text-start text-topic font-semibold mb-5 dash">
        Upgrade Options
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {tiers &&
          tiers.map(({ number, details }) => (
            <UpgradeCard
              number={number}
              details={details}
            />
          ))}
      </div>
    </section>
  );
};
export default Upgrade;

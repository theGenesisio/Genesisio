import React, { useEffect, useState } from "react";
import TierCard from "./subCmponents/TierCard";
import { Option, Select } from "@material-tailwind/react";
import FormError from "../subcomponents/FormError";
import UpgradeRequests from "./subCmponents/UpgradeRequests";
const adminUpgrade = () => {
  const [tiers, setTiers] = useState(null);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(null);
  const [newTier, setNewTier] = useState(null);
  const [details, setDetails] = useState("");
  const [instruction, setInstruction] = useState("");
  const handleDetail = (e) => {
    const value = e.target.value;
    setDetails(value);
  };
  const handleInstruction = (e) => {
    const value = e.target.value;
    setInstruction(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_ADMIN}/tiers`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          setError({ message: "Network response was not ok", statusCode: 500 });
          setRetry((prevRetry) => prevRetry + 1);
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
  const set = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_ADMIN}/tiers`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newTier,
            details,
            instruction,
          }),
        }
      );
      if (!response.ok) {
        setError({ message: "Network response was not ok", statusCode: 500 });
      }
      const result = await response.json();
      setError(result);
      setDetails("");
      setInstruction("");
      setNewTier(null);
    } catch (error) {
      setError({ message: "An error occurred", statusCode: 400 });
    }
  };
  return (
    <section
      className="flex flex-col min-h-screen py-8
     mx-auto"
    >
      <h1 className="text-white text-start text-topic font-semibold mb-5 dash">
        Upgrade Options
      </h1>
      <div className="flex flex-col gap-5">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <div className="relative flex items-center w-full">
              <textarea
                className="w-full p-2"
                name="details"
                onChange={handleDetail}
                placeholder="Enter tier benefits"
                value={details}
              ></textarea>
            </div>
            {details === "" && <FormError err={"Must add features for tier"} />}
          </div>
          <div>
            <div className="relative flex items-center">
              <textarea
                className="w-full p-2"
                name="instruction"
                placeholder="Enter default content for mail"
                onChange={handleInstruction}
                value={instruction}
              ></textarea>
            </div>
            {instruction === "" && (
              <p className="text-accent-red">Add content for custom mail</p>
            )}
          </div>
          <Select
            label="Tier:"
            value={newTier}
            size="xs"
            variant="standard"
            onChange={(val) => setNewTier(val)}
            className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
          >
            <Option
              className="hover:bg-accent-green hover:text-white"
              value={1}
            >
              Tier one
            </Option>
            <Option
              className="hover:bg-accent-green hover:text-white"
              value={2}
            >
              Tier two
            </Option>
            <Option
              className="hover:bg-accent-green hover:text-white"
              value={3}
            >
              Tier three
            </Option>
          </Select>
          {instruction !== "" && (
            <button
              fullWidth
              disabled={newTier === null}
              onClick={set}
              className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 uppercase disabled:hidden`}
            >
              Update tier
            </button>
          )}
          {error?.message && (
            <FormError err={error.message} code={error.statusCode} />
          )}
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {tiers &&
            tiers.map(({ number, details, instructions }) => (
              <TierCard
                number={number}
                details={details}
                instructions={instructions}
              />
            ))}
        </div>
        <UpgradeRequests />
      </div>
    </section>
  );
};
export default adminUpgrade;

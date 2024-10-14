import React, { useEffect, useState } from "react";
// import Package from "./subCmponents/Package";
import Lorem from "../../assets/constants";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { isoToLocaleDateString } from "../../assets/utils";
import { CryptoIcons } from "../../assets/utilities";
const adminPackages = () => {
  const [packages, setpackages] = useState(null);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [modal, setModal] = useState(false);
  function handleModal(args) {
    try {
      setActiveModal(args);
    } catch (error) {
      console.log("Error setting active modal");
      console.log(error);
    } finally {
      setModal((prevNav) => !prevNav);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_ADMIN}/packages`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          setError({ message: "Network response was not ok", statusCode: 401 });
          setRetry((prevRetry) => prevRetry + 1);
        }
        const result = await response.json();
        setpackages(result.data.packages);
        setError(null);
      } catch (error) {
        setError({ message: "An error occurred", statusCode: 400 });
        setRetry((prevRetry) => prevRetry + 1);
      }
    };
    fetchData();
  }, [retry]);
  const { heading } = Lorem.investmentRecords;
  return (
    <Card className="h-full w-full bg-inherit border border-secondary-blue record">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-inherit"
      >
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center record">
          <div className="flex flex-col md:text-start text-center ">
            <Typography variant="h5" className="text-white">
              Packages
            </Typography>
            <Typography className="mt-1 font-normal text-white">
              These are details of all packages presently available in the
              database
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 text-white">
        <table className="w-full min-w-max table-auto text-left record">
          <thead>
            <tr>
              {heading.map((head) => (
                <th
                  key={head}
                  className="border-y border-secondary-blue bg-secondary-blue p-4"
                >
                  <Typography className="font-normal leading-none opacity-80 text-white capitalize">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          {packages && (
            <tbody>
              {packages &&
                packages
                  .reverse()
                  .map(
                    (
                      {
                        wallet,
                        amount,
                        duration,
                        frequency,
                        product,
                        percentageROI,
                        createdAt,
                        status,
                      },
                      index
                    ) => {
                      const isLast = index === packages.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-secondary-blue";

                      return (
                        <tr key={wallet}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              {CryptoIcons[wallet]}
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography className="font-bold text-white">
                              {product}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography className="font-bold text-white">
                              {amount.toFixed(7)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography className="font-normal text-white">
                              {duration}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography className="font-normal text-white">
                              {frequency}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography className="font-normal text-white">
                              {percentageROI.daily}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography className="font-normal text-white">
                              {percentageROI.weekly}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography className="font-normal text-white">
                              {percentageROI.monthly || `__`}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography className="font-normal text-white">
                              {isoToLocaleDateString(createdAt)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                className={
                                  status === "completed"
                                    ? "bg-accent-change-green text-white"
                                    : status === "running"
                                      ? "bg-yellow-600 text-white"
                                      : "bg-accent-red  text-white"
                                }
                                value={status}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
            </tbody>
          )}
        </table>
      </CardBody>
      {/* {modal && <Package modal={modal} args={activeModal} />} */}
    </Card>
  );
};
export default adminPackages;

import React, { useEffect, useState } from "react";
import Lorem from "../../../assets/constants.js";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { isoToLocaleDateString } from "../../../assets/utils";
import UpgradeRequest from "./UpgradeRequest.jsx";
const UpgradeRequests = () => {
  // todo add gsap identifier
  //  gsapAnimationScrollTrigger({ identifier: ".dash" });
  const [requests, setRequests] = useState();
  const [activeModal, setActiveModal] = useState(null);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);
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
          `${import.meta.env.VITE_APP_API_ADMIN}/tiers/requests`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          setError({ message: "Network response was not ok", statusCode: 400 });
        }
        const result = await response.json();
        setRequests(result.data.requests.reverse());
        setError(null);
      } catch (error) {
        setError({ message: "An error occurred", statusCode: 400 });
        setRetry((prevRetry) => prevRetry + 1);
      }
    };
    fetchData();
  }, [retry]);
  const { upgradeRequests } = Lorem;
  return (
    <Card className="h-full w-full bg-inherit border border-secondary-blue">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-inherit"
      >
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center record">
          <div className="flex flex-col md:text-start text-center ">
            <Typography variant="h5" className="text-white">
              Tier upgrade requests
            </Typography>
            <Typography className="mt-1 font-normal text-white">
              These are details of all requests records presently available in
              the database
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 text-white">
        <table className="w-full min-w-max table-auto text-left record">
          <thead>
            <tr>
              {upgradeRequests.map((head) => (
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
          {requests && (
            <tbody>
              {requests
                .map(({ _id, number, email, updatedAt, status }, index) => {
                  const isLast = index === requests.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-secondary-blue";

                  return (
                    <tr
                      key={_id}
                      className="hover:bg-accent-green focus:bg-accent-green"
                      onClick={() =>
                        handleModal({ _id, number, email, updatedAt, status })
                      }
                    >
                      <td className={classes}>
                        <div className="flex items-center gap-3">{number}</div>
                      </td>
                      <td className={classes}>
                        <Typography className="font-bold text-white">
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="outlined"
                            className={
                              status === "completed"
                                ? "bg-accent-change-green text-white"
                                : status === "pending"
                                  ? "bg-yellow-600 text-white"
                                  : status === "mailed"
                                    ? "bg-purple-500 text-white"
                                    : "bg-accent-red  text-white"
                            }
                            value={status}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography className="font-normal text-white">
                          {isoToLocaleDateString(updatedAt)}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          )}
        </table>
      </CardBody>
      {modal && <UpgradeRequest modal={modal} args={activeModal} />}
    </Card>
  );
};

export default UpgradeRequests;

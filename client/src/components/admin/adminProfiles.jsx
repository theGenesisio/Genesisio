import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import Lorem from "../../assets/constants";
import { isoToLocaleDateString } from "../../assets/utils";
import AdminProfile from "./adminProfile";
const adminProfiles = () => {
  const [profiles, setProfiles] = useState();
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
          `${import.meta.env.VITE_APP_API_ADMIN}/profiles`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setProfiles(result.data.profiles.reverse());
        setError(null);
      } catch (error) {
        setError({ message: "An error occurred", statusCode: 400 });
        setRetry((prevRetry) => prevRetry + 1);
      }
    };
    fetchData();
  }, [retry]);
  const { heading } = Lorem.profileRecords;
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
              User profiles
            </Typography>
            <Typography className="mt-1 font-normal text-white">
              These are details of all profile records presently available in
              the database
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
          {profiles && (
            <tbody>
              {profiles.map(
                (
                  {
                    fullname,
                    email,
                    tier,
                    lastSeen,
                    createdAt,
                    active,
                    _id,
                    wallet,
                  },
                  index
                ) => {
                  const isLast = index === profiles.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-secondary-blue";

                  return (
                    <tr
                      key={_id}
                      className="hover:bg-accent-green focus:bg-accent-green"
                      onClick={() =>
                        handleModal({
                          fullname,
                          email,
                          tier,
                          lastSeen,
                          createdAt,
                          _id,
                          wallet
                        })
                      }
                    >
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {fullname}
                        </div>
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
                              tier === 3
                                ? "bg-purple-400 text-white"
                                : tier === 2
                                  ? "bg-teal-500 text-white"
                                  : "bg-blue-700  text-white"
                            }
                            value={tier}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography className="font-bold text-white">
                          {lastSeen}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography className="font-bold text-white">
                          {isoToLocaleDateString(createdAt)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography className="font-bold text-white">
                          <Chip
                            size="sm"
                            variant="outlined"
                            className={
                              active
                                ? "bg-accent-change-green text-white text-center"
                                : "bg-accent-red text-white text-center"
                            }
                            value={active ? "True" : "False"}
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          )}
        </table>
      </CardBody>
      {modal && <AdminProfile modal={modal} args={activeModal} />}
    </Card>
  );
};

export default adminProfiles;

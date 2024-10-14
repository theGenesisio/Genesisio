import React, { useEffect, useState } from "react";
import AdminDeposit from "./adminDeposit";
import Lorem from "../../assets/constants";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { CryptoIcons } from "../../assets/utilities";
import { isoToLocaleDateString } from "../../assets/utils";
import AdminNewDeposit from "./subCmponents/widgets/subWidgets/AdminNewDeposit";
const adminDeposits = () => {
  // todo add gsap identifier
  //  gsapAnimationScrollTrigger({ identifier: ".dash" });
  const [deposits, setDeposits] = useState();
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
          `${import.meta.env.VITE_APP_API_ADMIN}/deposits`,
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
        }
        const result = await response.json();
        setDeposits(result.data.deposits.reverse());
        setError(null);
      } catch (error) {
        setError({ message: "An error occurred", statusCode: 400 });
        setRetry((prevRetry) => prevRetry + 1);
      }
    };
    fetchData();
  }, [retry]);
  const { heading } = Lorem.depositRecords;
  return (
    <Card className="h-full w-full bg-inherit border border-secondary-blue record">
      <AdminNewDeposit />
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-inherit"
      >
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center record">
          <div className="flex flex-col md:text-start text-center ">
            <Typography variant="h5" className="text-white">
              Recent Deposits
            </Typography>
            <Typography className="mt-1 font-normal text-white">
              These are details of all deposit records presently available in
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
                  <Typography className="font-normal leading-none opacity-80 text-white">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          {deposits && (
            <tbody>
              {deposits
                .map(
                  (
                    {
                      _id,
                      walletId,
                      currency,
                      amount,
                      createdAt,
                      status,
                      userId,
                      imageFilename,
                    },
                    index
                  ) => {
                    const isLast = index === deposits.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-secondary-blue";

                    return (
                      <tr
                        key={walletId}
                        className="hover:bg-accent-green focus:bg-accent-green"
                        onClick={() =>
                          handleModal({
                            _id,
                            walletId,
                            currency,
                            amount,
                            createdAt,
                            status,
                            userId,
                            imageFilename,
                          })
                        }
                      >
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            {CryptoIcons[currency]}
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography className="font-bold text-white">
                            {walletId}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography className="font-bold text-white">
                            {parseFloat(amount).toFixed(7)}
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
                                    : "bg-accent-red  text-white"
                              }
                              value={status}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography className="font-normal text-white">
                            {isoToLocaleDateString(createdAt)}
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
      {modal && <AdminDeposit modal={modal} args={activeModal} />}
    </Card>
  );
};

export default adminDeposits;

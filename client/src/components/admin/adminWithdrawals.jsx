import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import Lorem from "../../assets/constants";
import { CryptoIcons } from "../../assets/utilities";
import { isoToLocaleDateString } from "../../assets/utils";
import AdminWithdrawal from "../admin/adminWithdrawal"
const adminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState();
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
          `${import.meta.env.VITE_APP_API_ADMIN}/withdrawals`,
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
        setWithdrawals(result.data.withdrawals.reverse());
        setError(null);
      } catch (error) {
        setError({ message: "An error occurred", statusCode: 400 });
        setRetry((prevRetry) => prevRetry + 1);
      }
    };
    fetchData();
  }, [retry]);
  const { heading } = Lorem.withdrawalRecords;
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
              Recent withdrawal
            </Typography>
            <Typography className="mt-1 font-normal text-white">
              These are details of all withdrawal records presently available in
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
          {withdrawals && (
            <tbody>
              {withdrawals
                .map(
                  (
                    {
                      _id,
                      withdrawalMethod,
                      withdrawalAddress,
                      amount,
                      userId,
                      currency,
                      createdAt,
                      walletId,
                      status,
                    },
                    index
                  ) => {
                    const isLast = index === withdrawals.length - 1;
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
                            {withdrawalMethod}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography className="font-bold text-white">
                            {parseFloat(amount).toLocaleString()}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography className="font-bold text-white">
                            {withdrawalAddress}
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
      {modal && <AdminWithdrawal modal={modal} args={activeModal} />}
    </Card>
  );
};

export default adminWithdrawals;

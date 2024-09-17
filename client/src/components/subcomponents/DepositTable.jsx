import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
} from "@material-tailwind/react";
import { CryptoIcons } from "../../assets/utilities";
import Lorem from "../../assets/constants";
import React, { useContext, useState, useEffect, useMemo } from "react";
import { AuthContext } from "../../AuthProvider";
import { isoToLocaleDateString } from "../../assets/utils";
import FormError from "../subcomponents/FormError";
export default function DepositTable() {
  const { user } = useContext(AuthContext);
  const [deposits, setDeposits] = useState();
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/deposits/${user._id}`,
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
      return result.data.deposits;
    } catch (error) {
      setError({ message: "An error occurred", statusCode: 400 });
      setRetry((prevRetry) => prevRetry + 1);
      return [];
    }
  };

  const memoizedDeposits = useMemo(() => {
    fetchData().then((data) => setDeposits(data.reverse()));
  }, [user._id, retry]);

  useEffect(() => {
    memoizedDeposits;
  }, [memoizedDeposits]);

  const { heading } = Lorem.depositRecords;
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
              Recent Deposit
            </Typography>
            <Typography className="mt-1 font-normal text-white">
              These are details of all deposit records presently available in
              the database
            </Typography>
          </div>
          {error?.statusCode && (
            <FormError err={error.message} code={error.statusCode} />
          )}
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
                    { walletId, currency, amount, createdAt, status },
                    index
                  ) => {
                    const isLast = index === deposits.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-secondary-blue";

                    return (
                      <tr key={walletId} className="record">
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
                            {parseFloat(amount).toLocaleString()}
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
    </Card>
  );
}

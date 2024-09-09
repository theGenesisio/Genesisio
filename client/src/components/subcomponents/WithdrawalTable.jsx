import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
} from "@material-tailwind/react";
import { CryptoIcons } from "../../assets/utilities";
import Lorem from "../../assets/constants";
import { AuthContext } from "../../AuthProvider";
import { useContext, useEffect, useState, useMemo } from "react";
import { isoToLocaleDateString } from "../../assets/utils";
import FormError from "../subcomponents/FormError";
export default function WithdrawalTable() {
  const { user } = useContext(AuthContext);
  const [withdrawals, setWithdrawals] = useState();
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/withdrawals/${user._id}`,
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
      return result.data.withdrawals;
    } catch (error) {
      setError({ message: "An error occurred", statusCode: 400 });
      setRetry((prevRetry) => prevRetry + 1);
      return [];
    }
  };
  const memoizedDeposits = useMemo(() => {
    fetchData().then((data) => setWithdrawals(data.reverse()));
  }, [user._id, retry]);

  useEffect(() => {
    memoizedDeposits;
  }, [memoizedDeposits]);

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
                  <Typography className="font-normal leading-none opacity-80 text-white capitalize">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          {withdrawals && (
            <tbody>
              {withdrawals?.map(
                (
                  {
                    withdrawalMethod,
                    withdrawalAddress,
                    amount,
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
    </Card>
  );
}

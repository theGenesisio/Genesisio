import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
} from "@material-tailwind/react";
import { CryptoIcons } from "../../assets/utilities";
import Lorem from "../../assets/constants";
import { isoToLocaleDateString } from "../../assets/utils";
import { AuthContext } from "../../AuthProvider";
import { useContext, useEffect, useMemo, useState } from "react";
export default function InvestmentTable() {
  const { user } = useContext(AuthContext);
  const [investments, setInvestments] = useState(null);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/packages/${user._id}`,
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
      return result.data.investments;
    } catch (error) {
      setError({ message: "An error occurred", statusCode: 400 });
      setRetry((prevRetry) => prevRetry + 1);
      return [];
    }
  };

  const memoizedDeposits = useMemo(() => {
    fetchData().then((data) => setInvestments(data.reverse()));
  }, [user._id, retry]);

  useEffect(() => {
    memoizedDeposits;
  }, [memoizedDeposits]);

  const { heading } = Lorem.investmentRecords;
  return (
    <Card className="h-full w-full bg-inherit border border-secondary-blue">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-inherit"
      >
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="flex flex-col md:text-start text-center">
            <Typography variant="h5" className="text-white">
              Investment Records
            </Typography>
            <Typography className="mt-1 font-normal text-white">
              These are details of all your investment presently available in
              the database
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 text-white">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {heading.map((head) => (
                <th
                  key={head}
                  className="border-y border-secondary-blue bg-secondary-blue p-4"
                >
                  <Typography className="font-normal leading-none opacity-70 text-white">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {investments &&
              investments
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
                    const isLast = index === investments.length - 1;
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
                            {amount}
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
        </table>
      </CardBody>
    </Card>
  );
}

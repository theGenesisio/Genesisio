import React from "react";
import { Link } from "react-router-dom";
import { Chip, Typography, Badge, Card } from "@material-tailwind/react";
import { CryptoIcons } from "../../../../../assets/utilities";
const WithdrawalRequestCard = (props) => {
  const { amount, status, ID, date, currency } = props;
  return (
    <Badge
      content={CryptoIcons[currency]}
      placement="bottom-end"
      className={
        status === "completed"
          ? "bg-accent-change-green scale-[0.25]"
          : status === "pending"
            ? "bg-yellow-600 scale-[0.25]"
            : "bg-accent-red scale-[0.25]"
      }
    >
      <Card className="w-full mb-4 bg-inherit ">
        <Link
          to="/admin/withdrawals"
          className="flex flex-col py-2 hover:bg-accent-green hover:p-3 hover:text-white rounded-md transition-all duration-100"
        >
          <div className="flex flex-row justify-between text-gray-400">
            <Typography variant="h4" className="text-white">
              {amount?.toFixed(5)}
            </Typography>
            <Typography variant="small" className="font-normal">
              {date}
            </Typography>
          </div>
          <div className="flex flex-row justify-between text-gray-400">
            <Typography variant="small" className="font-normal">
              {ID}
            </Typography>
            <Chip
              size="sm"
              variant="ghost"
              className={
                status === "completed"
                  ? "bg-accent-change-green text-white"
                  : status === "pending"
                    ? "bg-yellow-600"
                    : "bg-accent-red  text-white"
              }
              value={status}
            />
          </div>
        </Link>
      </Card>
    </Badge>
  );
};
export default WithdrawalRequestCard;

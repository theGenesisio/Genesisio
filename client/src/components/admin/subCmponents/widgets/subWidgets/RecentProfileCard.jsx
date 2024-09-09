import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { isoToLocaleDateString } from "../../../../../assets/utils";
const RecentProfileCard = (props) => {
  const { fullname, email, date } = props;
  return (
    <Link
      to="/admin/profiles"
      className="block py-2 hover:bg-accent-green hover:p-3 hover:text-white rounded-md transition-all duration-100"
    >
      <Typography variant="h6">{fullname}</Typography>
      <div className="flex flex-row justify-between text-gray-400 hover:text-white transition-all duration-100">
        <Typography variant="small" className="font-normal">
          {email}
        </Typography>
        <Typography variant="small" className="font-normal">
          {isoToLocaleDateString(date)}
        </Typography>
      </div>
    </Link>
  );
};
export default RecentProfileCard;
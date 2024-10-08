import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { isoToLocaleDateString } from "../../../../../assets/utils";
const ActiveUserCard = (props) => {
  const { fullname, email, date } = props;
  return (
    <Link
      to="/admin/profiles"
      className="block py-2 hover:bg-accent-green hover:p-3 hover:text-white rounded-md transition-all duration-100"
    >
      <Typography variant="h6" className="text-white">{fullname}</Typography>
      <div className="flex flex-row justify-between text-gray-400 hover:text-white transition-all duration-100">
        <Typography variant="small" className="font-normal">
          {email}
        </Typography>
        <Typography variant="small" className="font-normal">
          {date}
        </Typography>
      </div>
    </Link>
  );
};
export default ActiveUserCard;

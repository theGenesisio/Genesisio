import React, { useContext, useState } from "react";
import { Typography, IconButton } from "@material-tailwind/react";
import { eyeSlashIcon } from "../../assets/utilities";
import { AuthContext } from "../../AuthProvider";

const MaskText = () => {
  const { user } = useContext(AuthContext);
  const [masked, setMasked] = useState(false);

  const handleIconClick = () => {
    setMasked(!masked);
  };

  return (
    <div className="flex items-center">
      <Typography variant="h1" className="text-white font-bold">
        {masked
          ? "********"
          : user?.wallet?.balances?.accountBalance?.toLocaleString() || "N/A"}
      </Typography>
      <IconButton
        onClick={handleIconClick}
        className="ml-2 scale-75"
        aria-label="Toggle Mask"
      >
        {eyeSlashIcon}
      </IconButton>
    </div>
  );
};

export default MaskText;

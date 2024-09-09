import React from "react";
import { Alert, Collapse } from "@material-tailwind/react";
import Lorem from "../../assets/constants";
import { infoIcon } from "../../assets/utilities";
export default function AlertDismissible() {
  const [open, setOpen] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const toggleOpen = () => setShow((cur) => !cur);
  return (
    <Alert
      open={open}
      onClose={() => setOpen(false)}
      onClick={toggleOpen}
      className="my-5 bg-accent-red"
    >
      {!show && (
        <p className="text-white font-semibold text-md items-baseline">
          {infoIcon}
          {`Notice ${Lorem.dashboardAlert.substring(0,40)}...read more`}
        </p>
      )}
      <Collapse open={show}>{Lorem.dashboardAlert}</Collapse>
    </Alert>
  );
}

import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  Typography,
  Card,
  CardBody,
  CardFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import { isoToLocaleDateString } from "../../../assets/utils";
import FormError from "../../subcomponents/FormError";
export default function UpgradeRequest(props) {
  const { modal, args } = props;
  const { _id, number, email, updatedAt, status } = args;
  const [open, setOpen] = useState(modal);
  const handleOpen = () => setOpen((cur) => !cur);
  const [newStatus, setNewStatus] = useState(null);
  const [response, setResponse] = useState(null);
  const handleStatus = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_ADMIN}/tiers/requests`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            newStatus,
          }),
        }
      );
      if (!response.ok) {
        setResponse({ message: "An error occurred", statusCode: 500 });
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setResponse(result);
    } catch (error) {
      setResponse({ message: "An error occurred", statusCode: 400 });
    }
  };
  useEffect(() => {
    if (response?.statusCode === 200) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [response]);
  const mail = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_ADMIN}/tiers/requests/mail/${email}-${_id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            number,
          }),
        }
      );
      if (!response.ok) {
        setResponse({ message: "An error occurred", statusCode: 500 });
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setResponse(result);
    } catch (error) {
      console.log(error);
      setResponse({ message: "An error occurred", statusCode: 400 });
    }
  };
  return (
    <>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent"
      >
        <DialogBody>
          <Card className="w-full shadow-lg bg-primary-blue">
            <CardBody>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h5"
                  className="font-normal  flex flex-row gap-2 text-white"
                >
                  Email
                </Typography>
                <Typography
                  variant="h5"
                  className="flex items-center gap-1.5 font-normal text-accent-green"
                >
                  {email}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-gray-400"
                >
                  Status
                </Typography>
                <Typography
                  variant="h6"
                  className="font-normal  text-white flex flex-row gap-2"
                >
                  {status}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-gray-400"
                >
                  Requested tier
                </Typography>
                <Typography
                  variant="h6"
                  className="font-normal  text-white flex flex-row gap-2"
                >
                  {number}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-normal  text-gray-400 flex flex-row gap-2"
                >
                  Date
                </Typography>
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-white"
                >
                  {isoToLocaleDateString(updatedAt)}
                </Typography>
              </div>
              <Select
                label="Update status to"
                value={newStatus}
                size="xs"
                variant="standard"
                onChange={(val) => setNewStatus(val)}
                className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
              >
                <Option
                  className="hover:bg-accent-green hover:text-white"
                  value="pending"
                >
                  Pending
                </Option>
                <Option
                  className="hover:bg-accent-green hover:text-white"
                  value="mailed"
                >
                  Mailed
                </Option>
                <Option
                  className="hover:bg-accent-green hover:text-white"
                  value="completed"
                >
                  Completed
                </Option>
                <Option
                  className="hover:bg-accent-green hover:text-white"
                  value="failed"
                >
                  Failed
                </Option>
              </Select>
            </CardBody>
            <CardFooter className="flex flex-col gap-2">
              <button
                type="submit"
                onClick={handleStatus}
                disabled={!newStatus}
                fullWidth
                className={`w-full px-6 py-3 text-md font-bold tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 disabled:hidden uppercase`}
              >
                {` confirm status as  ${newStatus}`}
              </button>
              <button
                onClick={mail}
                disabled={status === "mailed"}
                className={`w-full px-6 py-3 text-md font-bold tracking-wide text-white transition-all duration-300 transform bg-transparent rounded-lg disabled:hidden uppercase border border-secondary-blue`}
              >
                send mail
              </button>
              {response?.message && (
                <FormError err={response.message} code={response.statusCode} />
              )}
            </CardFooter>
          </Card>
        </DialogBody>
      </Dialog>
    </>
  );
}

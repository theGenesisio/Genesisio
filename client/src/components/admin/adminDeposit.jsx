import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import { isoToLocaleDateString } from "../../assets/utils";
import { CryptoIcons } from "../../assets/utilities";
import FormError from "../subcomponents/FormError";
export default function AdminDeposit(props) {
  const { modal, args } = props;
  const {
    _id,
    walletId,
    currency,
    amount,
    createdAt,
    status,
    userId,
    imageFilename,
  } = args;
  const [open, setOpen] = useState(modal);
  const handleOpen = () => setOpen((cur) => !cur);
  const [newStatus, setNewStatus] = useState(null);
  const [response, setResponse] = useState(null);
  const [imgURL, setImgURL] = useState("");
  const handleStatus = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_ADMIN}/deposits/${_id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newStatus,
          }),
        }
      );
      if (!response.ok) {
        setResponse({ message: "An error occurred", statusCode: 500 });
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
  useEffect(() => {
    const fetchImg = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_ADMIN}/deposits/img/${imageFilename}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          setResponse(response.message);
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImgURL(imageUrl);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchImg();
  }, [imageFilename]);
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
            {imgURL && (
              <CardHeader floated={false} color="blue-gray">
                <img src={imgURL} alt="deposit payment proof" />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                <IconButton
                  size="xl"
                  color="red"
                  variant="text"
                  className="!absolute bottom-1 right-1 scale-50"
                >
                  {CryptoIcons[currency]}
                </IconButton>
              </CardHeader>
            )}
            <CardBody>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h5"
                  className="font-medium  flex flex-row gap-2 text-white"
                >
                  Amount
                </Typography>
                <Typography
                  variant="h1"
                  className="flex items-center gap-1.5 font-normal text-accent-green"
                >
                  {parseFloat(amount).toLocaleString()}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-gray-400"
                >
                  User ID
                </Typography>
                <Typography
                  variant="h6"
                  className="font-medium  text-white flex flex-row gap-2"
                >
                  {userId}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-medium  text-gray-400 flex flex-row gap-2"
                >
                  Wallet ID
                </Typography>
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-white"
                >
                  {walletId}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-medium  text-gray-400 flex flex-row gap-2"
                >
                  Status
                </Typography>
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-white capitalize"
                >
                  {status}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-medium  text-gray-400 flex flex-row gap-2"
                >
                  Date
                </Typography>
                <Typography
                  variant="h6"
                  className="flex items-center gap-1.5 font-normal text-white"
                >
                  {isoToLocaleDateString(createdAt)}
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
            <CardFooter className="pt-3">
              <button
                type="submit"
                onClick={handleStatus}
                disabled={!newStatus}
                fullWidth
                className={`w-full px-6 py-3 text-md font-bold tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 disabled:hidden uppercase deposit ${parseFloat(amount) === 0 ? `hidden` : `block`}`}
              >
                {` confirm deposit as  ${newStatus}`}
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

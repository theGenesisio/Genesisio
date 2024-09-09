import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Badge,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { isoToLocaleDateString } from "../../../../../assets/utils";
import { CryptoIcons } from "../../../../../assets/utilities";
const NewDepositCard = (props) => {
  const { amount, status, currency, id, date, imageFilename } = props;
  const [imgURL, setImgURL] = useState("");

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
          throw new Error(`Error: ${response.status} ${response.message}`);
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
    <Badge
      content={CryptoIcons[currency]}
      placement="top-end"
      className={
        status === "completed"
          ? "bg-accent-change-green scale-50"
          : status === "pending"
            ? "bg-yellow-600 scale-50"
            : "bg-accent-red scale-50"
      }
    >
      <Card className="w-full flex-row mb-4 bg-inherit ">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          {imgURL ? (
            <img
              src={imgURL}
              alt="depositImg"
              className="h-full w-full object-cover"
            />
          ) : (
            <p>Loading...</p>
          )}
        </CardHeader>
        <CardBody className="text-white text-end w-full flex flex-col gap-2">
          <Typography
            className={
              status === "completed"
                ? "text-accent-change-green uppercase font-bold"
                : status === "pending"
                  ? "text-yellow-600 uppercase font-bold"
                  : "text-accent-red uppercase font-bold"
            }
          >
            {status}
          </Typography>
          <Typography variant="h1" className="m-1">
            {amount?.toLocaleString()}
          </Typography>
          <Typography className="font-normal">{id}</Typography>
          <Typography variant="small" className="">
            {isoToLocaleDateString(date)}
          </Typography>
          <Link
            to="/admin/deposits"
            className="flex justify-end items-center gap-2 text-accent-green"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </CardBody>
      </Card>
    </Badge>
  );
};
export default NewDepositCard;

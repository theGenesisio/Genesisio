import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { checkIcon } from "../../../../../assets/utilities";
const NewInvestmentCard = (props) => {
  const { name, amount, currency, status, date, freq } = props;
  return (
    <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="small"
          color="white"
          className="font-normal uppercase"
        >
          {status}
        </Typography>
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
          <span className="mt-2 text-4xl">{currency}</span>
          {amount}
          <span className="self-end text-4xl">{` ${freq} months`}</span>
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              {checkIcon}
            </span>
            <Typography className="font-normal">{name}</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              {checkIcon}
            </span>
            <Typography className="font-normal">{date}</Typography>
          </li>
        </ul>
      </CardBody>
      <CardFooter className="mt-12 p-0">
        <Button
          size="lg"
          color="white"
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          ripple={false}
          fullWidth={true}
        >
          <Link to={`/`}>View now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
export default NewInvestmentCard;

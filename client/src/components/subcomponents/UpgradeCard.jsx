import {
  Card,
  CardBody,
  Typography,
  CardFooter,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import FormError from "../subcomponents/FormError";
import { Navigate } from "react-router-dom";
export default function UpgradeCard(props) {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { _id, email, tier } = user;
  const { number, details } = props;
  function checkStatus() {
    if (tier > number) {
      return `Purchased`;
    } else if (tier < number) {
      return `Purchase rights to tier ${number}`;
    } else if (tier === number) {
      return `Active`;
    }
  }
  const purchase = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API}/tiers`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
          email,
          number,
        }),
      });
      if (!response.ok) {
        setError({ message: "Network response was not ok", statusCode: 500 });
      }
      const result = await response.json();
      setError(result);
    } catch (error) {
      setError({ message: "An error occurred", statusCode: 400 });
    }
  };
  useEffect(() => {
    if (error?.statusCode === 201) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [error]);
  return (
    <Card className="w-full bg-inherit text-center border border-secondary-blue">
      <CardBody className="min-h-52">
        <Typography
          variant="h4"
          className="mb-2 bg-primary-blue text-accent-green capitalize"
        >
          {number === 3
            ? `Tier three`
            : number === 2
              ? `Tier two`
              : `Tier one (DEFAULT)`}
        </Typography>
        <Typography className="text-white">{details}</Typography>
      </CardBody>
      <CardFooter className="flex flex-col gap 2">
        <button
          type="submit"
          onClick={purchase}
          disabled={tier >= number}
          fullWidth
          className={`w-full px-6 py-3 text-md font-bold tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg disabled:bg-transparent disabled:cursor-auto uppercase`}
        >
          {checkStatus()}
        </button>
        {error && <FormError err={error.message} code={error.statusCode} />}
      </CardFooter>
      {redirect && <Navigate to="/genesisio/dashboard" />}
    </Card>
  );
}

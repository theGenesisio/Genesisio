import {
  Card,
  CardBody,
  Typography,
  CardFooter,
} from "@material-tailwind/react";
export default function TierCard(props) {
  const { number, details, instructions } = props;
  return (
    <Card className="w-full bg-inherit text-center border border-secondary-blue">
      <CardBody>
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
      <CardFooter>
        <Typography className="text-white">{instructions}</Typography>
      </CardFooter>
    </Card>
  );
}

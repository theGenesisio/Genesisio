import { Card, CardBody, Typography } from "@material-tailwind/react";

export default function ServiceCard(props) {
  const { icon, heading, text } = props;
  return (
    <Card className="w-full bg-inherit vessel service">
      <div className="items-center flex justify-center text-accent-green">{icon}</div>
      <CardBody className="text-center lg:text-start">
        <Typography variant="h5" className="mb-2 text-accent-green capitalize">
          {heading}
        </Typography>
        <Typography className="text-white">{text}</Typography>
      </CardBody>
    </Card>
  );
}

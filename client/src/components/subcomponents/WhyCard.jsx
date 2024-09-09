import { Card, CardBody, Typography } from "@material-tailwind/react";

export default function WhyCard(props) {
  const { icon, heading, text } = props;
  return (
    <Card className="w-full bg-inherit vessel reason">
      <CardBody className="text-center lg:text-start">
        <div className="items-center flex justify-center text-accent-green">
          {icon}
        </div>
        <Typography variant="h5" className="mb-2 text-accent-green capitalize">
          {heading}
        </Typography>
        <Typography className="text-white">{text}</Typography>
      </CardBody>
    </Card>
  );
}

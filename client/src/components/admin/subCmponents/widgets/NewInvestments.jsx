import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Carousel } from "@material-tailwind/react";
import NewInvestmentCard from "./subWidgets/NewInvestmentCard";

export default function NewInvestments(props) {
  const { name, data } = props;
  return (
    <Card className="w-full h-full bg-inherit dash">
      <CardBody className="text-white">
        <Typography className="font-medium text-demiTopic uppercase text-accent-green mb-2">
          {name}
        </Typography>
        <Carousel transition={{ duration: 2 }} className="rounded-xl">
          {data.map((obj) => (
            <NewInvestmentCard
              name={obj.package.product}
              amount={obj.amount}
              currency={obj.currency}
              status={obj.status}
              date={obj.updatedAt}
              freq={obj.frequency}
            />
          ))}
        </Carousel>
      </CardBody>
    </Card>
  );
}

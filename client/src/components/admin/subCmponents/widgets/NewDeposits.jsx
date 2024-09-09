import { Card, Typography } from "@material-tailwind/react";
import NewDepositCard from "./subWidgets/NewDepositCard";
export default function NewDeposits(props) {
  const { name, data } = props;
  return (
    <Card className="w-full bg-inherit dash">
      <Typography className="font-medium text-demiTopic uppercase text-accent-green mb-2">
        {name}
      </Typography>
      {data?.map((obj) => (
        <NewDepositCard
          amount={obj.amount}
          status={obj.status}
          currency={obj.currency}
          id={obj._id}
          date={obj.updatedAt}
          imageFilename={obj.imageFilename}
        />
      ))}
    </Card>
  );
}

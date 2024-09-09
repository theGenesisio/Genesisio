import { Card, Typography } from "@material-tailwind/react";
import { isoToLocaleDateString } from "../../../../assets/utils";
import WithdrawalRequestCard from "./subWidgets/WithdrawalRequestCard";
export default function withdrawalRequests(props) {
  const { name, data } = props;
  return (
    <Card className="w-full bg-inherit dash">
      <Typography className="font-medium text-demiTopic uppercase text-accent-green mb-2">
        {name}
      </Typography>
      {data?.map((obj) => (
        <WithdrawalRequestCard
          key={obj._id}
          amount={obj.amount}
          currency={obj.currency}
          ID={obj.userId}
          status={obj.status}
          date={isoToLocaleDateString(obj.updatedAt)}
        />
      ))}
    </Card>
  );
}

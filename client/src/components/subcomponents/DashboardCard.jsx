import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { AuthContext } from "../../AuthProvider";
import { useContext, useEffect } from "react";

export default function DashboardCard(props) {
  const { user } = useContext(AuthContext);
  const { accountBalance, tradingCapital, totalDeposit, totalWithdrawn } =
    user.wallet.balances;
  let widgetData = {
    name: props.widgetName,
  };
  switch (props.widgetName) {
    case "Account Balance":
      widgetData = {
        ...widgetData,
        amount: parseFloat(accountBalance),
      };
      break;
    case "trading capital":
      widgetData = {
        ...widgetData,
        amount: parseFloat(tradingCapital),
      };
      break;
    case "total deposit":
      widgetData = {
        ...widgetData,
        amount: parseFloat(totalDeposit),
      };
      break;
    case "total withdrawn":
      widgetData = {
        ...widgetData,
        amount: parseFloat(totalWithdrawn),
      };
      break;

    default:
      widgetData = {
        ...widgetData,
        amount: 0.00,
        change: 0.00, // calc something here
        affinity: true, // if result of change is +ve
      };
      break;
  }
  return (
    <Card className="w-full text-center bg-inherit border border-secondary-blue shadow-md shadow-secondary-blue dash">
      <CardBody className="text-white">
        <Typography className="mb-2 font-topic text-semiTopic uppercase">
          {widgetData.name}
        </Typography>
        <Typography>{`$ ${widgetData.amount.toLocaleString()}`}</Typography>
      </CardBody>
    </Card>
  );
}

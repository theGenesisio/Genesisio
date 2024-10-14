import React, { useContext } from "react";
import Alert from "../subcomponents/Alert";
import Card from "../subcomponents/DashboardCard";
import Lorem from "../../assets/constants";
import AdvChart from "../subcomponents/TradeviewWidget/AdvChart";
import Heatmap from "../subcomponents/TradeviewWidget/Heatmap";
import { gsapAnimationScrollTrigger } from "../../assets/utils";
import { AuthContext } from "../../AuthProvider";
import { Badge } from "@material-tailwind/react";
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  gsapAnimationScrollTrigger({ identifier: ".dash" });

  return (
    <section
      className="flex flex-col min-h-screen py-8
     mx-auto"
    >
      <p className="font-normal text-demiTopic text-white">Welcome,</p>
      <h1 className="text-white text-start text-topic font-bold mb-5 dash flex flex-row">
        <Badge
          content={user?.tier}
          placement="top-end"
          className={
            user?.tier === 3
              ? "bg-purple-400 text-white"
              : user?.tier === 2
                ? "bg-teal-500 text-white"
                : "bg-blue-700 text-white"
          }
        >
          {user?.fullname}
        </Badge>
      </h1>
      <Alert />
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
        {Lorem.dashboardWidget.map((name) => (
          user && <Card widgetName={name} key={name} />
        ))}
      </div>
      <div className="w-full h-screen lg:my-10 my-5 gap-5 flex flex-col lg:flex-row">
        <Heatmap className="dash" />
        <AdvChart className="dash" />
      </div>
    </section>
  );
};
export default Dashboard;

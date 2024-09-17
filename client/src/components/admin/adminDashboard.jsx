import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "./subCmponents/AdminContext";
import { gsapAnimationScrollTrigger } from "../../assets/utils";
import RecentProfiles from "./subCmponents/widgets/RecentProfiles";
import WithdrawalRequests from "./subCmponents/widgets/WithdrawalRequests";
import NewDeposits from "./subCmponents/widgets/NewDeposits";
import ActiveUsers from "./subCmponents/widgets/ActiveUsers";
import Lorem from "../../assets/constants";
const adminDashboard = () => {
  const { admin } = useContext(AdminContext);
  gsapAnimationScrollTrigger({ identifier: ".dash" });
  const { adminDashboardWidget } = Lorem;
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_ADMIN}/dashboard`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          setError({ message: "Network response was not ok", statusCode: 401 });
        }
        const result = await response.json();
        setData(result.data);
        setError(null);
      } catch (error) {
        setError({ message: "An error occurred", statusCode: 400 });
        setRetry((prevRetry) => prevRetry + 1);
      }
    };
    fetchData();
  }, [retry]);
  return (
    <section
      className="flex flex-col min-h-screen py-8
     mx-auto"
    >
      <p className="font-normal text-white text-demiTopic">Welcome,</p>
      <h1 className="text-white text-start text-topic font-semibold mb-5 dash">
        {admin?.username ? ` ${admin?.username}` : `Marsielle`}
      </h1>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
        {data?.NewDeposits && (
          <NewDeposits name={adminDashboardWidget[2]} data={data.NewDeposits} />
        )}
        {data.WithdrawalRequests && (
          <WithdrawalRequests
            name={adminDashboardWidget[1]}
            data={data.WithdrawalRequests}
          />
        )}
        {data.profiles && (
          <RecentProfiles name={adminDashboardWidget[0]} data={data.profiles} />
        )}
        {data.ActiveUsers && (
          <ActiveUsers name={adminDashboardWidget[3]} data={data.ActiveUsers} />
        )}
      </div>
    </section>
  );
};
export default adminDashboard;

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Lorem from "../../assets/constants";
import DepositTable from "../subcomponents/DepositTable";
import WithdrawalTable from "../subcomponents/WithdrawalTable";
import InvestmentTable from "../subcomponents/InvestmentTable";
import { gsapAnimationBase } from "../../assets/utils";
export default function TransparentTabs() {
   gsapAnimationBase(".record");
  const { recordTabs } = Lorem;
  const tables = [<DepositTable />, <WithdrawalTable />, <InvestmentTable />];
  return (
    <Tabs value="Deposit" className="w-full text-center mx-auto my-5">
      <TabsHeader
        className="bg-transparent"
        indicatorProps={{
          className: "bg-accent-green shadow-none",
        }}
      >
        {recordTabs.map((label) => (
          <Tab key={label} value={label}>
            <p className="text-white font-bold text-lg record">{label}</p>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {recordTabs.map((label, i) => (
          <TabPanel key={label} value={label}>
            {tables[i]}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

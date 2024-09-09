import { Card, CardBody, Typography } from "@material-tailwind/react";
import ActiveUserCard from "./subWidgets/ActiveUserCard";

export default function ActiveUsers(props) {
  const { name, data=[] } = props;
  return (
    <Card className="w-full bg-inherit dash">
      <Typography className="font-medium text-demiTopic uppercase text-accent-green mb-2">
        {name}
      </Typography>
      {data.map((profile) => (
        <ActiveUserCard
          key={profile._id}
          fullname={profile.fullname}
          email={profile.email}
          date={profile.lastSeen}
        />
      ))}
    </Card>
  );
}

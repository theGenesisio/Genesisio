import { Card, CardBody, Typography } from "@material-tailwind/react";
import RecentProfileCard from "./subWidgets/RecentProfileCard";
export default function RecentProfiles(props) {
  const { name, data = [] } = props;
  return (
    <Card className="w-full bg-inherit dash">
      {/* <CardBody className="text-white"> */}
      <Typography className="font-medium text-demiTopic uppercase text-accent-green mb-2">
        {name}
      </Typography>
      {data.map((profile) => (
        <RecentProfileCard
          key={profile._id}
          fullname={profile.fullname}
          email={profile.email}
          // todo convert to localdatestring
          date={profile.createdAt}
        />
      ))}
      {/* </CardBody> */}
    </Card>
  );
}

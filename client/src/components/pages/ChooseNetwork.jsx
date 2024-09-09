import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import Lorem from "../../assets/constants";
import { Link } from "react-router-dom";
import { CryptoIcons } from "../../assets/utilities";
import { gsapAnimationBase } from "../../assets/utils";
export default function ChoooseNetwork() {
  const { BTC, ETH, LTC, USDT, BNB } = CryptoIcons;
  const icons = [BTC, ETH, LTC, USDT, BNB];
  gsapAnimationBase(".opt");
  return (
    <section className="bg-primary-blue">
      <div className="flex items-center justify-center min-h-screen px-6 mx-auto">
        <div className="w-full max-w-3xl vessel opt">
          <div className="flex items-center justify-center mt-6 opt">
            <Link className="w-3/4 pb-4 font-medium text-center text-accent-green capitalize border-b-2 border-accent-green">
              Choose A Deposit Option
            </Link>
          </div>
          <List className="text-white divide-y divide-secondary-blue opt">
            {Lorem.financeOptions.map((opt, index) => (
              <Link to={opt.url} key={opt.url}>
                <ListItem className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white">
                  <ListItemPrefix className="opt" key={opt.url}>
                    {icons.map((icon, i) => index === i && icon)}
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" className="capitalize opt">
                      {opt.name}
                    </Typography>
                  </div>
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </div>
    </section>
  );
}

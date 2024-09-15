import React from "react";
import Lorem from "../../assets/constants";
import { logoSVG } from "../../assets/utils";
import { NavIcons, packageIcon, ProfileIcon } from "../../assets/utilities";
import {
  Navbar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
export default function NavbarMain() {
  const [openNav, setOpenNav] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:justify-between">
      {Lorem.navLink2.map((link, i) => {
        return (
          <Typography
            as="li"
            variant="small"
            className="flex items-center gap-x-2 p-1 transition-colors duration-300 hover:text-accent-green"
            key={link}
          >
            {NavIcons[i]}
            <Link
              to={`${link}`}
              className="flex items-center font-medium text-base"
            >
              {link}
            </Link>
          </Typography>
        );
      })}
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-3xl px-4 py-2 lg:py-4 bg-primary-blue border-secondary-blue border-0 border-b-2 text-white rounded-none">
      <div className="w-full mx-auto flex items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <img src={logoSVG} alt="Genesisio Logo" className="lg:h-10 h-8" />
          <Typography
            as="a"
            href="/"
            className="cursor-pointer py-1.5 font-bold text-xl text-logo-gold"
          >
            {Lorem.navbarBrand}
          </Typography>
        </div>
        <div className="hidden lg:flex lg:flex-row">
          {navList}
          <Menu>
            <MenuHandler>
              <Typography
                as="li"
                variant="small"
                className="flex items-center gap-x-2 p-1 transition-colors duration-300 font-medium text-base hover:text-accent-green"
                key="packages"
              >
                {packageIcon}
                Packages
              </Typography>
            </MenuHandler>
            <MenuList className="bg-primary-blue border-0 text-white">
              <MenuItem className="hover:text-accent-green">
                <Link to="/genesisio/packages">Subcribe to a package</Link>
              </MenuItem>
              <MenuItem className="hover:text-accent-green">
                <Link to="/genesisio/upgrade">Upgrade</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="flex  items-center gap-x-2">
          <Link to="/auth/logout">
            <Button
              variant="text"
              size="lg"
              className="hidden lg:inline-block text-white"
            >
              Logout
            </Button>
          </Link>
          <Typography
            as="li"
            variant="small"
            className="flex items-center gap-x-2 p-1 transition-colors duration-300 hover:text-accent-green"
          >
            <Link
              to="/genesisio/profile"
              className="items-center font-medium text-base hidden lg:inline-block"
            >
              {ProfileIcon}
            </Link>
          </Typography>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto pt-5">
          <Typography
            as="li"
            variant="small"
            className="flex items-center gap-x-2 p-1 transition-colors duration-300 hover:text-accent-green"
          >
            {ProfileIcon}
            <Link
              to="/genesisio/profile"
              className="flex items-center font-medium text-base"
            >
              Profile
            </Link>
          </Typography>
          {navList}
          <Menu>
            <MenuHandler>
              <Typography
                as="li"
                variant="small"
                className="flex items-center gap-x-2 p-1 transition-colors duration-300 font-medium text-base hover:text-accent-green"
                key="packages"
              >
                {packageIcon}
                Packages
              </Typography>
            </MenuHandler>
            <MenuList className="bg-primary-blue border-0 text-white">
              <MenuItem className="hover:text-accent-green">
                <Link to="/genesisio/packages">Subcribe to a package</Link>
              </MenuItem>
              <MenuItem className="hover:text-accent-green">
                <Link to="/genesisio/upgrade">Upgrade</Link>
              </MenuItem>
            </MenuList>
          </Menu>
          <div className="flex items-center gap-x-1 pb-1 justify-center">
            <Link to="/auth/logout" className="w-1/2">
              <Button fullWidth variant="text" size="sm" className="text-white">
                logout
              </Button>
            </Link>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}

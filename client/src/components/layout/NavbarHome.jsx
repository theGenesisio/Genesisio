import React from "react";
import Lorem from "../../assets/constants";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import RocketLaunchIcon from "@heroicons/react/24/outline/RocketLaunchIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import ChatBubbleLeftRightIcon from "@heroicons/react/24/outline/ChatBubbleLeftRightIcon";
import { logoSVG } from "../../assets/utils";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
export default function NavbarHome() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navIcons = [
    <HomeIcon className="h-8 lg:hidden" />,
    <QuestionMarkCircleIcon className="h-8 lg:hidden" />,
    <RocketLaunchIcon className="h-8 lg:hidden" />,
    <UserGroupIcon className="h-8 lg:hidden" />,
    <ChatBubbleLeftRightIcon className="h-8 lg:hidden" />,
  ];
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {Lorem.navLinks.map((link, i) => {
        return (
          <Typography
            as="li"
            variant="small"
            className="flex items-center gap-x-2 p-1 transition-colors duration-300 hover:text-accent-green"
            key={link}
          >
            {navIcons[i]}
            <Link
              to={
                link == "Our Services"
                  ? "#Our-Services"
                  : link == "About Us"
                    ? "#About-Us"
                    : `#${link}`
              }
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
    <Navbar className="mx-auto max-w-screen-4xl px-4 py-2 lg:py-4 bg-primary-blue border-secondary-blue border-0 border-b-2 text-white rounded-none">
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
        <div className="hidden lg:block">{navList}</div>
        <div className="flex  items-center gap-x-2">
          <Link to="/auth/sign-in">
            <Button
              variant="text"
              size="lg"
              className="hidden lg:inline-block text-white"
            >
              Login
            </Button>
          </Link>
          <Link to="/auth/sign-up">
            <Button
              variant="filled"
              size="sm"
              className="hidden lg:inline-block bg-accent-green text-white"
            >
              Sign up
            </Button>
          </Link>
          {/* <Typography
            as="li"
            variant="small"
            className="flex items-center gap-x-2 p-1 transition-colors duration-300 hover:text-accent-green"
          >
            <Link
              to="/genesisio/profile"
              className="items-center font-medium text-base hidden lg:inline-block "
            >
              <UserCircleIcon className="h-10" />
            </Link>
          </Typography> */}
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
          {/* <Typography
            as="li"
            variant="small"
            className="flex items-center gap-x-2 p-1 transition-colors duration-300 hover:text-accent-green"
          >
            <UserCircleIcon className="h-8 inline-block lg:hidden" />
            <Link
              to="/genesisio/profile"
              className="flex items-center font-medium text-base"
            >
              Profile
            </Link>
          </Typography> */}
          {navList}
          <div className="flex items-center gap-x-1 pb-1">
            <Link to="/auth/sign-in" className="w-1/2">
              <Button fullWidth variant="text" size="md" className="text-white">
                Login
              </Button>
            </Link>
            <Link to="/auth/sign-up" className="w-1/2">
              <Button
                fullWidth
                variant="filled"
                size="md"
                className="bg-accent-green text-white"
              >
                sign up
              </Button>
            </Link>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}

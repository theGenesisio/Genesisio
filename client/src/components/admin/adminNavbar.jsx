import React, { useEffect, useState } from "react";
import Lorem from "../../assets/constants";
import { logoSVG } from "../../assets/utils";
import { AdminIcons } from "../../assets/utilities";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link, Navigate } from "react-router-dom";
export default function NavbarMain() {
  const [openNav, setOpenNav] = useState(false);
  const [serverResponse, setserverResponse] = useState({
    statusCode: null,
    message: null,
  });
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:justify-between">
      {Lorem.adminNavLinks.map((link, i) => {
        return (
          <Typography
            as="li"
            variant="small"
            className="flex items-center gap-x-2 p-1 transition-colors duration-300 hover:text-accent-green"
            key={link}
          >
            {AdminIcons[i]}
            <Link
              to={`${link.toLowerCase()}`}
              className="flex items-center font-medium text-base"
            >
              {link}
            </Link>
          </Typography>
        );
      })}
    </ul>
  );
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_ADMIN}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response) {
        const data = await response.json();
        setserverResponse(data);
      } else if (!response) {
        setserverResponse({
          message: "No response from server, please try again later",
        });
      } else {
        setserverResponse({
          message: "Unexpected occurence during logout, please try again later",
        });
      }
    } catch (err) {
      console.error("Error during logout:", error);
      setserverResponse({
        message: "An error occurred. Please try again later.",
      });
    }
  };
  return (
    <Navbar className="mx-auto max-w-screen-3xl px-4 py-2 lg:py-4 bg-primary-blue border-secondary-blue border-0 border-b-2 text-white rounded-none">
      {serverResponse.statusCode === 200 && (
        <Navigate to="/admin/auth/sign-in" />
      )}
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
          <Button
            variant="text"
            onClick={handleLogout}
            size="lg"
            className="hidden lg:inline-block text-white"
          >
            Logout
          </Button>
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
          {navList}
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

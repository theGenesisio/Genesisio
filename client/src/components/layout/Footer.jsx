import React from "react";
import { logoSVG } from "../../assets/utils";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Lorem from "../../assets/constants";
import {
  facebookIcon,
  instagramIcon,
} from "../../assets/utilities";
const Footer = () => {
  return (
    <footer className="bg-primary-blue">
      <div className="max-w-screen-3xl px-4 py-8 mx-auto">
        <div className="flex flex-col items-center text-center">
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

          <div className="flex flex-wrap justify-center mt-6 -mx-4">
            {Lorem.navLinks.map((link) => (
              <Link
              key={link}
                to={link === "Home" ? "/" : `/#${link}`}
                className="mx-4 text-sm text-accent-green transition-colors duration-300 hover:text-white"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
        <hr className="my-6 border-secondary-blue md:my-10" />
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <div className="flex m-2">
            <Link
              href="#"
              className="mx-2 text-accent-green transition-colors duration-300 hover:text-white flex-row flex gap-1 text-center"
              aria-label="address"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 19c.437 0 1.479-1.187 2.411-3.312C15.357 13.534 16 10.874 16 9.353C16 6.924 14.183 5 12 5S8 6.924 8 9.353c0 1.52.643 4.181 1.589 6.335C10.52 17.813 11.563 19 12 19m0 2c-3.314 0-6-8.138-6-11.647C6 5.844 8.686 3 12 3s6 2.844 6 6.353S15.314 21 12 21m0-10a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
                ></path>
              </svg>
              <span className="inline-block">{Lorem.footerLink2.address}</span>
            </Link>
            <Link
              to={`mailto:${Lorem.footerLink2.mailTo}`}
              className="mx-2 text-accent-green transition-colors duration-300 hover:text-white flex-row flex gap-1 text-center"
              aria-label="mail"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 10v8h16v-8l-8 3zm0-4v2l8 3l8-3V6zm0-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"
                ></path>
              </svg>
              <span className="inline-block">{Lorem.footerLink2.mail}</span>
            </Link>
          </div>
          <div className="flex m-2">
            <Link
              href="#"
              className="mx-2 text-accent-green transition-colors duration-300 hover:text-white"
              aria-label="Instagram"
            >
              {instagramIcon}
            </Link>
            <Link
              href="#"
              className="mx-2 text-accent-green transition-colors duration-300 hover:text-white"
              aria-label="facebook"
            >
              {facebookIcon}
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center sm:flex-row sm:justify-center">
          <p className="text-sm text-accent-green">{Lorem.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

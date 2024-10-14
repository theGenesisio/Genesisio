import React from "react";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import BanknotesIcon from "@heroicons/react/24/outline/BanknotesIcon";
import BuildingLibraryIcon from "@heroicons/react/24/outline/BuildingLibraryIcon";
import BriefcaseIcon from "@heroicons/react/24/outline/BriefcaseIcon";
const CryptoIcons = {
  BTC: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 32 32"
    >
      <g fill="none" fill-rule="evenodd">
        <circle cx="16" cy="16" r="16" fill="#F7931A" />
        <path
          fill="#FFF"
          fill-rule="nonzero"
          d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84l-1.728-.43l-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009l-2.384-.595l-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045l-1.13 4.532c-.086.212-.303.531-.793.41c.018.025-1.256-.313-1.256-.313l-.858 1.978l2.25.561c.418.105.828.215 1.231.318l-.715 2.872l1.727.43l.708-2.84c.472.127.93.245 1.378.357l-.706 2.828l1.728.43l.715-2.866c2.948.558 5.164.333 6.097-2.333c.752-2.146-.037-3.385-1.588-4.192c1.13-.26 1.98-1.003 2.207-2.538m-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11m.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733"
        />
      </g>
    </svg>
  ),
  ETH: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 32 32"
    >
      <g fill="none" fill-rule="evenodd">
        <circle cx="16" cy="16" r="16" fill="#627EEA" />
        <g fill="#FFF" fill-rule="nonzero">
          <path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
          <path d="M16.498 4L9 16.22l7.498-3.35z" />
          <path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
          <path d="M16.498 27.995v-6.028L9 17.616z" />
          <path
            fill-opacity=".2"
            d="m16.498 20.573l7.497-4.353l-7.497-3.348z"
          />
          <path fill-opacity=".602" d="m9 16.22l7.498 4.353v-7.701z" />
        </g>
      </g>
    </svg>
  ),
  LTC: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 32 32"
    >
      <g fill="none" fill-rule="evenodd">
        <circle cx="16" cy="16" r="16" fill="#BFBBBB" />
        <path
          fill="#FFF"
          d="M10.427 19.214L9 19.768l.688-2.759l1.444-.58L13.213 8h5.129l-1.519 6.196l1.41-.571l-.68 2.75l-1.427.571l-.848 3.483H23L22.127 24H9.252z"
        />
      </g>
    </svg>
  ),
  USDT: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 32 32"
    >
      <g fill="none" fill-rule="evenodd">
        <circle cx="16" cy="16" r="16" fill="#26A17B" />
        <path
          fill="#FFF"
          d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042c-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658c0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061c1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658c0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118c0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116c0-1.043-3.301-1.914-7.694-2.117"
        />
      </g>
    </svg>
  ),
  BNB: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 32 32"
    >
      <g fill="none">
        <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
        <path
          fill="#FFF"
          d="M12.116 14.404L16 10.52l3.886 3.886l2.26-2.26L16 6l-6.144 6.144zM6 16l2.26-2.26L10.52 16l-2.26 2.26zm6.116 1.596L16 21.48l3.886-3.886l2.26 2.259L16 26l-6.144-6.144l-.003-.003zM21.48 16l2.26-2.26L26 16l-2.26 2.26zm-3.188-.002h.002V16L16 18.294l-2.291-2.29l-.004-.004l.004-.003l.401-.402l.195-.195L16 13.706z"
        />
      </g>
    </svg>
  ),
};
const NavIcons = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    className="h-8 lg:hidden"
  >
    <path
      fill="currentColor"
      d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6zm2-10h4V5H5zm10 8h4v-6h-4zm0-12h4V5h-4zM5 19h4v-2H5zm4-2"
    />
  </svg>,
  <BanknotesIcon className="h-8 lg:hidden" />,
  <BuildingLibraryIcon className="h-8 lg:hidden" />,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    className="h-8 lg:hidden"
  >
    <path
      fill="currentColor"
      d="M14 9.9V8.2q.825-.35 1.688-.525T17.5 7.5q.65 0 1.275.1T20 7.85v1.6q-.6-.225-1.213-.337T17.5 9q-.95 0-1.825.238T14 9.9m0 5.5v-1.7q.825-.35 1.688-.525T17.5 13q.65 0 1.275.1t1.225.25v1.6q-.6-.225-1.213-.338T17.5 14.5q-.95 0-1.825.225T14 15.4m0-2.75v-1.7q.825-.35 1.688-.525t1.812-.175q.65 0 1.275.1T20 10.6v1.6q-.6-.225-1.213-.338T17.5 11.75q-.95 0-1.825.238T14 12.65M6.5 16q1.175 0 2.288.263T11 17.05V7.2q-1.025-.6-2.175-.9T6.5 6q-.9 0-1.788.175T3 6.7v9.9q.875-.3 1.738-.45T6.5 16m6.5 1.05q1.1-.525 2.213-.787T17.5 16q.9 0 1.763.15T21 16.6V6.7q-.825-.35-1.713-.525T17.5 6q-1.175 0-2.325.3T13 7.2zM12 20q-1.2-.95-2.6-1.475T6.5 18q-1.05 0-2.062.275T2.5 19.05q-.525.275-1.012-.025T1 18.15V6.1q0-.275.138-.525T1.55 5.2q1.15-.6 2.4-.9T6.5 4q1.45 0 2.838.375T12 5.5q1.275-.75 2.663-1.125T17.5 4q1.3 0 2.55.3t2.4.9q.275.125.413.375T23 6.1v12.05q0 .575-.487.875t-1.013.025q-.925-.5-1.937-.775T17.5 18q-1.5 0-2.9.525T12 20m-5-8.35"
    />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    className="h-8 lg:hidden"
  >
    <path
      fill="currentColor"
      d="m12 21l-6.2-6L3 17v-2.45l3-2.15l6.125 5.95L16.3 15H21v2h-4zm0-9L7.625 7.625L3 11V8.525L7.825 5L12.2 9.375L21 3v2.475z"
    />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    className="h-8 lg:hidden"
  >
    <path
      fill="currentColor"
      d="m18.309 6.219l-.55.547a7.724 7.724 0 0 1 0 10.453l.55.547a8.5 8.5 0 0 0 0-11.56zm-11.551.047a7.795 7.795 0 0 1 10.492 0l.55-.547a8.58 8.58 0 0 0-11.604 0zm-.513 10.959a7.724 7.724 0 0 1 0-10.448l-.549-.547a8.5 8.5 0 0 0 0 11.56zm11 .505a7.795 7.795 0 0 1-10.493 0l-.549.547a8.58 8.58 0 0 0 11.604 0zm-3.683-7.292c0 .704-.625.937-1.25.937h-.938V9.5h1.25c.48 0 .938.35.938.938m.55 3.162c0 .768-.862.9-1.488.9h-1.25v-1.875h1.25c.56 0 1.488.226 1.488.975m1.354-3.425c-.11-1.142-.966-1.808-2.216-1.925V6.375H12v1.866c-.255 0-.363 0-.621.01V6.374h-1.255V8.25H8.25V9.5h.7c.237 0 .55 0 .55.496v4.185c0 .007 0 .32-.363.32h-.696l-.191 1.25h1.874v1.874h1.25l-.006-1.875H12v1.875h1.25V15.75c1.633-.099 2.632-.438 2.774-1.96c.115-1.226-.463-1.773-1.387-1.994c.562-.284.914-.786.83-1.621"
    />
    <path
      fill="currentColor"
      d="M11.998 2.815C6.908 2.817 2.786 6.93 2.788 12c.004 5.07 4.132 9.178 9.221 9.175c5.086-.003 9.207-4.11 9.209-9.177c-.006-5.069-4.131-9.182-9.22-9.183m0 19.148c-5.522 0-10-4.462-9.998-9.965c.001-5.502 4.479-9.962 10.002-9.96c5.521 0 9.997 4.46 9.998 9.96c-.006 5.5-4.48 9.958-10.002 9.965"
    />
  </svg>,
  <BriefcaseIcon className="h-8 lg:hidden" />,
];
const AdminIcons = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    className="h-8 lg:hidden"
  >
    <path
      fill="currentColor"
      d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6zm2-10h4V5H5zm10 8h4v-6h-4zm0-12h4V5h-4zM5 19h4v-2H5zm4-2"
    />
  </svg>,
  <BanknotesIcon className="h-8 lg:hidden" />,
  <BuildingLibraryIcon className="h-8 lg:hidden" />,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    className="h-8 lg:hidden"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m16 6l2.29 2.29l-4.88 4.88l-4-4L2 16.59L3.41 18l6-6l4 4l6.3-6.29L22 12V6z"
    />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    className="h-8 lg:hidden"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M4 17h16v2H4zm13-6.17L15.38 12L12 7.4L8.62 12L7 10.83L9.08 8H4v6h16V8h-5.08z"
      opacity=".3"
    />
    <path
      fill="currentColor"
      d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67l-.5-.68C10.96 2.54 10.05 2 9 2C7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m-5-2c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1M9 4c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m11 15H4v-2h16zm0-5H4V8h5.08L7 10.83L8.62 12L12 7.4l3.38 4.6L17 10.83L14.92 8H20z"
    />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    className="h-8 lg:hidden"
  >
    <path
      fill="currentColor"
      d="m18.309 6.219l-.55.547a7.724 7.724 0 0 1 0 10.453l.55.547a8.5 8.5 0 0 0 0-11.56zm-11.551.047a7.795 7.795 0 0 1 10.492 0l.55-.547a8.58 8.58 0 0 0-11.604 0zm-.513 10.959a7.724 7.724 0 0 1 0-10.448l-.549-.547a8.5 8.5 0 0 0 0 11.56zm11 .505a7.795 7.795 0 0 1-10.493 0l-.549.547a8.58 8.58 0 0 0 11.604 0zm-3.683-7.292c0 .704-.625.937-1.25.937h-.938V9.5h1.25c.48 0 .938.35.938.938m.55 3.162c0 .768-.862.9-1.488.9h-1.25v-1.875h1.25c.56 0 1.488.226 1.488.975m1.354-3.425c-.11-1.142-.966-1.808-2.216-1.925V6.375H12v1.866c-.255 0-.363 0-.621.01V6.374h-1.255V8.25H8.25V9.5h.7c.237 0 .55 0 .55.496v4.185c0 .007 0 .32-.363.32h-.696l-.191 1.25h1.874v1.874h1.25l-.006-1.875H12v1.875h1.25V15.75c1.633-.099 2.632-.438 2.774-1.96c.115-1.226-.463-1.773-1.387-1.994c.562-.284.914-.786.83-1.621"
    />
    <path
      fill="currentColor"
      d="M11.998 2.815C6.908 2.817 2.786 6.93 2.788 12c.004 5.07 4.132 9.178 9.221 9.175c5.086-.003 9.207-4.11 9.209-9.177c-.006-5.069-4.131-9.182-9.22-9.183m0 19.148c-5.522 0-10-4.462-9.998-9.965c.001-5.502 4.479-9.962 10.002-9.96c5.521 0 9.997 4.46 9.998 9.96c-.006 5.5-4.48 9.958-10.002 9.965"
    />
  </svg>,
  <UserCircleIcon className="h-8 lg:hidden" />,
];
const ProfileIcon = <UserCircleIcon className="h-10" />;
const maleAvataar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 24 24"
    className="text-white"
  >
    <path
      fill="currentColor"
      d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
    />
  </svg>
);
const femaleAvatar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 24 24"
    className="text-white"
  >
    <path
      fill="currentColor"
      d="M9.775 12q-.9 0-1.5-.675T7.8 9.75l.325-2.45q.2-1.425 1.3-2.363T12 4t2.575.938t1.3 2.362l.325 2.45q.125.9-.475 1.575t-1.5.675zM4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
    />
  </svg>
);
const packageIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    className="h-8 lg:hidden"
  >
    <path
      fill="currentColor"
      d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67l-.5-.68C10.96 2.54 10.05 2 9 2C7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m-5-2c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1M9 4c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m11 15H4v-2h16zm0-5H4V8h5.08L7 10.83L8.62 12L11 8.76l1-1.36l1 1.36L15.38 12L17 10.83L14.92 8H20z"
    />
  </svg>
);
const infoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    className="inline mr-2 text-white"
  >
    <path
      fill="currentColor"
      d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-11v6h2v-6zm0-4h2v2h-2z"
    />
  </svg>
);
const QRCode = (
  // todo Should later come from server
  <svg
    className="h-full w-full object-cover object-center p-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path fill="currentColor" d="M1 1h10v10H1zm2 2v6h6V3z" />
    <path fill="currentColor" fill-rule="evenodd" d="M5 5h2v2H5z" />
    <path fill="currentColor" d="M13 1h10v10H13zm2 2v6h6V3z" />
    <path fill="currentColor" fill-rule="evenodd" d="M17 5h2v2h-2z" />
    <path fill="currentColor" d="M1 13h10v10H1zm2 2v6h6v-6z" />
    <path fill="currentColor" fill-rule="evenodd" d="M5 17h2v2H5z" />
    <path
      fill="currentColor"
      d="M23 19h-4v4h-6V13h1h-1v6h2v2h2v-6h-2v-2h-1h3v2h2v2h2v-4h2zm0 2v2h-2v-2z"
    />
  </svg>
);
const checkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 mx-2 text-accent-green"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const serviceIcons = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m17.5 16.82l2.44 1.41l-.75 1.3L16 17.69V14h1.5zM24 17c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-.34.03-.67.08-1H2V4h18v6.68c2.36 1.13 4 3.53 4 6.32m-13.32-3c.18-.36.37-.7.6-1.03c-.09.03-.18.03-.28.03c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3c0 .25-.04.5-.1.73c.94-.46 1.99-.73 3.1-.73c.34 0 .67.03 1 .08V8a2 2 0 0 1-2-2H6c0 1.11-.89 2-2 2v4a2 2 0 0 1 2 2zM22 17c0-2.76-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5"
    />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M13 18h-2v-2h2zm0-3h-2c0-3.25 3-3 3-5c0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5m9-3c0 5.18-3.95 9.45-9 9.95v-2.01c3.95-.49 7-3.86 7-7.94s-3.05-7.45-7-7.94V2.05c5.05.5 9 4.77 9 9.95M11 2.05v2.01c-1.46.18-2.8.76-3.91 1.62L5.67 4.26C7.15 3.05 9 2.25 11 2.05M4.06 11H2.05c.2-2 1-3.85 2.21-5.33L5.68 7.1A7.9 7.9 0 0 0 4.06 11M11 19.94v2.01c-2-.2-3.85-.99-5.33-2.21l1.42-1.42c1.11.86 2.45 1.44 3.91 1.62M2.05 13h2.01c.18 1.46.76 2.8 1.62 3.91l-1.42 1.42A10 10 0 0 1 2.05 13"
    />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M2 2h2v18h18v2H2zm15 0h3v16h-3zM6 11h3v7H6zm7-8h3v4h-3zm-3 5h3v4h-3z"
    />
  </svg>,
];
const whyIcons = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 16a3 3 0 0 1-3-3c0-1.12.61-2.1 1.5-2.61l9.71-5.62l-5.53 9.58c-.5.98-1.51 1.65-2.68 1.65m0-13c1.81 0 3.5.5 4.97 1.32l-2.1 1.21C14 5.19 13 5 12 5a8 8 0 0 0-8 8c0 2.21.89 4.21 2.34 5.65h.01c.39.39.39 1.02 0 1.41s-1.03.39-1.42.01A9.97 9.97 0 0 1 2 13A10 10 0 0 1 12 3m10 10c0 2.76-1.12 5.26-2.93 7.07c-.39.38-1.02.38-1.41-.01a.996.996 0 0 1 0-1.41A7.95 7.95 0 0 0 20 13c0-1-.19-2-.54-2.9L20.67 8C21.5 9.5 22 11.18 22 13"
    />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M14 15c0 1.11-.89 2-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2m-.91 5c.12.72.37 1.39.72 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h1V6c0-2.76 2.24-5 5-5s5 2.24 5 5v2h1a2 2 0 0 1 2 2v3.09c-.33-.05-.66-.09-1-.09s-.67.04-1 .09V10H6v10zM9 8h6V6c0-1.66-1.34-3-3-3S9 4.34 9 6zm12.34 7.84l-3.59 3.59l-1.59-1.59L15 19l2.75 3l4.75-4.75z"
    />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M21 18v1c0 1.1-.9 2-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14c1.1 0 2 .9 2 2v1h-9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2zm-9-2h10V8H12zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5"
    />
  </svg>,
  <BuildingLibraryIcon className="h-24" />,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m23.5 17l-5 5l-3.5-3.5l1.5-1.5l2 2l3.5-3.5zm-10.4 2.9c-.4.1-.7.1-1.1.1c-4.4 0-8-3.6-8-8s3.6-8 8-8s8 3.6 8 8c0 .4 0 .7-.1 1.1c.7.1 1.3.3 1.9.6c.1-.6.2-1.1.2-1.7c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10c.6 0 1.2-.1 1.7-.2c-.3-.5-.5-1.2-.6-1.9m2.5-5.8l-3.1-1.8V7H11v6l3.5 2.1c.3-.4.7-.7 1.1-1"
    />
  </svg>,
];
const faqOpenIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M18 12H6"
    />
  </svg>
);
const faqClosedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);
const eyeSlashIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862m3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.012T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.775 0 6.725 2.087T23 11.5q-.575 1.475-1.513 2.738T19.3 16.45m.5 6.15l-4.2-4.15q-.875.275-1.762.413T12 19q-3.775 0-6.725-2.087T1 11.5q.525-1.325 1.325-2.463T4.15 7L1.4 4.2l1.4-1.4l18.4 18.4zM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.062t.975-.138l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525zm4.2 4.2"
    />
  </svg>
);
const dropfileIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);
const pasteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M3 21V3h6.175q.275-.875 1.075-1.437T12 1q1 0 1.788.563T14.85 3H21v18zm2-2h14V5h-2v3H7V5H5zm7-14q.425 0 .713-.288T13 4t-.288-.712T12 3t-.712.288T11 4t.288.713T12 5"
    />
  </svg>
);
const mailIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const lockIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);
const editIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="opacity-50 hover:opacity-100"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M5 20h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2m-1-5L14 5l3 3L7 18H4zM15 4l2-2l3 3l-2.001 2.001z"
    />
  </svg>
);
const linkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M6 8h5v2H6v8h8v-5h2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2m10.614-2H12V4h8v8h-2V7.442l-5.336 5.336l-1.414-1.414z"
    />
  </svg>
);
const phoneIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M4.024 9L4 8.931C3.46 7.384 3 5.27 3 4c0-.55.45-1 1-1h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-.837A16.054 16.054 0 0 0 15 17.837V17a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3c0 .45-.55 1-1 1c-1.725 0-3.44-.456-5-1c-5.114-1.832-9.168-5.886-10.976-11"
    />
  </svg>
);
const workIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M17 9h2V7h-2zm0 4h2v-2h-2zm0 4h2v-2h-2zm0 4v-2h4V5h-9v1.4l-2-1.45V3h13v18zM1 21V11l7-5l7 5v10H9v-5H7v5zm2-2h2v-5h6v5h2v-7L8 8.45L3 12zm8 0v-5H5v5v-5h6z"
    />
  </svg>
);
const genderIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M9.5 11c1.93 0 3.5 1.57 3.5 3.5S11.43 18 9.5 18S6 16.43 6 14.5S7.57 11 9.5 11m0-2C6.46 9 4 11.46 4 14.5S6.46 20 9.5 20s5.5-2.46 5.5-5.5c0-1.16-.36-2.23-.97-3.12L18 7.42V10h2V4h-6v2h2.58l-3.97 3.97C11.73 9.36 10.66 9 9.5 9"
    />
  </svg>
);
const locationIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 7.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22m0-12"
    />
  </svg>
);
const postcodeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M3 22q-.425 0-.712-.288T2 21v-8q0-.425.288-.712T3 12h3V8q0-2.5 1.75-4.25T12 2h4q2.5 0 4.25 1.75T22 8v13q0 .425-.288.713T21 22t-.712-.288T20 21v-2h-4v2q0 .425-.288.713T15 22zm13-5h4V8q0-1.65-1.175-2.825T16 4h-4q-1.65 0-2.825 1.175T8 8v4h7q.425 0 .713.288T16 13zm-7-.15L14 14H4zM4 20h10v-4.25l-4 2.275q-.225.125-.475.2T9 18.3t-.525-.075t-.475-.2L4 15.75zm0-6v.65v-.025v1.35v-.225V20v-4.25v.225v-1.35v.025zm7-4q-.425 0-.712-.288T10 9t.288-.712T11 8h6q.425 0 .713.288T18 9t-.288.713T17 10z"
    />
  </svg>
);
const dateIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M11 14v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zm-4 4v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zM3 22V4h3V2h2v2h8V2h2v2h3v18zm2-2h14V10H5z"
    />
  </svg>
);
const usericon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 mx-3 text-gray-400 focus:text-accent-green"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const instagramIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 2c-2.716 0-3.056.012-4.123.06c-1.064.049-1.791.218-2.427.465a4.901 4.901 0 0 0-1.772 1.153A4.902 4.902 0 0 0 2.525 5.45c-.247.636-.416 1.363-.465 2.427C2.011 8.944 2 9.284 2 12s.011 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.903 4.903 0 0 0 1.153 1.772a4.903 4.903 0 0 0 1.772 1.153c.636.247 1.363.416 2.427.465c1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 0 0 1.772-1.153a4.902 4.902 0 0 0 1.153-1.772c.247-.636.416-1.363.465-2.427c.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 0 0-1.153-1.772a4.901 4.901 0 0 0-1.772-1.153c-.636-.247-1.363-.416-2.427-.465C15.056 2.012 14.716 2 12 2m0 1.802c2.67 0 2.986.01 4.04.058c.976.045 1.505.207 1.858.344c.466.182.8.399 1.15.748c.35.35.566.684.748 1.15c.136.353.3.882.344 1.857c.048 1.055.058 1.37.058 4.041c0 2.67-.01 2.986-.058 4.04c-.045.976-.208 1.505-.344 1.858a3.1 3.1 0 0 1-.748 1.15c-.35.35-.684.566-1.15.748c-.353.136-.882.3-1.857.344c-1.054.048-1.37.058-4.041.058c-2.67 0-2.987-.01-4.04-.058c-.976-.045-1.505-.208-1.858-.344a3.098 3.098 0 0 1-1.15-.748a3.098 3.098 0 0 1-.748-1.15c-.137-.353-.3-.882-.344-1.857c-.048-1.055-.058-1.37-.058-4.041c0-2.67.01-2.986.058-4.04c.045-.976.207-1.505.344-1.858c.182-.466.399-.8.748-1.15c.35-.35.684-.566 1.15-.748c.353-.137.882-.3 1.857-.344c1.055-.048 1.37-.058 4.041-.058m0 11.531a3.333 3.333 0 1 1 0-6.666a3.333 3.333 0 0 1 0 6.666m0-8.468a5.135 5.135 0 1 0 0 10.27a5.135 5.135 0 0 0 0-10.27m6.538-.203a1.2 1.2 0 1 1-2.4 0a1.2 1.2 0 0 1 2.4 0"
    ></path>
  </svg>
);
const facebookIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M15.725 22v-7.745h2.6l.389-3.018h-2.99V9.31c0-.874.243-1.47 1.497-1.47h1.598v-2.7a21.391 21.391 0 0 0-2.33-.12c-2.304 0-3.881 1.407-3.881 3.99v2.227H10v3.018h2.607V22H3.104C2.494 22 2 21.506 2 20.896V3.104C2 2.494 2.494 2 3.104 2h17.792C21.506 2 22 2.494 22 3.104v17.792c0 .61-.494 1.104-1.104 1.104z"
    ></path>
  </svg>
);
const dollarIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M11.025 21v-2.15q-1.325-.3-2.287-1.15t-1.413-2.4l1.85-.75q.375 1.2 1.113 1.825t1.937.625q1.025 0 1.738-.462t.712-1.438q0-.875-.55-1.387t-2.55-1.163q-2.15-.675-2.95-1.612t-.8-2.288q0-1.625 1.05-2.525t2.15-1.025V3h2v2.1q1.25.2 2.063.913t1.187 1.737l-1.85.8q-.3-.8-.85-1.2t-1.5-.4q-1.1 0-1.675.488T9.825 8.65q0 .825.75 1.3t2.6 1q1.725.5 2.613 1.588t.887 2.512q0 1.775-1.05 2.7t-2.6 1.15V21z"
    />
  </svg>
);
export {
  CryptoIcons,
  eyeSlashIcon,
  NavIcons,
  AdminIcons,
  dateIcon,
  usericon,
  instagramIcon,
  facebookIcon,
  ProfileIcon,
  genderIcon,
  postcodeIcon,
  workIcon,
  editIcon,
  phoneIcon,
  lockIcon,
  QRCode,
  linkIcon,
  mailIcon,
  infoIcon,
  checkIcon,
  locationIcon,
  serviceIcons,
  whyIcons,
  faqClosedIcon,
  dropfileIcon,
  faqOpenIcon,
  packageIcon,
  pasteIcon,
  maleAvataar,
  femaleAvatar,
  dollarIcon
};

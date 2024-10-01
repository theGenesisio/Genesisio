import React, { useEffect, useState } from "react";

const DepositAddress = (props) => {
  const [address, setAddress] = useState(null);
  const [retry, setRetry] = useState(0);
  const [copied, setcopied] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API}/deposit/load/${props.network}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          setRetry((prevRetry) => prevRetry + 1);
        }

        const data = await response.json();
        setAddress(data.data);
      } catch (error) {
        console.error("Failed to fetch address:", error);
      }
    };

    fetchAddress();
  }, [retry]);

  const copy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(address?.network.address);
      setcopied(true);
    } catch (err) {
      setcopied(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {address?.network?.address && (
        <div className="relative flex items-center mt-4 deposit">
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-3 text-gray-400"
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
          </span>

          <input
            type="text"
            className="block w-full truncate"
            value={address?.network?.address}
            readOnly
          />
        </div>
      )}
      {address?.statusCode > 201 && (
        <p className="text-accent-red">{address.message}</p>
      )}
      <button
        fullWidth
        onClick={copy}
        className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform  rounded-lg uppercase deposit ${copied ? "bg-accent-green" : "bg-transparent"}`}
      >
        {copied?"copied":"copy address"}
      </button>
    </div>
  );
};

export default DepositAddress;

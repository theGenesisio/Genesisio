import React, { useEffect, useState } from "react";
import { CryptoIcons, dropfileIcon, pasteIcon } from "../../assets/utilities";
import { isoToLocaleDateString } from "../../assets/utils";
import FormError from "../subcomponents/FormError";
import {
  List,
  ListItem,
  Option,
  ListItemPrefix,
  Select,
  Typography,
} from "@material-tailwind/react";
const adminNetworks = () => {
  const [networks, setNetworks] = useState(null);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);
  const [value, setValue] = useState("");
  const [address, setAddress] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
const paste = async (e) => {
  e.preventDefault();
try {
  const text = await navigator.clipboard.readText();
  setAddress(text)
} catch (err) {
  console.error("Failed to paste: ", err);
}
};

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
  };
  useEffect(() => {
    // ** GET NETWORKS
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_ADMIN}/networks`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setNetworks(result.data.networks);
        setError({ message: result.message, statusCode: result.statusCode });
      } catch (error) {
        setError({ message: "An error occurred", statusCode: 400 });
        setRetry((prevRetry) => prevRetry + 1);
      }
    };
    fetchData();
  }, [retry]);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        // 2 MB in bytes
        setError("File size must be less than 5 MB");
        setFile(null);
      } else if (!["image/png"].includes(selectedFile.type)) {
        setError("Only PNG are allowed");
        setFile(null);
      } else {
        setError("");
        setFileName(selectedFile.name);
        setFile(selectedFile);
      }
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("address", address);
    formData.append("file", file);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_ADMIN}/networks/${value}`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );
      if (!response.ok) {
        setError({
          message: "Network response was not ok",
          statusCode: 403,
        });
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setRetry((prev) => prev + 1);
      setValue("");
      setAddress("");
      setFile(null);
      setFileName(null);
      setError({ message: result.message, statusCode: result.statusCode });
    } catch (error) {
      setError({
        message: "An error occured",
        statusCode: 403,
      });
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  return (
    <section className="bg-primary-blue">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl vessel">
          <div className="flex items-center justify-center mt-6">
            <Typography className="w-3/4 pb-4 font-medium text-center text-accent-green capitalize border-b-2 border-accent-green">
              Deposit options
            </Typography>
          </div>
          <List className="text-white divide-y divide-secondary-blue">
            {networks &&
              networks?.map((network) => (
                <ListItem
                  onClick={() => setValue(network.networkName)}
                  className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white max-w-full"
                  key={network.address}
                >
                  <ListItemPrefix>
                    {CryptoIcons[network.networkName]}
                  </ListItemPrefix>
                  <div className="flex flex-col gap-1">
                    <Typography className="font-normal text-lg md:text-xl max-w-full">
                      {network.address}
                    </Typography>
                    <Typography className="font-normal text-sm md:text-md text-gray-400 max-w-full">
                      {isoToLocaleDateString(network.updatedAt)}
                    </Typography>
                  </div>
                </ListItem>
              ))}
          </List>
          <div className="my-4 flex flex-col items-center gap-4 w-full">
            <div className="flex flex-row gap-3 mt-3">
              <div className="relative flex items-center w-full">
                <input
                  type="text"
                  className="block w-full"
                  placeholder="Enter new address"
                  name="address"
                  value={address}
                  onChange={handleAddressChange}
                />
                <span className="absolute mx-3 text-gray-400 hover:text-accent-green" onClick={paste}>
                  {pasteIcon}
                </span>
              </div>
              <div className="w-full bg-transparent text-white">
                <Select
                  label="Network to update"
                  value={value}
                  variant="standard"
                  onChange={(val) => setValue(val)}
                  className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
                >
                  <Option
                    value="BTC"
                    className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
                  >
                    Bitcoin
                  </Option>
                  <Option
                    value="ETH"
                    className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
                  >
                    Ethereum
                  </Option>
                  <Option
                    value="LTC"
                    className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
                  >
                    Litecoin
                  </Option>
                  <Option
                    value="USDT"
                    className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
                  >
                    Tether
                  </Option>
                  <Option
                    value="BNB"
                    className="hover:bg-accent-green focus:bg-accent-green hover:text-white focus:text-white"
                  >
                    Binance coin
                  </Option>
                </Select>
              </div>
            </div>
            <div className="flex flex-row justify-between p-3 bg-inherit border border-secondary-blue rounded-lg text-white">
              {dropfileIcon}
              <input
                id="dropzone-file"
                type="file"
                accept="image/png"
                className="opacity-0"
                onChange={handleFileChange}
              />
              <h2 className="capitalize">Upload QRCode</h2>
            </div>
          </div>
          {value !== "" && file !== null && (
            <button
              type="submit"
              onClick={handleUpload}
              disabled={value === ""}
              fullWidth
              className="w-full px-6 py-3 text-md font-bold tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 disabled:hidden uppercase deposit"
            >
              update details
            </button>
          )}
        </div>
        {error?.statusCode && (
          <FormError err={error.message} code={error.statusCode} />
        )}
        {fileName && <p className="text-accent-change-green">{fileName}</p>}
      </div>
    </section>
  );
};

export default adminNetworks;

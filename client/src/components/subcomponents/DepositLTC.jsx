import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import {
  CryptoIcons,
  dropfileIcon,
  infoIcon,
  lockIcon,
  QRCode,
} from "../../assets/utilities";
import Lorem from "../../assets/constants";
import { gsapAnimationBase } from "../../assets/utils";
import { Navigate } from "react-router-dom";
import FormError from "../subcomponents/FormError";
import { AuthContext } from "../../AuthProvider";
import DepositAddress from "./DepositAddress";
const DepositLTC = (props) => {
  const { LTC } = CryptoIcons;
  const { user } = useContext(AuthContext);
  gsapAnimationBase(".deposit");
  const [amount, setAmount] = useState(0);
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [convert, setConvert] = useState(0);
  function coinToUSD(currentValue, amount) {
    let res = parseFloat(currentValue * amount);
    return setConvert(res.toLocaleString());
  }
  useEffect(() => {
    props.price !== null && coinToUSD(props?.price?.price, amount);
  }, [amount]);
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Validate the input to allow only numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    } else {
      // Handle invalid input
      setAmount("");
    }
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 3 * 1024 * 1024) {
        // 3 MB in bytes
        setError("File size must be less than 3 MB");
        setFile(null);
      } else if (!["image/png"].includes(selectedFile.type)) {
        setError("Only PNG files are allowed");
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
    formData.append("amount", amount);
    formData.append("file", file);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/deposit/upload/${user._id}-${user.wallet._id}-LTC-${user.email}-${Date.now()}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (!response.ok) {
        setResponse({
          message: "Network response was not ok",
          statusCode: 403,
        });
      }
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setResponse({
        message: "An error occured, please try again later",
        statusCode: 403,
      });
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  useEffect(() => {
    if (response?.statusCode === 201) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [response]);
  useEffect(() => {
    const fetchImg = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API}/deposits/load-img/LTC`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          setResponse(response.message);
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImgURL(imageUrl);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchImg();
  }, []);
  return (
    <section className="bg-primary-blue">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 mx-auto mb-5 gap-5">
        <form className="w-full max-w-5xl vessel deposit">
          <div className="flex justify-center mx-auto deposit">{LTC}</div>
          <div className="flex items-center justify-center my-6 deposit">
            <p className="w-3/4 pb-4 font-medium text-center text-accent-green capitalize border-b-2 border-accent-green">
              Litecoin
            </p>
          </div>
          <Typography
            as="span"
            className="inline text-white text-center deposit"
          >
            {infoIcon}
            {Lorem.depositPrompt}
          </Typography>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
            <div className="lg:h-60 w-full deposit">
              {imgURL ? (
                <img
                  src={imgURL}
                  alt="QR CODE"
                  className="h-full w-full object-contain"
                />
              ) : (
                QRCode
              )}
            </div>
            <div className="lg:h-auto w-full">
              <DepositAddress network="LTC" />
              <div className="relative flex items-center mt-4 auth">
                <span className="absolute mx-3 text-gray-400">{lockIcon}</span>

                <input
                  type="text"
                  className="block w-full"
                  name="amount"
                  placeholder="0.00"
                  onChange={handleAmountChange}
                  value={amount}
                  required
                />
              </div>
              {convert && (
                <p className="text-accent-green text-sm">{`${convert} USD`}</p>
              )}
              {amount === "" && (
                <p className="text-accent-red">Amount cannot be empty</p>
              )}
              {parseFloat(amount) === 0 && (
                <p className="text-accent-red">
                  Amount must be greater than zero
                </p>
              )}
              <div className="mt-6 flex flex-col gap-4">
                {/* <div className="flex flex-row justify-between p-3 mt-2 bg-inherit border border-secondary-blue rounded-lg text-white">
                  {dropfileIcon}
                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/png"
                    className="opacity-0"
                    onChange={handleFileChange}
                  />
                  <h2 className="capitalize">Upload reciept</h2>
                </div> */}
                {error && <p className="text-accent-red">{error}</p>}
                {fileName && (
                  <p className="text-accent-change-green">{fileName}</p>
                )}
                {amount !== "" && (
                  <button
                    type="submit"
                    onClick={handleUpload}
                    // disabled={!file}
                    fullWidth
                    className={`w-full px-6 py-3 text-md font-bold tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 disabled:hidden uppercase deposit ${parseFloat(amount) === 0 ? `hidden` : `block`}`}
                  >
                    proceed
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
        {response?.message && (
          <FormError err={response.message} code={response.statusCode} />
        )}
        {redirect && <Navigate to="/genesisio/records" />}
      </div>
    </section>
  );
};

export default DepositLTC;

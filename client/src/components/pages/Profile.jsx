import {
  dateIcon,
  dropfileIcon,
  locationIcon,
  phoneIcon,
  ProfileIcon,
  workIcon,
} from "../../assets/utilities";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { Option, Select } from "@material-tailwind/react";
import FormError from "../subcomponents/FormError";
import { Controller, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { convertISOToDate, isoToLocaleDateString } from "../../assets/utils";
const Profile = () => {
  const { user } = useContext(AuthContext);
  const [imgURL, setImgURL] = useState(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 3 * 1024 * 1024) {
        // 3 MB in bytes
        setError("File size must be less than 3 MB");
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
  const updateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("_id", user?._id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/profiles/img/${user.email}`,
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
      const res = await response.json();
      setResponse(res);
    } catch (error) {
      setResponse({ message: `An error occured`, statusCode: 403 });
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  useEffect(() => {
    const fetchImg = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API}/profiles/img/${user?.email}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.message}`);
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
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullname: user?.fullname,
      phoneNumber: user?.phone && String(user.phone),
      occupation: user?.occupation,
      gender: user?.gender,
      dob: convertISOToDate(user?.dob),
      city: user?.address.city,
      state: user?.address.state,
      country: user?.address.country,
    },
  });
  const onSubmit = async (x) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/profile/update/${user?._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(x),
        }
      );
      if (!response.ok) {
        setResponse({
          message: "Network response was not ok",
          statusCode: 403,
        });
        throw new Error(`Error: ${response.status} ${response.message}`);
      }
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setResponse({
        message: `There was a problem updating profile`,
        statusCode: 403,
      });
      console.error("There was a problem updating profile:", error);
    }
  };
  return (
    <section className="bg-primary-blue">
      <div className="flex flex-col min-h-screen mx-auto gap-5 my-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-5">
          <div className="w-full bg-inherit md:flex md:items-center md:justify-between gap-5">
            {imgURL && (
              <img
                className="h-40 w-1/2 rounded-xl object-cover md:h-[30rem] md:w-80 lg:h-[30rem] lg:w-[26rem]"
                src={imgURL}
                alt="Profile photo"
              />
            )}
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-topic text-white">
                {user.fullname}
              </h1>
              <p className="text-white font-normal">{user.email}</p>
              <div className="flex flex-row justify-between p-3 bg-inherit border border-secondary-blue rounded-lg text-white">
                {dropfileIcon}
                <input
                  name="file"
                  id="dropzone-file"
                  type="file"
                  accept="image/png"
                  className="opacity-0 w-1/6 md:1/12 lg:w-1/3 cursor-pointer"
                  onChange={handleFileChange}
                />
                <h2 className="capitalize md:hidden lg:block">Upload photo</h2>
              </div>
              <button
                type="submit"
                onClick={updateProfile}
                disabled={!file}
                fullWidth
                className={`w-full px-6 py-3 text-md font-bold tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 disabled:hidden uppercase`}
              >
                update photo
              </button>
              {error && <p className="text-accent-red">{error}</p>}
              {fileName && (
                <p className="text-accent-change-green">{fileName}</p>
              )}
              {response && (
                <FormError err={response.message} code={response.statusCode} />
              )}
            </div>
          </div>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col lg:flex-row justify-between gap-5">
              <div className="relative flex items-center w-full">
                <span className="absolute mr-2 text-gray-400">
                  {ProfileIcon}
                </span>
                <input
                  type="text"
                  {...register("fullname", {
                    required: "full name is required",
                    minLength: {
                      value: 2,
                      message: "Full name must be at least words",
                    },
                  })}
                  className="block w-full"
                  placeholder="Full name"
                />
                {errors.fullname && (
                  <span className="text-red-500">
                    {errors.fullname.message}
                  </span>
                )}
              </div>
              <div className="relative flex items-center w-full">
                <span className="absolute mx-1 text-gray-400">{phoneIcon}</span>
                <input
                  type="text"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: "Invalid phone number format",
                    },
                  })}
                  className="block w-full"
                  placeholder="+1 635 211"
                />
                {errors.phoneNumber && (
                  <span className="text-red-500">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
              <div className="relative flex items-center w-full">
                <span className="absolute mx-1 text-gray-400">{workIcon}</span>
                <input
                  type="text"
                  {...register("occupation", {
                    required: "Occupation is required",
                    minLength: {
                      value: 2,
                      message: "Occupation must be at least 2 characters long",
                    },
                  })}
                  className="block w-full"
                  placeholder="Occupation"
                />
                {errors.occupation && (
                  <span className="text-red-500">
                    {errors.occupation.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-5">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Gender"
                    variant="standard"
                    className="bg-inherit text-white border-0 border-secondary-blue border-b-2 text-base font-normal caret-accent-green invalid:border-accent-red focus:border-0 invalid:text-accent-red focus:border-b-accent-green focus:outline-none focus:ring-0 focus:invalid:border-accent-red focus:invalid:ring-accent-red disabled:border-gray-600 disabled:cursor-none"
                  >
                    <Option
                      value="male"
                      className="hover:bg-accent-green hover:text-white"
                    >
                      Male
                    </Option>
                    <Option
                      value="female"
                      className="hover:bg-accent-green hover:text-white"
                    >
                      Female
                    </Option>
                    <Option
                      value="rather not say"
                      className="hover:bg-accent-green hover:text-white"
                    >
                      Rather not say
                    </Option>
                  </Select>
                )}
              />
              <div className="relative flex items-center w-full border border-secondary-blue rounded-lg p-1">
                <span className="absolute mx-1 text-gray-400">{dateIcon}</span>
                <input
                  type="date"
                  {...register("dob", {
                    required: "Date of birth is required",
                    validate: (value) => {
                      const today = new Date();
                      const selectedDate = new Date(value);
                      return (
                        selectedDate < today ||
                        "Date of birth must be in the past"
                      );
                    },
                  })}
                  className="block w-full"
                  placeholder="Date of birth"
                />
                {errors.dob && (
                  <span className="text-red-500">{errors.dob.message}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-5">
              <div className="relative flex items-center w-full">
                <span className="absolute mx-1 text-gray-400">
                  {locationIcon}
                </span>
                <input
                  type="text"
                  {...register("city", {
                    required: "City is required",
                    minLength: {
                      value: 2,
                      message: "City must be at least 2 characters long",
                    },
                  })}
                  className="block w-full"
                  placeholder="City"
                />
                {errors.city && (
                  <span className="text-red-500">{errors.city.message}</span>
                )}
              </div>

              <div className="relative flex items-center w-full">
                <span className="absolute mx-1 text-gray-400">
                  {locationIcon}
                </span>
                <input
                  type="text"
                  {...register("state", {
                    required: "State is required",
                    minLength: {
                      value: 2,
                      message: "State must be at least 2 characters long",
                    },
                  })}
                  className="block w-full"
                  placeholder="State"
                />
                {errors.state && (
                  <span className="text-red-500">{errors.state.message}</span>
                )}
              </div>

              <div className="relative flex items-center w-full">
                <span className="absolute mx-1 text-gray-400">
                  {locationIcon}
                </span>
                <input
                  type="text"
                  {...register("country", {
                    required: "Country is required",
                    minLength: {
                      value: 2,
                      message: "Country must be at least 2 characters long",
                    },
                  })}
                  className="block w-full"
                  placeholder="Country"
                />
                {errors.country && (
                  <span className="text-red-500">{errors.country.message}</span>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              fullWidth
              className={`w-full px-6 py-3 text-md font-bold tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 disabled:hidden uppercase`}
            >
              {isSubmitting ? `Updating profile` : ` update profile`}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Profile;

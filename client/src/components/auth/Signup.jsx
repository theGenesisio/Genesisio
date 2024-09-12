import React, { useState } from "react";
import {
  capitalizeWords,
  gsapAnimationBase,
  isValidPassword,
  logoSVG,
  passwordMatch,
  validateFullname,
} from "../../assets/utils";
import { Link, Navigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { lockIcon, mailIcon, usericon } from "../../assets/utilities";
import { useForm } from "react-hook-form";
import FormError from "../subcomponents/FormError";
const Signup = () => {
  gsapAnimationBase(".auth", 2);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();
  const [serverResponse, setserverResponse] = useState({
    statusCode: null,
    message: null,
  });

  const submitHandler = async (data) => {
    const { email, password, fullname } = data;
    const payload = {
      email: email,
      password: password,
      fullname: capitalizeWords(fullname),
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/auth/register`,
        {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
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
          message:
            "Unexpected occurence during registration, please try again later",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setserverResponse({
        message: "An error occurred. Please try again later.",
      });
    }
  };
  return (
    <section className="bg-primary-blue ">
      <div className="container flex flex-col gap-2 items-center justify-center min-h-screen px-6 mx-auto">
        <form
          className="w-full max-w-md vessel auth"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex justify-center mx-auto auth">
            <Link to="/">
              <img className="w-auto h-10" src={logoSVG} alt="Genesisio logo" />
            </Link>
          </div>

          <div className="flex items-center justify-center mt-6 auth">
            <Link
              to="/auth/sign-in"
              className="w-1/3 pb-4 font-medium text-center text-gray-400 capitalize border-b border-gray-400"
            >
              sign in
            </Link>

            <Link
              href="/auth/sign-up"
              className="w-1/3 pb-4 font-medium text-center text-accent-green capitalize border-b-2 border-accent-green"
            >
              sign up
            </Link>
          </div>

          <div className="relative flex items-center auth mt-8">
            <span className="absolute">{usericon}</span>
            <input
              {...register("fullname", {
                required: "Fullname is required",
                maxLength: { value: 60, message: "Max 60 chars" },
                minLength: { value: 5, message: "Min 5 chars" },
                validate: (value) => validateFullname(value),
              })}
              type="text"
              className="block w-full"
              placeholder="fullname"
              name="full name"
            />
          </div>
          {errors.fullname && <FormError err={errors.fullname.message} />}

          <div className="relative flex items-center auth mt-6">
            <span className="absolute mx-3 text-gray-400">{mailIcon}</span>

            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: `/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/`,
                  message: "Invalid email format",
                },
              })}
              type="email"
              className="block w-full"
              placeholder="Email address"
              name="email"
            />
          </div>
          {errors.email && <FormError err={errors.email.message} />}

          <div className="relative flex items-center auth mt-4">
            <span className="absolute mx-3 text-gray-400">{lockIcon}</span>

            <input
              {...register("password", {
                required: "Password is required",
                validate: (value) => isValidPassword(value),
                maxLength: { value: 60, message: "Max 60 chars" },
                minLength: { value: 8, message: "Min 8 chars" },
              })}
              type="password"
              className="block w-full"
              placeholder="Password"
              name="password"
            />
          </div>
          {errors.password && <FormError err={errors.password.message} />}

          <div className="relative flex items-center auth mt-4">
            <span className="absolute mx-3 text-gray-400">{lockIcon}</span>

            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm password",
                maxLength: { value: 60, message: "Max 60 chars" },
                minLength: { value: 8, message: "Min 8 chars" },
                validate: (value) =>
                  passwordMatch(value, getValues("password")),
              })}
              className="block w-full"
              placeholder="Confirm Password"
              name="confirmPassword"
            />
          </div>
          {errors.confirmPassword && (
            <FormError err={errors.confirmPassword.message} />
          )}
          <div className="mt-6 text-center auth">
            <Typography as="span" className="font-semibold text-sm text-white">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                className="mr-2"
                {...register("terms", {
                  validate: (value) => (value ? true : false),
                })}
              />
              {`I hereby agree to the `}
              <Link to="/terms" className="text-accent-green hover:underline">
                Terms & Conditions
              </Link>
              {` by signing up.`}
            </Typography>
          </div>
          <div className="mt-6 auth">
            <button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 uppercase disabled:bg-gray-400"
            >
              {isSubmitting ? "Registering..." : "Create account"}
            </button>
            <div className="mt-6 text-center auth">
              <Link
                to="/auth/sign-in"
                className="text-sm text-accent-green hover:underline"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
        {serverResponse && (
          <FormError
            err={serverResponse.message}
            code={serverResponse.statusCode}
          />
        )}
        {serverResponse.statusCode === 200 && (
          <Navigate to="/auth/confirm-email"/>
        )}
      </div>
    </section>
  );
};
export default Signup;

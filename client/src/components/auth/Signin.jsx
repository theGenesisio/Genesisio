import React, { useState, useContext } from "react";
import {
  gsapAnimationBase,
  isValidPassword,
  logoSVG,
} from "../../assets/utils";
import { Link, Navigate } from "react-router-dom";
import { lockIcon, mailIcon } from "../../assets/utilities";
import { useForm } from "react-hook-form";
import FormError from "../subcomponents/FormError";
import { AuthContext } from "../../AuthProvider";
const Signin = () => {
  const { setUser } = useContext(AuthContext);
  gsapAnimationBase(".auth");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [serverResponse, setserverResponse] = useState({
    statusCode: null,
    message: null,
    user: null,
  });
  const submitHandler = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response) {
        const data = await response.json();
        setUser(data?.user);
        setserverResponse(data);
      } else if (!response) {
        setserverResponse((prev) => ({
          ...prev,
          message: "No response from server, please try again later",
        }));
      } else {
        setserverResponse((prev) => ({
          ...prev,
          message: "Unexpected occurence during login, please try again later",
        }));
      }
    } catch (error) {
      console.error("Error during login:", error);
      setserverResponse((prev) => ({
        ...prev,
        message: "An error occurred. Please try again later.",
      }));
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
              className="w-1/3 pb-4 font-medium text-center text-accent-green capitalize border-b-2 border-accent-green"
            >
              sign in
            </Link>

            <Link
              to="/auth/sign-up"
              className="w-1/3 pb-4 font-medium text-center text-gray-400 capitalize border-b border-gray-400"
            >
              sign up
            </Link>
          </div>
          <div className="relative flex items-center mt-6 auth">
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

          <div className="relative flex items-center mt-4 auth">
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

          <div className="mt-6 auth">
            <button
              fullWidth
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 uppercase disabled:bg-gray-400"
            >
              {isSubmitting ? "Signing you in..." : "Sign in"}
            </button>

            <div className="mt-6 text-center flex flex-row justify-between">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-accent-green hover:underline"
              >
                Forgot password?
              </Link>
              <Link
                to="/auth/sign-up"
                className="text-sm text-accent-green hover:underline"
              >
                Don't have an account?
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
          <Navigate to="/genesisio/"/>
        )}
      </div>
    </section>
  );
};
export default Signin;

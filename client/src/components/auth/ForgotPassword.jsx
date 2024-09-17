import React, { useEffect, useState } from "react";
import { gsapAnimationBase, logoSVG } from "../../assets/utils";
import { Link, Navigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { mailIcon } from "../../assets/utilities";
import FormError from "../subcomponents/FormError";
import { useForm } from "react-hook-form";
const ForgotPassword = () => {
  gsapAnimationBase(".auth");
  const [response, setResponse] = useState(null);
  const [navigate, setNavigate] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/auth/forgot-password`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setResponse({
          message: errorData.message,
          statusCode: response.status,
        });
      }
      const result = await response.json();
      setResponse(result);
    } catch (error) {
      setResponse({ message: "An error occurred", statusCode: 400 });
    }
  };

  useEffect(() => {
    if (response?.statusCode === 200) {
      const timer = setTimeout(() => {
        setNavigate(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [response]);

  if (navigate) {
    return <Navigate to="/auth/confirm-code" />;
  }

  return (
    <section className="bg-primary-blue ">
      <div className="container flex flex-col gap-2 items-center justify-center min-h-screen px-6 mx-auto auth">
        <form
          className="w-full max-w-md vessel"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex justify-center mx-auto auth">
            <Link to="/">
              <img className="w-auto h-10" src={logoSVG} alt="Genesisio logo" />
            </Link>
          </div>

          <div className="flex items-center justify-center mt-6 auth">
            <Link
              to="/auth/forgot-password"
              className="w-3/4 pb-4 font-medium text-center text-accent-green capitalize border-b-2 border-accent-green"
            >
              Forgot Password
            </Link>
          </div>
          <div className="relative flex items-center mt-4 auth">
            <span className="absolute mx-3 text-gray-400">{mailIcon}</span>

            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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

          <div className="mt-6 auth">
            <button
              fullWidth
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 uppercase disabled:bg-gray-400"
            >
              {isSubmitting ? "Processing..." : "Request code"}
            </button>
            <Typography as="p" className="text-sm text-white mt-6 text-center">
              Remember password?
              <Link
                to="/auth/sign-in"
                className="text-sm font-medium text-accent-green hover:underline"
              >
                {` Sign in`}
              </Link>
            </Typography>
          </div>
        </form>
        {errors.root && <FormError err={errors.root.message} />}
      </div>
    </section>
  );
};

export default ForgotPassword;

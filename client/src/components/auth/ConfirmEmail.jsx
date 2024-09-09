import React, { useEffect, useState } from "react";
import { logoSVG } from "../../assets/utils";
import { Link, Navigate } from "react-router-dom";
import { lockIcon, mailIcon } from "../../assets/utilities";
import { gsapAnimationBase } from "../../assets/utils";
import { useForm } from "react-hook-form";
import FormError from "../subcomponents/FormError";
const ConfirmEmail = () => {
  gsapAnimationBase(".auth");
  const [show, setshow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setshow(!show);
    }, 100000);
    return () => {
      setshow;
    };
  }, []);
  const [serverResponse, setserverResponse] = useState({
    statusCode: null,
    message: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const submitHandler = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/auth/complete-registration`,
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
      <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
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
              className="w-3/4 pb-4 font-medium text-center text-accent-green capitalize border-b-2 border-accent-green"
            >
              Code sent to said email address
            </Link>
          </div>
          <div className="relative flex items-center mt-4 auth">
            <span className="absolute mx-3 text-gray-400">{lockIcon}</span>

            <input
              type="text"
              className="block w-full"
              name="otp"
              placeholder="000000"
              {...register("otp", {
                required: "Enter code sent to email",
                maxLength: { value: 6, message: "Max 6 chars" },
              })}
            />
          </div>
          {errors.otp && <FormError err={errors.otp.message} />}
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

          <div className="mt-6 auth">
            <button
              fullWidth
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 uppercase disabled:bg-gray-400"
            >
              {isSubmitting ? "Processing..." : "Confirm Email Address"}
            </button>
            <div className="mt-6 text-center flex flex-row justify-between">
              {!isSubmitting && show && (
                <Link
                  to="/api/auth/code"
                  className="text-sm font-medium text-accent-green hover:underline"
                >
                  Request new code
                </Link>
              )}
              <Link
                to="/auth/sign-up"
                className="text-sm text-accent-green hover:underline"
              >
                Back to sign up?
              </Link>
            </div>
          </div>
        </form>
        {errors.root && <FormError err={errors.root.message} />}
        {serverResponse.statusCode === 201 && (
          <Navigate to="/auth/sign-in"/>
        )}
      </div>
    </section>
  );
};
export default ConfirmEmail;

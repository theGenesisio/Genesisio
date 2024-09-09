import React, { useEffect, useState } from "react";
import { isValidPassword, logoSVG, passwordMatch } from "../../assets/utils";
import { Link, Navigate } from "react-router-dom";
import { lockIcon, mailIcon } from "../../assets/utilities";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useForm } from "react-hook-form";
import FormError from "../subcomponents/FormError";

const ConfirmCode = () => {
  const [show, setshow] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setshow(!show);
    }, 100000);
    return () => {
      setshow;
    };
  }, []);

  useGSAP(() => {
    gsap.from(".auth", {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 1,
      stagger: {
        amount: 2,
        ease: "power1.inOut",
        grid: [2, 1],
        axis: "y",
        from: "start",
      },
    });
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
 const submitHandler = async (data) => {
  console.log(data);
  
   try {
     const response = await fetch(
       `${import.meta.env.VITE_APP_API}/auth/password-reset`,
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
         message: errorData.message || "An error occurred",
         statusCode: response.status,
       });
       throw new Error(`Network response was not ok: ${response.statusText}`);
     }
     const result = await response.json();
     setResponse(result);
   } catch (error) {
     console.error("Error:", error); 
     setResponse({ message: "An error occurred", statusCode: 400 });
   }
 };

  useEffect(() => {
    if (response?.statusCode === 200) {
      const timer = setTimeout(() => {
        <Navigate to="/auth/sign-in" />;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [response]);
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
              to="/auth/confirm-code"
              className="w-3/4 pb-4 font-medium text-center text-accent-green capitalize border-b-2 border-accent-green"
            >
              Reset Password
            </Link>
          </div>
          <div className="relative flex items-center mt-4 auth">
            <span className="absolute mx-3 text-gray-400">{lockIcon}</span>
            <input
              type="text"
              className="block w-full"
              placeholder="000000"
              {...register("code", {
                required: "Enter code sent to email",
              })}
            />
          </div>
          {errors.code && <FormError err={errors.code.message} />}
          <div className="relative flex items-center mt-4 auth">
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
              placeholder="Enter email used for OTP"
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
              placeholder="New Password"
            />
          </div>
          {errors.password && <FormError err={errors.password.message} />}

          <div className="relative flex items-center mt-4 auth">
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
              placeholder="Confirm New Password"
            />
          </div>
          {errors.confirmPassword && (
            <FormError err={errors.confirmPassword.message} />
          )}
          <div className="mt-6 auth">
            <button
              fullWidth
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 uppercase disabled:bg-gray-400"
            >
              {isSubmitting ? "Reseting..." : "Reset Password"}
            </button>
            <div className="mt-6 text-center flex flex-row justify-between">
              {!isSubmitting && show && (
                <Link
                // change
                  to="/api/auth/code"
                  className="text-sm font-medium text-accent-green hover:underline"
                >
                  Request new code
                </Link>
              )}
              <Link
                to="/auth/sign-in"
                className="text-sm text-accent-green hover:underline"
              >
                Remember password? Sign in
              </Link>
            </div>
          </div>
        </form>
        {errors.root && <FormError err={errors.root.message} />}
      </div>
    </section>
  );
};
export default ConfirmCode;

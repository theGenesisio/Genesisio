import React, { useState, useContext } from "react";
import {
  gsapAnimationBase,
  isValidPassword,
  logoSVG,
} from "../../assets/utils";
import { Link, useNavigate } from "react-router-dom";
import { lockIcon, usericon } from "../../assets/utilities";
import { useForm } from "react-hook-form";
import FormError from "../subcomponents/FormError";
import { AdminContext } from "./subCmponents/AdminContext";
const Signin = () => {
  const { setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  gsapAnimationBase(".auth");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [serverResponse, setserverResponse] = useState({
    statusCode: null,
    message: null,
    admin: null,
  });
  const setNullAdmin = () => {
    setAdmin(null);
    window.localStorage.setItem("genesisioStoredAdmin", JSON.stringify(null));
  };
  const submitHandler = async (data) => {
    const payload = {
      username: data.username,
      password: data.password,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_ADMIN}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        setserverResponse((prev) => ({
          ...prev,
          message: "No response from server, please try again later",
        }));
        setNullAdmin();
      }
      const data = await response.json();
      setserverResponse(data);
      if (data?.admin) {
        setAdmin(data?.admin);
        window.localStorage.setItem("adminSession", JSON.stringify(true));
        window.localStorage.setItem(
          "genesisioStoredAdmin",
          JSON.stringify(data?.admin)
        );
        data?.statusCode === 200 && navigate("/admin/dashboard");
      } else {
        setNullAdmin();
      }
    } catch (error) {
      console.error("Error during login:", error);
      setserverResponse((prev) => ({
        ...prev,
        message: "An error occurred. Please try again later." || error.message,
      }));
      setNullAdmin();
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
              to="/admin/auth/sign-in"
              className="w-1/3 pb-4 font-medium text-center text-accent-green capitalize border-b-2 border-accent-green"
            >
              admin login
            </Link>
          </div>
          <div className="relative flex items-center mt-6 auth">
            <span className="absolute text-gray-400">{usericon}</span>

            <input
              {...register("username", {
                required: "Username is required",
              })}
              type="text"
              className="block w-full"
              placeholder="Admin Username"
              name="username"
            />
          </div>
          {errors.username && <FormError err={errors.username.message} />}

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
              {isSubmitting ? "Logging you in..." : "Log in"}
            </button>
          </div>
        </form>
        {serverResponse && (
          <FormError
            err={serverResponse.message}
            code={serverResponse.statusCode}
          />
        )}
      </div>
    </section>
  );
};
export default Signin;

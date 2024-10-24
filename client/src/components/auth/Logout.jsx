import React, { useState } from "react";
import { logoSVG } from "../../assets/utils";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FormError from "../subcomponents/FormError";
import { useForm } from "react-hook-form";
const Logout = () => {
  const [serverResponse, setserverResponse] = useState({
    statusCode: null,
    message: null,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const setNullUser = () => {
    window.localStorage.setItem("IsSessionValid", JSON.stringify(false));
    window.localStorage.removeItem("genesisio_user");
  };
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        setserverResponse({
          message: "No response from server, please try again later",
        });
      }
      const data = await response.json();
      setserverResponse(data.message);
      setNullUser();
      navigate("/auth/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
      setserverResponse({
        message: "An error occurred. Please try again later.",
      });
    }
  }

  return (
    <section className="bg-primary-blue ">
      <div className="container flex flex-col gap-2 items-center justify-center min-h-screen px-6 mx-auto">
        <form
          className="w-full max-w-md vessel"
          onSubmit={handleSubmit(handleLogout)}
        >
          <div className="flex justify-center mx-auto">
            <Link to="/">
              <img className="w-auto h-10" src={logoSVG} alt="Genesisio logo" />
            </Link>
          </div>

          <div className="flex justify-center mt-6">
            <p className="w-3/4 pb-4 font-semibold text-center text-accent-green capitalize border-b-2 border-accent-green">
              You are about to logout!
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <Link to="/genesisio/dashboard">
              <button
                fullWidth
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-accent-green rounded-lg hover:shadow-sm hover:shadow-accent-green focus:outline-none focus:ring focus:ring-accent-green focus:ring-opacity-50 uppercase"
              >
                Continue Trading
              </button>
            </Link>
            <button
              fullWidth
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-white font-medium text-sm bg-transparent"
            >
              {isSubmitting ? "Logging out sadly..." : "Logout "}
            </button>
          </div>
        </form>
        {serverResponse && (
          <FormError
            err={serverResponse.message}
            code={serverResponse.statusCode}
          />
        )}
        {serverResponse.statusCode === 200 && <Navigate to="/" />}
      </div>
    </section>
  );
};
export default Logout;

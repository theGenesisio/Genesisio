import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-inherit">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-accent-green mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-accent-green text-white rounded-md hover:bg-accent-change-green"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

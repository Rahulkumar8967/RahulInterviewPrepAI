import React from "react";

const SpinnerLoader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full py-4">
      <svg
        className="animate-spin h-10 w-10 text-blue-600"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="text-gray-300"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        />
        <circle
          className="text-blue-600"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray="90"
          strokeDashoffset="60"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default SpinnerLoader;

import React from "react";

const Input = ({ value, onChange, label, placeholder, type }) => {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;

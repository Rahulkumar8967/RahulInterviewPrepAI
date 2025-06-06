import React from "react";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5 overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300 relative group max-w-md mx-auto transform hover:scale-[1.02]"
      onClick={onSelect}
      style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.12)" }}
    >
      <div
        className="rounded-xl p-6 cursor-pointer relative flex items-start gap-5"
        style={{
          background: colors.bgcolor,
          boxShadow: "inset 0 0 12px rgba(0,0,0,0.12)",
          borderRadius: "1rem",
        }}
      >
        <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-2xl font-extrabold text-gray-900 select-none">
            {getInitials(role)}
          </span>
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                {role}
              </h2>
              <p className="text-base font-medium text-gray-800 mt-1">
                {topicsToFocus}
              </p>
            </div>
          </div>
        </div>

        <button
          className="hidden group-hover:flex items-center gap-2 text-sm text-red-600 font-semibold bg-red-100 px-4 py-1 rounded-full border border-red-300 hover:bg-red-200 hover:border-red-400 transition cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label="Delete summary card"
        >
          Delete
        </button>
        
      </div>

      <div className="px-4 pt-5 pb-4">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="text-xs font-semibold text-gray-900 px-4 py-1 border border-gray-300 rounded-full bg-gray-100 shadow-sm">
            Experience: {experience} {experience === 1 ? "Year" : "Years"}
          </div>

          <div className="text-xs font-semibold text-gray-900 px-4 py-1 border border-gray-300 rounded-full bg-gray-100 shadow-sm">
            {questions} Q&A
          </div>

          <div className="text-xs text-gray-500 italic">
            Last Updated: {lastUpdated}
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          {description ||
            `Interview prep focus for ${role} using ${topicsToFocus}`}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;

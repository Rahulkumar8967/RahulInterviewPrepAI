import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleExpand();
    }
  };

  return (
    <div className="bg-white rounded-2xl mb-6 p-5 shadow-md border border-gray-100 transition-all hover:shadow-lg cursor-pointer">
      <div className="flex items-start justify-between">
        {/* Question Title */}
        <div className="flex gap-3 items-start max-w-[85%]">
          <span className="text-sm font-bold text-cyan-600 pt-1">Q</span>
          <h3
            tabIndex={0}
            role="button"
            aria-expanded={isExpanded}
            aria-controls={`answer-content-${question}`}
            onClick={toggleExpand}
            onKeyDown={handleKeyDown}
            className="text-sm md:text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded  line-clamp-3 cursor-pointer"
          >
            {question}
          </h3>
        </div>

        {/* Icons */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <button
            onClick={onTogglePin}
            title={isPinned ? "Unpin question" : "Pin question"}
            aria-pressed={isPinned}
            className="text-gray-400 hover:text-cyan-600 transition-colors cursor-pointer"
          >
            {isPinned ? <LuPin className="text-cyan-600" /> : <LuPinOff />}
          </button>

          <button
            onClick={toggleExpand}
            title={isExpanded ? "Collapse answer" : "Expand answer"}
            aria-label={isExpanded ? "Collapse" : "Expand"}
            className="text-gray-400 hover:text-cyan-600 transition-transform cursor-pointer"
          >
            <LuChevronDown
              className={`transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Learn More Link */}
      <div className="mt-3 ml-7">
        <button
          onClick={onLearnMore}
          className="text-sm font-medium text-cyan-700 hover:underline flex items-center gap-1 cursor-pointer"
        >
          Learn More <LuSparkles className="text-cyan-500 cursor-pointer" />
        </button>
      </div>

      {/* Answer */}
      <div
        id={`answer-content-${question}`}
        ref={contentRef}
        style={{
          height: isExpanded ? height : 0,
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
        aria-hidden={!isExpanded}
        className="pt-4 text-sm text-gray-700"
      >
        {answer ? (
          <AIResponsePreview content={answer} />
        ) : (
          <p className="italic text-sm text-gray-400">No answer provided.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;

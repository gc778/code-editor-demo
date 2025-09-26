import React from "react";
import { Play, RotateCcw, Code, Trophy, Check, ChevronDown } from "lucide-react";

const Header = ({
  problem,
  isProblemSelectorOpen,
  setIsProblemSelectorOpen,
  problemSelectorRef,
  handleProblemChange,
  currentProblemId,
  PROBLEMS,
  resetCode,
  executeCode,
  isRunning,
  isSubmitting,
}) => {
  return (
    <header className="bg-white border-b px-4 py-2 shadow-sm flex items-center justify-between z-10">
      <div className="flex items-center gap-4">
        <Code className="w-7 h-7 text-blue-600" />
        <div className="relative" ref={problemSelectorRef}>
          <button
            onClick={() => setIsProblemSelectorOpen((prev) => !prev)}
            className="flex items-center justify-between w-64 bg-white border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors hover:bg-gray-50"
          >
            <span className="truncate">{problem.title}</span>
            <ChevronDown className={`w-4 h-4 ml-2 text-gray-500 transition-transform duration-200 ${isProblemSelectorOpen ? "rotate-180" : ""}`} />
          </button>
          {isProblemSelectorOpen && (
            <div className="absolute top-full mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1">
              <ul>
                {PROBLEMS.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => {
                      handleProblemChange(p.id);
                      setIsProblemSelectorOpen(false);
                    }}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer flex justify-between items-center text-gray-800"
                  >
                    <span>{p.title}</span>
                    {p.id === currentProblemId && <Check className="w-4 h-4 text-blue-600" />}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={resetCode} className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded hover:bg-gray-100 transition-colors">
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <button
          onClick={() => executeCode(false)}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-1.5 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          <Play className="w-4 h-4" /> {isRunning && !isSubmitting ? "Running..." : "Run"}
        </button>
        <button
          onClick={() => executeCode(true)}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          <Trophy className="w-4 h-4" /> {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </header>
  );
};

export default Header;

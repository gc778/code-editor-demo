import React from "react";
import { Lock, Unlock } from "lucide-react";

const LeftPanel = ({ problem, activeTab, setActiveTab, solvedProblems }) => {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b">
        {["description", "hints", "solutions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "solutions" ? solvedProblems.has(problem.id) ? <Unlock className="w-4 h-4 inline-block mr-1" /> : <Lock className="w-4 h-4 inline-block mr-1" /> : null}
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === "description" && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-800">{problem.title}</h2>
            <div className="flex items-center gap-3">
              <span
                className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                  problem.difficulty === "Easy" ? "bg-green-100 text-green-800" : problem.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                }`}
              >
                {problem.difficulty}
              </span>
              <span className="text-sm text-gray-500">Acceptance: {problem.acceptanceRate}</span>
            </div>
            <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">{problem.description}</p>
            <div>
              {problem.examples.map((ex, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg border my-3">
                  <p className="font-semibold text-sm mb-2">Example {i + 1}:</p>
                  <div className="font-mono text-xs space-y-1">
                    <p>
                      <strong className="text-gray-600">Input:</strong> {ex.input}
                    </p>
                    <p>
                      <strong className="text-gray-600">Output:</strong> {ex.output}
                    </p>
                    {ex.explanation && (
                      <p>
                        <strong className="text-gray-600">Explanation:</strong> {ex.explanation}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold text-md mb-2">Constraints</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {activeTab === "hints" && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">Hints</h3>
            {problem.hints.map((hint, i) => (
              <div key={i} className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                <p className="text-sm text-gray-700">{hint}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === "solutions" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Solution</h3>
            {solvedProblems.has(problem.id) ? (
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="p-3 bg-gray-800 text-gray-300 text-xs border-b border-gray-700">JavaScript Solution</div>
                <pre className="p-4 text-sm text-white overflow-x-auto">
                  <code>{problem.solution}</code>
                </pre>
              </div>
            ) : (
              <div className="text-center text-gray-500 p-10 bg-gray-50 rounded-lg">
                <Lock className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                <p>You must solve the problem first to view the solution.</p>
                <p className="text-xs mt-1">Pass all test cases by submitting your code.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftPanel;

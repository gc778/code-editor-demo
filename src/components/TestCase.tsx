import { Check, X, Clock } from "lucide-react";
import type { TestCase, TestResult } from "../domain/types";

interface TestCaseProps {
  testCase: TestCase;
  result?: TestResult;   // may be undefined while running
  index: number;
  isRunning: boolean;
}

const TestCaseItem = ({ testCase, result, index, isRunning }: TestCaseProps) => {
  const getStatusIcon = () => {
    if (isRunning && !result) return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />;
    if (!result) return <Clock className="w-4 h-4 text-gray-400" />;
    if (result.passed) return <Check className="w-4 h-4 text-green-500" />;
    return <X className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="border bg-white rounded-lg p-3 mb-2">
      <div className="flex items-center gap-2 mb-2">
        {getStatusIcon()}
        <span className="font-semibold text-sm text-gray-700">Test Case {index + 1}</span>
      </div>
      <div className="space-y-2 text-xs">
        <div className="font-mono bg-gray-50 p-2 rounded">
          <strong className="text-gray-500">Input:</strong> {JSON.stringify(testCase.input)}
        </div>
        <div className="font-mono bg-gray-50 p-2 rounded">
          <strong className="text-gray-500">Expected:</strong> {JSON.stringify(testCase.expected)}
        </div>
        {result && (
          <div className={`font-mono p-2 rounded ${result.passed ? "bg-green-50" : "bg-red-50"}`}>
            <strong className="text-gray-500">Output:</strong> {JSON.stringify(result.output)}
          </div>
        )}
        {result?.error && (
          <div className="font-mono bg-red-100 p-2 rounded text-red-700">
            <strong>Error:</strong> {result.error}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCaseItem;

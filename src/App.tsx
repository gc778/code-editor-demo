import { useState, useEffect, useMemo, useRef } from "react";
import { Play, Clock } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { PROBLEMS } from "./data/Problems.ts"; // Array of objects representing data related to each problem.
import { workerCode } from "./worker/WebWorker.js"; // Starting code for the webworker.
import CustomConfetti from "./components/CustomConfetti.js"; // Submition selebration effect.
import CodeEditor from "./components/CodeEditor.js"; // Code edditor component.
import TestCaseItem from "./components/TestCase.js"; // Test case component
import Header from "./components/Header.js"; // Header component.
import LeftPanel from "./components/LeftPanel.js"; // Left panel component which contains problem description, hints and solutions.
import type { TestResult, WorkerMessage, TabName } from "./domain/types";

const LeetCodeEditor = () => {
  const [currentProblemId, setCurrentProblemId] = useState<number>(PROBLEMS[0].id);
  const [code, setCode] = useState<string>(PROBLEMS[0].starterCode);
  const [output, setOutput] = useState<string>("");
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [activeTab, setActiveTab] = useState<TabName>("description");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isProblemSelectorOpen, setIsProblemSelectorOpen] = useState<boolean>(false);
  const [solvedProblems, setSolvedProblems] = useState<Set<number>>(new Set());

  const problemSelectorRef = useRef<HTMLDivElement | null>(null);

  const problem = useMemo(
    () => PROBLEMS.find((p) => p.id === currentProblemId) ?? PROBLEMS[0],
    [currentProblemId]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (problemSelectorRef.current && !problemSelectorRef.current.contains(target)) {
        setIsProblemSelectorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCode(problem.starterCode);
    setOutput("");
    setTestResults([]);
    setActiveTab("description");
  }, [problem]);

  const handleProblemChange = (id: number | string) => {
    setCurrentProblemId(Number(id));
  };

  const resetCode = () => {
    setCode(problem.starterCode);
    setOutput("");
    setTestResults([]);
  };

  const executeCode = (isSubmission: boolean) => {
    setIsRunning(true);
    if (isSubmission) setIsSubmitting(true);

    setOutput("Running tests...");
    setTestResults([]);

    const worker = new Worker(URL.createObjectURL(new Blob([workerCode], { type: "application/javascript" })));

    worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const { type, payload } = event.data;
      if (type === "progress" || type === "complete") {
        const results = payload.results as TestResult[];
        setTestResults(results);
        const passedCount = results.filter((r: TestResult) => r.passed).length;
        const totalCount = results.length;
        setOutput(`${passedCount}/${totalCount} test cases passed.`);

        if (type === "complete") {
          const allPassed = passedCount === totalCount;
          if (isSubmission) {
            if (allPassed) {
              setOutput(`🎉 Accepted! All ${totalCount} test cases passed.`);
              setSolvedProblems((prev) => new Set(prev).add(problem.id));
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 5000);
            } else {
              setOutput(`❌ Wrong Answer. ${passedCount}/${totalCount} test cases passed.`);
            }
          }
          setIsRunning(false);
          setIsSubmitting(false);
          worker.terminate();
        }
      } else if (type === "error") {
        setOutput(`❌ Runtime Error: ${payload.error}`);
        setIsRunning(false);
        setIsSubmitting(false);
        worker.terminate();
      }
    };

    worker.onerror = (error: ErrorEvent) => {
      setOutput(`❌ Worker Error: ${error.message}`);
      setIsRunning(false);
      setIsSubmitting(false);
      worker.terminate();
    };

    worker.postMessage({
      code,
      testCases: problem.testCases,
      functionName: problem.functionName,
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 font-sans">
      <CustomConfetti active={showConfetti} />
      <Header
        problem={problem}
        isProblemSelectorOpen={isProblemSelectorOpen}
        setIsProblemSelectorOpen={setIsProblemSelectorOpen}
        problemSelectorRef={problemSelectorRef}
        handleProblemChange={handleProblemChange}
        currentProblemId={currentProblemId}
        PROBLEMS={PROBLEMS}
        resetCode={resetCode}
        executeCode={executeCode}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
      />

      <PanelGroup direction="horizontal" className="flex-1 overflow-hidden">
        {/* Left Panel containing problem description, hints and solutions */}
        <Panel defaultSize={50} minSize={30}>
          <LeftPanel problem={problem} activeTab={activeTab} setActiveTab={setActiveTab} solvedProblems={solvedProblems} />
        </Panel>

        <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-blue-200 transition-colors" />

        {/* Right Panel: Code Editor and Output */}
        <Panel defaultSize={50} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={60} minSize={20}>
              <div className="h-full flex flex-col bg-[#1e1e1e]">
                <div className="bg-gray-800 text-white px-4 py-2 text-sm font-semibold border-b border-gray-700">JavaScript</div>
                <div className="flex-1 overflow-hidden">
                <CodeEditor value={code} onChange={setCode} language="javascript" />
                </div>
              </div>
            </Panel>

            <PanelResizeHandle className="h-2 bg-gray-200 hover:bg-blue-200 transition-colors" />

            <Panel defaultSize={40} minSize={20}>
              <div className="h-full flex flex-col bg-white">
                <div className="p-3 border-b">
                  <span className="font-semibold text-sm text-gray-700">Output</span>
                </div>
                <div className="flex-1 overflow-y-auto p-3">
                  {testResults.length > 0 ? (
                    <div>
                      <div className="p-3 mb-3 bg-gray-50 rounded text-sm font-semibold">{output}</div>
                      {problem.testCases.map((tc, i) => (
                        <TestCaseItem key={i} testCase={tc} result={testResults[i]} index={i} isRunning={isRunning} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 pt-10">
                      {isRunning ? (
                        <>
                          <Clock className="w-8 h-8 mx-auto mb-2 animate-spin text-gray-400" />
                          <p>Running your code...</p>
                        </>
                      ) : (
                        <>
                          <Play className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>Run or submit your code to see the output.</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default LeetCodeEditor;

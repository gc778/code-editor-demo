// used across the app
export type Difficulty = "Easy" | "Medium" | "Hard";
export type TabName = "description" | "hints" | "solutions";

// core problem and test case shapes
export interface TestCase<TInput = unknown, TExpected = unknown> {
    input: TInput;
    expected: TExpected;
  }

  export interface Example {
    input: string;
    output: string;
    explanation?: string;
  }

export interface Problem {
    id: number; // unify on number everywhere
    title: string;
    difficulty: Difficulty | string; // allow current string values
    acceptanceRate: string;
    description: string;
    constraints: string[];
    hints: string[];
    solution: string;
    testCases: TestCase[];
    starterCode: string;
    functionName: string;
    examples: Example[];
  }

// component prop types
export interface LeftPanelProps {
  problem: Problem;
  activeTab: TabName;
  setActiveTab: (tab: TabName) => void;
  solvedProblems: Set<number>;
}

  // execution / worker types
export interface TestResult {
    passed: boolean;
    output: unknown;
    error?: string | null;
  }

export type WorkerMessage =
  | { type: "progress"; payload: { results: TestResult[]; progress: number } }
  | { type: "complete"; payload: { results: TestResult[] } }
  | { type: "error"; payload: { error: string } };

export interface WorkerRequest {
    code: string;
    testCases: TestCase[];
    functionName: string;
  }

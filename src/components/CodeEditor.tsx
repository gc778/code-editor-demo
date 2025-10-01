import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (next: string) => void;
  language?: "javascript" | "typescript";
}

const CodeEditor = ({ value, onChange, language = "javascript" }: CodeEditorProps) => {
  return (
    <div className="h-full w-full bg-[#1e1e1e]">
      <Editor
        height="100%"
        value={value}
        defaultLanguage={language}
        onChange={(val) => onChange(val ?? "")}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true, 
        }}
      />
    </div>
  );
};

export default CodeEditor;

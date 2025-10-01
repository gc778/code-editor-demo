interface CodeEditorProps {
  value: string;
  onChange: (next: string) => void;
}

const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
  const lines = value.split("\n").length;
  const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1);

  return (
    <div className="flex h-full bg-[#1e1e1e]">
      <div className="p-2 bg-[#252526] text-gray-500 text-sm font-mono select-none text-right">
        {lineNumbers.map((num) => (
          <div key={num}>{num}</div>
        ))}
      </div>
      <textarea
        className="flex-1 font-mono text-sm p-2 bg-[#1e1e1e] text-gray-200 border-none outline-none resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor;

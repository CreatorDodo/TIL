"use client";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const language = className?.replace("language-", "") || "text";

  const handleCopy = () => {
    const text =
      typeof children === "string" ? children : String(children || "");
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-300 text-sm rounded-t-lg">
        <span className="font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
        >
          복사
        </button>
      </div>
      <pre
        className={`${className} p-4 bg-gray-900 text-gray-100 rounded-b-lg overflow-x-auto`}
        {...props}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

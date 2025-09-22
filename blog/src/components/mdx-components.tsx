import Link from "next/link";
import { ReactNode } from "react";
import { CodeBlock } from "./code-block";

// 인라인 코드 컴포넌트
function InlineCode({ children, ...props }: any) {
  return (
    <code
      className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  );
}

// 헤딩 컴포넌트 (앵커 링크 포함)
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children, id, ...props }: any) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const sizes = {
      1: "text-3xl font-bold mt-8 mb-4",
      2: "text-2xl font-bold mt-6 mb-3",
      3: "text-xl font-bold mt-5 mb-2",
      4: "text-lg font-bold mt-4 mb-2",
      5: "text-base font-bold mt-3 mb-2",
      6: "text-sm font-bold mt-2 mb-1",
    };

    return (
      <Tag id={id} className={`${sizes[level]} group`} {...props}>
        <Link href={`#${id}`} className="flex items-center">
          {children}
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
            #
          </span>
        </Link>
      </Tag>
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}

// 블록인용 컴포넌트
function Blockquote({ children, ...props }: any) {
  return (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </blockquote>
  );
}

// 테이블 컴포넌트
function Table({ children, ...props }: any) {
  return (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full border-collapse border border-gray-300 dark:border-gray-700"
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

function TableHead({ children, ...props }: any) {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
      {children}
    </thead>
  );
}

function TableRow({ children, ...props }: any) {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700" {...props}>
      {children}
    </tr>
  );
}

function TableCell({ children, ...props }: any) {
  return (
    <td
      className="px-4 py-2 border border-gray-300 dark:border-gray-700"
      {...props}
    >
      {children}
    </td>
  );
}

function TableHeaderCell({ children, ...props }: any) {
  return (
    <th
      className="px-4 py-2 border border-gray-300 dark:border-gray-700 font-semibold text-left"
      {...props}
    >
      {children}
    </th>
  );
}

// 링크 컴포넌트
function CustomLink({ href, children, ...props }: any) {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return (
      <Link
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:underline"
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (isAnchorLink) {
    return (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:underline"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline"
      {...props}
    >
      {children}
    </a>
  );
}

// 리스트 컴포넌트
function OrderedList({ children, ...props }: any) {
  return (
    <ol className="list-decimal list-inside space-y-2 my-4 pl-4" {...props}>
      {children}
    </ol>
  );
}

function UnorderedList({ children, ...props }: any) {
  return (
    <ul className="list-disc list-inside space-y-2 my-4 pl-4" {...props}>
      {children}
    </ul>
  );
}

function ListItem({ children, ...props }: any) {
  return (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  );
}

// 단락 컴포넌트
function Paragraph({ children, ...props }: any) {
  return (
    <p className="leading-relaxed my-4" {...props}>
      {children}
    </p>
  );
}

// MDX 컴포넌트 맵핑
export const mdxComponents = {
  // 헤딩
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),

  // 텍스트 요소
  p: Paragraph,

  // 코드
  pre: CodeBlock,
  code: InlineCode,

  // 인용
  blockquote: Blockquote,

  // 링크
  a: CustomLink,

  // 리스트
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,

  // 테이블
  table: Table,
  thead: TableHead,
  tbody: ({ children, ...props }: any) => <tbody {...props}>{children}</tbody>,
  tr: TableRow,
  td: TableCell,
  th: TableHeaderCell,

  // 구분선
  hr: ({ ...props }: any) => (
    <hr className="my-8 border-gray-300 dark:border-gray-700" {...props} />
  ),

  // 강조
  strong: ({ children, ...props }: any) => (
    <strong className="font-bold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: any) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
};

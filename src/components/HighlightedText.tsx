import { Fragment } from "react";

interface HighlightedTextProps {
  text: string;
  highlight: string;
  className?: string;
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function HighlightedText({ text, highlight, className = "" }: HighlightedTextProps) {
  const term = highlight.trim();

  if (!term || !text) {
    return <span className={className}>{text}</span>;
  }

  const splitter = new RegExp(`(${escapeRegExp(term)})`, "gi");
  const matcher = new RegExp(`^${escapeRegExp(term)}$`, "i");
  const parts = text.split(splitter);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        matcher.test(part) ? (
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </span>
  );
}

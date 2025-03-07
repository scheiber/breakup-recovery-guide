
import React from 'react';

interface HighlightedTextProps {
  text: string;
  highlight: string;
  className?: string;
}

export function HighlightedText({ text, highlight, className = "" }: HighlightedTextProps) {
  // If no search query or empty text, return the original text
  if (!highlight.trim() || !text) {
    return <span className={className}>{text}</span>;
  }

  // Escape special regex characters in the highlight string
  const sanitizedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Create a regex to find the highlight terms (case insensitive)
  const regex = new RegExp(`(${sanitizedHighlight})`, 'gi');
  
  // Split the text by the regex matches
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) => (
        regex.test(part) ? (
          <span key={i} className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      ))}
    </span>
  );
}

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";

const isInternal = (href: string) => href.startsWith("/") && !href.startsWith("//");

const components: Components = {
  a({ node: _node, href, children, ...props }) {
    if (href && isInternal(href)) {
      return (
        <Link to={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
};

/** Renders trusted, first-party Markdown article content. */
export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}

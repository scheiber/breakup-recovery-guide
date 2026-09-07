import ReactMarkdown, { type Components } from "react-markdown";
import type { PluggableList } from "unified";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Link } from "react-router-dom";

const isInternal = (href: string) => href.startsWith("/") && !href.startsWith("//");

const rehypePlugins: PluggableList = [
  rehypeSlug,
  [rehypeAutolinkHeadings, { behavior: "wrap" }],
];

const components: Components = {
  a({ node: _node, href, children, ...props }) {
    if (href && href.startsWith("#")) {
      // Heading anchor / same-page link — let the browser handle the jump.
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }
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
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={rehypePlugins}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}

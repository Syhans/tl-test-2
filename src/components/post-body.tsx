import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { NextImageWrapper as Image } from "@/components/image";
import {
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  List,
  P,
  Quote,
} from "@/components/ui/typography";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-xl mx-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="space-y-4"
        components={{
          img: (props) => (
            <Image src={props.src as string} alt={props.alt as string} />
          ),
          h1: ({ node, ...props }) => <H1 {...props} />,
          h2: ({ node, ...props }) => <H2 {...props} />,
          h3: ({ node, ...props }) => <H3 {...props} />,
          h4: ({ node, ...props }) => <H4 {...props} />,
          code: ({ node, ...props }) => <InlineCode {...props} />,
          ul: ({ node, ...props }) => <List {...props} />,
          p: ({ node, ...props }) => <P {...props} />,
          blockquote: ({ node, ...props }) => <Quote {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

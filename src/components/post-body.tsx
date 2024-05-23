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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export function PostBody({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className=""
      components={{
        img: (props) => {
          return <Image src={props.src ?? "data:"} alt={props.alt} />;
        },
        h1: ({ node: _, ...props }) => <H1 {...props} />,
        h2: ({ node: _, ...props }) => <H2 {...props} />,
        h3: ({ node: _, ...props }) => <H3 {...props} />,
        h4: ({ node: _, ...props }) => <H4 {...props} />,
        code: ({ node: _, ...props }) => <InlineCode {...props} />,
        ul: ({ node: _, ...props }) => <List {...props} />,
        p: ({ node: _, ...props }) => <P {...props} />,
        blockquote: ({ node: _, ...props }) => <Quote {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

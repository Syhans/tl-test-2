import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    <div className="max-w-2xl mx-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="space-y-4"
        components={{
          img: (props) => (
            <Image
              src={props.src as string}
              alt={props.alt as string}
              width={1200}
              height={200}
            />
          ),
          h1: (props) => <H1 {...props} />,
          h2: (props) => <H2 {...props} />,
          h3: (props) => <H3 {...props} />,
          h4: (props) => <H4 {...props} />,
          code: (props) => <InlineCode {...props} />,
          ul: (props) => <List {...props} />,
          p: (props) => <P {...props} />,
          blockquote: (props) => <Quote {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

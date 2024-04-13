import markdownStyles from "./markdown-styles.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <ReactMarkdown
        className={markdownStyles["markdown"]}
        components={{
          img: (props) => (
            <Image
              src={props.src as string}
              alt={props.alt as string}
              width={1200}
              height={200}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

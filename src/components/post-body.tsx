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
import { components } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export function PostBody({ content }: { content: string }) {
  return (
    <MDXRemote
      source={content}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      components={{
        img: (props) => {
          return (
            <Image src={props.src ?? "data:"} alt={props.alt} showCaption />
          );
        },
        h1: ({ ...props }) => <H1 {...props} />,
        h2: ({ ...props }) => <H2 {...props} />,
        h3: ({ ...props }) => <H3 {...props} />,
        h4: ({ ...props }) => <H4 {...props} />,
        code: ({ ...props }) => <InlineCode {...props} />,
        ul: ({ ...props }) => <List {...props} />,
        p: ({ ...props }) => <P {...props} />,
        blockquote: ({ ...props }) => <Quote {...props} />,
        ...components,
      }}
    />
  );
}

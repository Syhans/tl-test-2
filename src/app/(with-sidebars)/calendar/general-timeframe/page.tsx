import { PostBody } from "@/components/post-body";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

export default function Page() {
  const fullPath = join(
    process.cwd(),
    "src/app/(with-sidebars)/calendar/general-timeframe",
    "general-timeframe.mdx",
  );
  const fileContents = readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);
  return (
    <article className="flex min-h-[calc(100svh-4rem)] w-full min-w-0 justify-center break-words pb-8">
      <div className="w-full min-w-0 max-w-6xl space-y-6 px-6 pt-4 md:px-12">
        <PostBody content={content} />
      </div>
    </article>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostHeader } from "@/components/header";
import { PostBody } from "@/components/post-body";
import { Sidebar } from "@/components/sidebar";
import { TableOfContents } from "@/components/table-of-contents";
import { getAllPosts, getPostBySlug } from "@/lib/api";

type Params = {
  params: {
    slug: string;
  };
};

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  // TODO: move sidebar and table of contents to layout
  return (
    <div className="mx-auto flex max-w-[90rem]">
      <Sidebar />
      <TableOfContents editable={true} />
      <article className="flex min-h-[100svh-64px] w-full min-w-0 justify-center break-words pb-8">
        <div className="w-full min-w-0 max-w-6xl space-y-6 px-6 pt-4 md:px-12">
          <PostHeader
            slug={params.slug}
            title={post.title}
            coverImage={post.coverImage}
            episodes={post.episodes}
          />
          <PostBody content={post.content} />
        </div>
      </article>
    </div>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title}`;

  return {
    title,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

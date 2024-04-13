import { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackButton } from "@/components/back-button";
import { PostBody } from "@/components/post-body";
import { PostHeader } from "@/components/post-header";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { PAGE_TITLE } from "@/lib/constants";

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <>
      <main>
        <div className="container mx-auto px-5">
          <article className="my-4">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
            />
            <PostBody content={post.content} />
          </article>
        </div>
      </main>
      <BackButton className="absolute top-4 left-4" />
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${PAGE_TITLE}`;

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

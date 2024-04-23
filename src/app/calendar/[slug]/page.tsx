import { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackToTopButton } from "@/components/back-to-top";
import { PostHeader } from "@/components/header";
import { PostBody } from "@/components/post-body";
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

  return (
    <div className="container mx-auto px-5">
      <article className="my-4">
        <PostHeader
          slug={params.slug}
          title={post.title}
          coverImage={post.coverImage}
          episodes={post.episodes}
        />
        <PostBody content={post.content} />
      </article>
      <div className="max-w-xl mx-auto">
        <BackToTopButton className="px-1" />
      </div>
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

import { PostHeader } from "@/components/header";
import { PostPagination } from "@/components/pagination";
import { PostBody } from "@/components/post-body";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { type Metadata } from "next";

interface Params {
  params: {
    slug: string;
  };
}

export default function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  // if (!post) {
  // 	return notFound();
  // }

  return (
    <div className="flex flex-col">
      <article className="flex min-h-[calc(100svh-4rem)] w-full min-w-0 justify-center break-words pb-8">
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
      <PostPagination
        slug={params.slug}
        className="mt-auto max-w-6xl px-6 py-4"
      />
    </div>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  // if (!post) {
  //   return notFound();
  // }

  const title = post.title;

  return {
    title,
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

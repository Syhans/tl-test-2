import { PostPreview } from "@/components/post-preview";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const posts = getAllPosts();

  return (
    <main>
      <div className="container mx-auto px-5">
        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
            {posts.map((post) => (
              <PostPreview
                key={post.slug}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

import { readdirSync, readFileSync } from "fs";
import { readFile } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";
import { getPlaiceholder } from "plaiceholder";

import { Event, Post } from "@/interfaces";

const postsDirectory = join(process.cwd(), "_posts");
const imagesDirectory = join(process.cwd(), "public");

export async function getImageProps(src: string) {
  const filePath = join(imagesDirectory, src);
  const file = await readFile(filePath);

  const { base64, metadata } = await getPlaiceholder(file);

  return {
    width: metadata.width,
    height: metadata.height,
    blurDataURL: base64,
  };
}

export function getPostSlugs() {
  return readdirSync(postsDirectory).map((path) => path.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string) {
  const fullPath = join(postsDirectory, `${slug}.md`);
  const fileContents = readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const post = { ...data, slug, content } as Post;

  return post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getEpisodesToDateMap(): { [key: string]: string[] } {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  const episodesToDateMap = {} as { [key: string]: string[] };
  posts.forEach((post) => {
    post.episodes.forEach((episode, index) => {
      if (!episodesToDateMap[episode]) {
        episodesToDateMap[episode] = [];
      }
      episodesToDateMap[episode].push(post.date);
    });
  });
  return episodesToDateMap;
}

export function getAllEvents(): Event[] {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  const backgroundEvents = posts.map((post) => {
    return {
      id: post.slug,
      start: post.date,
      display: "background",
    };
  });
  // runs getPostSlugs twice, but performance is not a concern here
  const episodesToDateMap = getEpisodesToDateMap();
  const episodeEvents = Object.entries(episodesToDateMap).map(
    ([episode, dates]) => {
      const startDate = new Date(dates[0]);
      const start = startDate.toISOString();
      const endDate = new Date(dates[dates.length - 1]);
      endDate.setDate(endDate.getDate() + 1);
      const end = endDate.toISOString();

      return {
        id: `episode-${episode}`,
        title: `Episode ${episode}`,
        start: start,
        end,
      };
    }
  );

  return [...backgroundEvents, ...episodeEvents];
}

export function getAllEpisodes(): string[] {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  const episodes = posts.reduce((acc, post) => {
    post.episodes.forEach((episode) => {
      if (!acc.includes(episode)) {
        acc.push(episode);
      }
    });
    return acc;
  }, [] as string[]);

  return episodes;
}

import { Event, NavigationItem, Post } from "@/interfaces";
import { readFileSync, readdirSync } from "fs";
import { readFile } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";
import { getPlaiceholder } from "plaiceholder";

import { SPECIAL_POSTS } from "./constants";
import { convertDate, getMonth, getYear, monthNameToNumber } from "./date";

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

export function getEpisodesToDateMap(): Record<string, string[]> {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  const episodesToDateMap = {} as Record<string, string[]>;
  posts.forEach((post) => {
    post.episodes.forEach((episode) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
      if (!episodesToDateMap[episode]) {
        episodesToDateMap[episode] = [];
      }
      episodesToDateMap[episode].push(post.title);
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
        start,
        end,
      };
    },
  );

  return [...backgroundEvents, ...episodeEvents];
}

export function getAllEpisodes(): string[] {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  const episodes = posts.reduce<string[]>((acc, post) => {
    post.episodes.forEach((episode) => {
      if (!acc.includes(episode)) {
        acc.push(episode);
      }
    });
    return acc;
  }, []);

  return episodes;
}

export function getNavigation(): NavigationItem[] {
  const navigation: NavigationItem[] = [];
  navigation.push({ label: "About", href: "/about" });

  const posts = getAllPosts()
    .filter((post) => !SPECIAL_POSTS.includes(post.title.toLowerCase()))
    .map((post) => post.title)
    // sort asc
    .sort((a, b) => (a > b ? 1 : -1));
  // get unique years
  const calendarItem = {
    label: "Calendar",
    href: "/calendar",
    children: [] as NavigationItem[],
  };
  calendarItem.children.push({
    label: "Flashback",
    href: "/calendar/flashback",
  });
  const years = posts
    .map((post) => getYear(post))
    .filter((year, index, self) => self.indexOf(year) === index);
  years.forEach((year) => {
    const yearItem = {
      label: year,
      href: `/calendar/${year}`,
      children: [] as NavigationItem[],
    };
    const months = posts
      .filter((post) => getYear(post) === year)
      .map((post) => getMonth(post))
      .filter((month, index, self) => self.indexOf(month) === index);

    months.forEach((month) => {
      const monthItem = {
        label: month,
        // convert month number to name only to convert it back to number, lol
        // it works to I won't be bothered to change it
        href: `/calendar/${year}-${monthNameToNumber(month)}`,
        children: [] as NavigationItem[],
      };
      const days = posts.filter(
        (post) => getYear(post) === year && getMonth(post) === month,
      );
      days.forEach((day) => {
        const dayItem = {
          label: convertDate(day),
          href: `/calendar/${day}`,
        };
        monthItem.children.push(dayItem);
      });
      yearItem.children.push(monthItem);
    });
    calendarItem.children.push(yearItem);
  });
  navigation.push(calendarItem);

  const episodes = getAllEpisodes();
  const episodesItem = {
    label: "Episodes",
    href: "/episodes",
    children: [] as NavigationItem[],
  };
  episodes.forEach((episode) => {
    const episodeItem = {
      label: `Episode ${episode}`,
      href: `/episodes/${episode}`,
    };
    episodesItem.children.push(episodeItem);
  });
  navigation.push(episodesItem);

  return navigation;
}

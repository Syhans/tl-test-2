export type Post = {
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
  episodes: string[];
  slug: string;
  content: string;
};

export type Event = {
  id: string;
  title?: string;
  start: string;
  end?: string;
  display?: string;
};

export interface Post {
  title: string;
  date: string;
  coverImage: string;
  episodes: string[];
  slug: string;
  content: string;
}

export interface Event {
  id: string;
  title?: string;
  start: string;
  end?: string;
  display?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

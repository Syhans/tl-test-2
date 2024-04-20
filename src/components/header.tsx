import Link from "next/link";

import { H1, List, Quote } from "@/components/ui/typography";
import { convertDate } from "@/lib/date";

import { CoverImage } from "./cover-image";

type PostProps = {
  title: string;
  coverImage: string;
  episodes: string[];
};

type EpisodeProps = {
  title: string;
  coverImage: string;
  dates: string[];
};

export function PostHeader({ title, coverImage, episodes }: PostProps) {
  const parsedTitle = convertDate(title);
  return (
    <div className="max-w-2xl mx-auto">
      <H1>{parsedTitle}</H1>
      <div className="my-8 md:my-16 sm:mx-0">
        <CoverImage title={parsedTitle} src={coverImage} />
      </div>
      <div className="mb-6 text-lg">
        <Quote>
          This day is covered in these episodes:{" "}
          <List>
            {episodes.map((episode) => {
              return (
                <li key={episode}>
                  <Link
                    className="text-gray-600 dark:text-gray-400 hover:underline"
                    href={`/episodes/${episode}`}
                  >{`Episode ${episode}`}</Link>
                </li>
              );
            })}
          </List>
        </Quote>
      </div>
    </div>
  );
}

export function EpisodeHeader({ title, coverImage, dates }: EpisodeProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <H1>{title}</H1>
      <div className="my-8 md:my-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="mb-6 text-lg">
        This episode covers the following days:{" "}
        <List>
          {dates.map((date) => {
            return (
              <li key={date}>
                <Link
                  className="text-gray-600 dark:text-gray-400 hover:underline"
                  href={`/calendar/${date}`}
                >{`${convertDate(date)}`}</Link>
              </li>
            );
          })}
        </List>
      </div>
    </div>
  );
}

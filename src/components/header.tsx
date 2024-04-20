import Link from "next/link";

import { NextImageWrapper as Image } from "@/components/image";
import { EpisodePagination, PostPagination } from "@/components/pagination";
import { H1, List, Quote } from "@/components/ui/typography";
import { convertDate } from "@/lib/date";

type PostProps = {
  slug: string;
  title: string;
  coverImage: string;
  episodes: string[];
};

type EpisodeProps = {
  episode: string;
  title: string;
  coverImage: string;
  dates: string[];
};

export function PostHeader({ slug, title, coverImage, episodes }: PostProps) {
  const parsedTitle = convertDate(title);
  return (
    <div className="max-w-3xl mx-auto space-y-4 md:space-y-8 sm-mx-0">
      <H1>{parsedTitle}</H1>
      <div className="flex justify-center w-full">
        <Image src={coverImage} alt={`Cover Image for ${parsedTitle}`} />;
      </div>
      <PostPagination slug={slug} />
      <div className="mb-6 text-lg">
        <Quote>
          This day is covered in these episodes:{" "}
          <List>
            {episodes.map((episode) => {
              return (
                <li key={episode}>
                  <Link
                    className="text-gray-600 underline-offset-4 hover:underline dark:text-gray-400"
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

export function EpisodeHeader({
  episode,
  title,
  coverImage,
  dates,
}: EpisodeProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-4 md:space-y-8 sm-mx-0">
      <H1>{title}</H1>
      <Image src={coverImage} alt={`Cover Image for ${title}`} />
      <EpisodePagination episode={episode} />
      <div className="text-lg">
        This episode covers the following days:{" "}
        <List>
          {dates.map((date) => {
            return (
              <li key={date}>
                <Link
                  className="text-gray-600 underline-offset-4 hover:underline dark:text-gray-400"
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

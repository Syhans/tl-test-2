import { NextImageWrapper as Image } from "@/components/image";
import { EpisodePagination, PostPagination } from "@/components/pagination";
import { H1, List, Quote } from "@/components/ui/typography";
import { SPECIAL_POSTS } from "@/lib/constants";
import { convertDate } from "@/lib/date";
import Link from "next/link";

interface PostProps {
  slug: string;
  title: string;
  coverImage: string;
  episodes: string[];
}

interface EpisodeProps {
  episode: string;
  title: string;
  coverImage: string;
  dates: string[];
}

export function PostHeader({ slug, title, coverImage, episodes }: PostProps) {
  const parsedTitle = SPECIAL_POSTS.includes(title.toLowerCase())
    ? title
    : convertDate(title);
  return (
    <>
      <H1>{parsedTitle}</H1>
      <div className="flex w-full justify-center">
        <Image
          src={coverImage}
          alt={`Cover Image for ${parsedTitle}`}
          priority
        />
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
                    className="text-gray-600 underline-offset-4 transition-opacity hover:opacity-75 dark:text-gray-400"
                    href={`/episodes/${episode}`}
                  >{`Episode ${episode}`}</Link>
                </li>
              );
            })}
          </List>
        </Quote>
      </div>
    </>
  );
}

export function EpisodeHeader({
  episode,
  title,
  coverImage,
  dates,
}: EpisodeProps) {
  return (
    <>
      <H1>{title}</H1>
      <Image src={coverImage} alt={`Cover Image for ${title}`} priority />
      <EpisodePagination episode={episode} />
      <div className="text-lg">
        This episode covers the following days:{" "}
        <List>
          {dates.map((date) => {
            return (
              <li key={date}>
                <Link
                  className="text-gray-600 underline-offset-4 transition-opacity hover:opacity-75 dark:text-gray-400"
                  href={`/calendar/${date}`}
                >
                  {convertDate(date, true)}
                </Link>
              </li>
            );
          })}
        </List>
      </div>
    </>
  );
}

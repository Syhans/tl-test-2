import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { getAllPosts, getEpisodesToDateMap } from "@/lib/api";
import { cn, getPrevAndNext } from "@/lib/utils";

export function PostPagination({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const posts = getAllPosts()
    .map((post) => post.slug)
    .sort();
  const { prev, next } = getPrevAndNext(posts, slug);
  return (
    <div className={cn("flex justify-between w-full", className)}>
      <PreviousButton
        label={prev ?? "First Date"}
        href={`/calendar/${prev}`}
        disabled={!prev}
      />
      <ToCalendarButton date={slug} />
      <NextButton
        label={next ?? "Last Date"}
        href={`/calendar/${next}`}
        disabled={!next}
      />
    </div>
  );
}

export function EpisodePagination({
  episode,
  className,
}: {
  episode: string;
  className?: string;
}) {
  const episodeToDateMap = getEpisodesToDateMap();
  const episodes = Object.keys(episodeToDateMap).sort();
  const { prev, next } = getPrevAndNext(episodes, episode);
  return (
    <div className={cn("flex justify-between w-full", className)}>
      <PreviousButton
        label={prev ? `Episode ${prev}` : "First Episode"}
        href={`/episodes/${prev}`}
        disabled={!prev}
      />
      <ToCalendarButton date={episodeToDateMap[episode][0]} />
      <NextButton
        label={next ? `Episode ${next}` : "Last Episode"}
        href={`/episodes/${next}`}
        disabled={!next}
      />
    </div>
  );
}

function ToCalendarButton({ date }: { date?: string }) {
  const href = date ? `/calendar?date=${date}` : "/calendar";
  return (
    <Link href={href} className={buttonVariants({ variant: "outline" })}>
      <Calendar className="h-[1.2rem] w-[1.2rem] sm:mr-2" />
      <span className="sr-only sm:not-sr-only">Back to Calendar</span>
    </Link>
  );
}

function PreviousButton({
  label,
  href,
  disabled,
}: {
  label: string;
  href: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "sm:w-40",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <ArrowLeft className="h-[1.2rem] w-[1.2rem] sm:mr-2" />
      <span className="sr-only sm:not-sr-only">{label}</span>
    </Link>
  );
}

function NextButton({
  label,
  href,
  disabled,
}: {
  label: string;
  href: string;
  disabled?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "sm:w-40",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <span className="sr-only sm:not-sr-only">{label}</span>
      <ArrowRight className="h-[1.2rem] w-[1.2rem] sm:ml-2" />
    </Link>
  );
}

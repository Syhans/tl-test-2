import { buttonVariants } from "@/components/ui/button";
import { getAllPosts, getEpisodesToDateMap } from "@/lib/api";
import { cn, getPrevAndNext } from "@/lib/utils";
import { ArrowLeft, ArrowRight, CalendarFold } from "lucide-react";
import Link from "next/link";

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
  if (posts.indexOf("general-timeframe") > 0) {
    posts.splice(posts.indexOf("general-timeframe"), 1);
    posts.unshift("general-timeframe");
  }
  const { prev, next } = getPrevAndNext(posts, slug);
  return (
    <div className={cn("flex w-full justify-between", className)}>
      <PreviousButton
        label={prev ?? "First Date"}
        href={prev ? `/calendar/${prev}` : "#"}
        disabled={!prev}
      />
      <ToCalendarButton date={slug} />
      <NextButton
        label={next ?? "Last Date"}
        href={next ? `/calendar/${next}` : "#"}
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
    <div className={cn("flex w-full justify-between", className)}>
      <PreviousButton
        label={prev ? `Episode ${prev}` : "First Episode"}
        href={prev ? `/episodes/${prev}` : "#"}
        disabled={!prev}
      />
      <ToCalendarButton date={episodeToDateMap[episode]?.[0]} />
      <NextButton
        label={next ? `Episode ${next}` : "Last Episode"}
        href={next ? `/episodes/${next}` : "#"}
        disabled={!next}
      />
    </div>
  );
}

function ToCalendarButton({ date }: { date?: string }) {
  const href = date ? `/calendar?date=${date}` : "/calendar";
  return (
    <Link href={href} className={cn(buttonVariants({ variant: "outline" }))}>
      <CalendarFold className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only text-xs lg:not-sr-only lg:ml-2">
        Back to Calendar
      </span>
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
        "w-40",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
      <span className="ml-2 text-xs capitalize">{label}</span>
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
        "w-40",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <span className="mr-2 text-xs capitalize">{label}</span>
      <ArrowRight className="h-[1.2rem] w-[1.2rem]" />
    </Link>
  );
}

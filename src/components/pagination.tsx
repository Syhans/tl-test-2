import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { getAllPosts, getEpisodesToDateMap } from "@/lib/api";
import { cn, getPrevAndNext } from "@/lib/utils";

export function PostPagination({ post }: { post: string }) {
  const posts = getAllPosts()
    .map((post) => post.slug)
    .sort();
  const { prev, next } = getPrevAndNext(posts, post);
  return (
    <div className="flex justify-between w-full">
      <PreviousButton
        label="Previous Date"
        href={`/calendar/${prev}`}
        disabled={!prev}
      />
      <ToCalendarButton />
      <NextButton
        label="Next Date"
        href={`/calendar/${next}`}
        disabled={!next}
      />
    </div>
  );
}

export function EpisodePagination({ episode }: { episode: string }) {
  const episodes = Object.keys(getEpisodesToDateMap()).sort();
  const { prev, next } = getPrevAndNext(episodes, episode);
  return (
    <div className="flex justify-between w-full">
      <PreviousButton
        label="Previous Episode"
        href={`/episodes/${prev}`}
        disabled={!prev}
      />
      <ToCalendarButton />
      <NextButton
        label="Next Episode"
        href={`/episodes/${next}`}
        disabled={!next}
      />
    </div>
  );
}

function ToCalendarButton({
  disabled,
  className,
  ...props
}: {
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/calendar"
      className={cn(
        buttonVariants({ variant: "outline" }),
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <Calendar className="h-[1.2rem] w-[1.2rem] sm:mr-2" />
      <span className="sr-only sm:not-sr-only">Back to Calendar</span>
    </Link>
  );
}

function PreviousButton({
  label,
  href,
  disabled,
  className,
  ...props
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
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
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
  className,
  ...props
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
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <span className="sr-only sm:not-sr-only">{label}</span>
      <ArrowRight className="h-[1.2rem] w-[1.2rem] sm:ml-2" />
    </Link>
  );
}

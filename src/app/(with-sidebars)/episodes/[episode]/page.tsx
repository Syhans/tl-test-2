import { EpisodeHeader } from "@/components/header";
import { getAllEpisodes, getEpisodesToDateMap } from "@/lib/api";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import episodeCoverImages from "./episodeCoverImages.json";

interface Params {
  params: {
    episode: string;
  };
}

export default function Post({ params }: Params) {
  if (!params.episode) {
    return notFound();
  }

  const dates = getEpisodesToDateMap()[params.episode];
  if (!dates) {
    throw new Error(`No dates found for episode ${params.episode}`);
  }

  const coverImage =
    episodeCoverImages[params.episode as keyof typeof episodeCoverImages];

  return (
    <article className="flex min-h-[calc(100svh-4rem)] w-full min-w-0 justify-center break-words pb-8">
      <div className="w-full min-w-0 max-w-6xl space-y-6 px-6 pt-4 md:px-12">
        <EpisodeHeader
          episode={params.episode}
          title={`Episode ${params.episode}`}
          coverImage={coverImage}
          dates={dates}
        />
      </div>
    </article>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  if (!params.episode) {
    return notFound();
  }

  const title = `Episode ${params.episode}`;

  return { title };
}

export function generateStaticParams() {
  const episodes = getAllEpisodes();
  return episodes.map((episode) => ({
    episode,
  }));
}

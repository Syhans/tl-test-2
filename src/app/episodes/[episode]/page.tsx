import { Metadata } from "next";
import { notFound } from "next/navigation";

import { EpisodeHeader } from "@/components/header";
import { EpisodePagination } from "@/components/pagination";
import { getAllEpisodes, getEpisodesToDateMap } from "@/lib/api";
import { PAGE_TITLE } from "@/lib/constants";

import episodeCoverImages from "./episodeCoverImages.json";

type Params = {
  params: {
    episode: string;
  };
};

export default async function Post({ params }: Params) {
  if (!params.episode) {
    return notFound();
  }

  const dates = getEpisodesToDateMap()[params.episode];
  const coverImage =
    episodeCoverImages[params.episode as keyof typeof episodeCoverImages];

  return (
    <div className="container mx-auto px-5">
      <article className="my-4">
        <EpisodeHeader
          title={`Episode ${params.episode}`}
          coverImage={coverImage}
          dates={dates}
        />
      </article>
      <div className="max-w-2xl mx-auto">
        <EpisodePagination episode={params.episode} />
      </div>
    </div>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  if (!params.episode) {
    return notFound();
  }

  const title = `Episode ${params.episode} | ${PAGE_TITLE}`;

  return { title };
}

export async function generateStaticParams() {
  const episodes = getAllEpisodes();
  return episodes.map((episode) => ({
    episode,
  }));
}

import { Metadata } from "next";
import { notFound } from "next/navigation";

import { EpisodeHeader } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { TableOfContents } from "@/components/table-of-contents";
import { getAllEpisodes, getEpisodesToDateMap } from "@/lib/api";

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
    <div className="mx-auto flex max-w-[90rem]">
      <Sidebar />
      <TableOfContents />
      <article className="flex min-h-[100svh-64px] w-full min-w-0 justify-center break-words pb-8">
        <div className="w-full min-w-0 max-w-6xl space-y-6 px-6 pt-4 md:px-12">
          <EpisodeHeader
            episode={params.episode}
            title={`Episode ${params.episode}`}
            coverImage={coverImage}
            dates={dates}
          />
        </div>
      </article>
    </div>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  if (!params.episode) {
    return notFound();
  }

  const title = `Episode ${params.episode}`;

  return { title };
}

export async function generateStaticParams() {
  const episodes = getAllEpisodes();
  return episodes.map((episode) => ({
    episode,
  }));
}

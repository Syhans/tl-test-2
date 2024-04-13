import { PostTitle } from "@/components/post-title";

import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
};

export function PostHeader({ title, coverImage, date }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <PostTitle>{title}</PostTitle>
      <div className="my-8 md:my-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="mb-6 text-lg">
        <DateFormatter dateString={date} />
      </div>
    </div>
  );
}

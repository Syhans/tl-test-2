import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getImageProps } from "@/lib/api";
import ExportedImage from "next-image-export-optimizer";

async function NextImageWrapper({
  src,
  alt,
  showCaption,
  priority,
  fullScreenOnClick = true,
}: {
  src: string;
  alt?: string;
  showCaption?: boolean;
  priority?: boolean;
  fullScreenOnClick?: boolean;
}) {
  const { width, height } = await getImageProps(src);

  const Img = (
    <ExportedImage
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      priority={priority}
      className="mx-auto"
    />
  );

  if (!fullScreenOnClick) {
    return (
      <>
        {Img}
        {showCaption && (
          <span className="inline-flex w-full justify-center p-1 text-center text-sm italic">
            {alt}
          </span>
        )}
      </>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{Img}</DialogTrigger>
      {showCaption && (
        <span className="inline-flex w-full justify-center p-1 text-center text-sm italic">
          {alt}
        </span>
      )}
      <DialogContent className="w-full p-0 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">
        <DialogClose asChild>
          {Img}
          {/* <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="mx-auto"
          /> */}
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export { NextImageWrapper };

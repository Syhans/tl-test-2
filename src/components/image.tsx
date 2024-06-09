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
      <DialogContent className="min-w-full p-1">
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

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSpoiler, useSpoilerConfirm } from "@/contexts/SpoilerContext";
import { ExternalLink, StepForward } from "lucide-react";

export function SpoilerWarningDialog() {
  const isSpoilerOk = useSpoiler();
  const confirmSpoilerIsOk = useSpoilerConfirm();

  return (
    <AlertDialog
      open={!isSpoilerOk}
      onOpenChange={(open) => {
        if (open) {
          // prevent closing the dialog
          return false;
        }
        confirmSpoilerIsOk();
      }}
    >
      <AlertDialogOverlay className="bg-black" />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Spoiler Warning!</AlertDialogTitle>
          <AlertDialogDescription>
            It seems like you are visiting this website for the first time (or
            have cleared your browser cache). This website contains spoilers for
            the entirety of the anime <b>Shirobako</b> (
            <a
              className="inline-flex w-fit items-center transition-opacity hover:opacity-75"
              href="https://myanimelist.net/anime/25835/Shirobako/"
              rel="noopener noreferrer"
              target="_blank"
            >
              MAL
              <ExternalLink className="h-4" />
            </a>
            /{" "}
            <a
              className="inline-flex w-fit items-center transition-opacity hover:opacity-75"
              href="https://anilist.co/anime/20812/SHIROBAKO/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Anilist
              <ExternalLink className="h-4" />
            </a>
            ).
            <br />
            <br />
            <b>Seriously, the entire show gets practically re-told here.</b>
            <br />
            If you are not familiar with Shirobako, please check it out first.
            <br />
            <br />
            Click the continue button if you are okay with spoilers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              confirmSpoilerIsOk();
            }}
          >
            Continue
            <StepForward className="h-5" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
          <AlertDialogTitle>Spoiler Warning</AlertDialogTitle>
          <AlertDialogDescription>
            This post contains spoilers. Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              confirmSpoilerIsOk();
            }}
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

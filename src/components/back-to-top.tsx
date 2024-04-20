"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function BackToTopButton({ className }: { className?: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const checkScroll = () => {
      setIsAtTop(window.pageYOffset === 0);
    };
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <Button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      variant="ghost"
      className={className}
      disabled={isAtTop}
    >
      Back to Top
    </Button>
  );
}

"use client";

import { ExternalLink } from "lucide-react";
import { CircleChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { GITHUB_REPO_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

// actual toc functionality unimplmented

export function TableOfContents({
  placeholderOnly = false,
  editable = false,
}: {
  placeholderOnly?: boolean;
  editable?: boolean;
}) {
  const pathname = usePathname();
  const nodename = pathname.split("/").pop();

  return (
    <nav className="order-last hidden w-64 shrink-0 px-4 xl:block">
      {!placeholderOnly && (
        <div className="scrollbar sticky top-16 overflow-y-auto pr-4 pt-6 text-xs">
          <div className="mt-8 flex flex-col items-start gap-2 bg-gray-50 pb-8 dark:bg-gray-950">
            <a
              className="flex w-fit items-center transition-opacity hover:opacity-75"
              href={`${GITHUB_REPO_URL}/issues/new?title=Feedback%20on%20${pathname}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Question? Give me feedback <ExternalLink className="h-3" />
            </a>
            {editable && (
              <a
                className="flex w-fit items-center transition-opacity hover:opacity-75"
                href={`${GITHUB_REPO_URL}/edit/main/_posts/${nodename}.md`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Edit this page on Github <ExternalLink className="h-3" />
              </a>
            )}
            <ScrollToTopButton />
          </div>
        </div>
      )}
    </nav>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className={cn(
        "flex w-fit items-center transition-opacity hover:opacity-75",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      Scroll to top
      <CircleChevronUp className="ml-1 h-4" />
    </button>
  );
}

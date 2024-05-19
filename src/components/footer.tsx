"use client";
import { ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";

const hideThemeToggleOn = ["/episodes(/.*)?", "/calendar/(.*)", "/about"];

export function Footer() {
  const pathname = usePathname();
  const hideThemeToggle = hideThemeToggleOn.some((path) =>
    new RegExp(path).test(pathname),
  );
  return (
    <>
      <footer>
        <hr className="mx-auto border-t border-gray-200 dark:border-gray-800" />
        {!hideThemeToggle && (
          <div className="mx-auto flex max-w-[90rem] gap-2 px-4 py-2">
            <ThemeToggle />
          </div>
        )}
        <div className="mx-auto flex max-w-[90rem] justify-center px-6 py-12 text-gray-600 dark:text-gray-400 md:justify-start">
          <div className="flex w-full flex-col items-center sm:items-start">
            <p className="max-w-prose text-sm">
              Curated by{" "}
              <a
                className="inline-flex w-fit items-center transition-opacity hover:opacity-75"
                href="https://www.reddit.com/user/Mistaarr/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Mistaarr @ Reddit.
                <ExternalLink className="h-4" />
              </a>{" "}
              /{" "}
              <a
                className="inline-flex w-fit items-center transition-opacity hover:opacity-75"
                href="https://github.com/Syhans"
                rel="noopener noreferrer"
                target="_blank"
              >
                Syhans @ Github.
                <ExternalLink className="h-4" />
              </a>
              <br />
              <span className="font-bold">Disclaimer:</span> This site is a
              fan-made project and is not affiliated with or endorsed by the
              original creators of Shirobako. All content, including images and
              episode information, is the property of the show&apos;s creators
              and respective copyright holders.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

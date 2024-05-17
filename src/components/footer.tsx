"use client";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";

const hideThemeToggleOn = ["/episodes(/.*)?", "/calendar/(.*)"];

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
            <p className="text-sm">Curated by Mistaarr @ Reddit.</p>
            <p className="max-w-prose text-sm">
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

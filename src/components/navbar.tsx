"use client";

import { CalendarRange } from "lucide-react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { PAGE_TITLE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-20 w-full bg-transparent">
      <div className="pointer-events-none absolute z-[-1] h-full w-full bg-gray-50/85 shadow shadow-black/10 backdrop-blur-md dark:bg-gray-950/85 dark:shadow-white/10" />
      <nav className="mx-auto flex h-16 max-w-[90rem] items-center justify-end gap-2 bg-transparent px-6">
        <Link
          href="/"
          className="mr-auto flex items-center text-xl font-bold transition-opacity hover:opacity-75"
        >
          <CalendarRange className="mr-2 h-6 w-6" />
          <span>{PAGE_TITLE}</span>
        </Link>
        <Link
          href="/calendar"
          className={cn(
            "hidden p-2 text-sm transition-opacity hover:opacity-75 md:inline-block",
            pathname.startsWith("/calendar") && "font-bold",
          )}
        >
          <span>Calendar</span>
        </Link>
        <Link
          href="/episodes/1"
          className={cn(
            "hidden p-2 text-sm transition-opacity hover:opacity-75 md:inline-block",
            pathname.startsWith("/episodes") && "font-bold",
          )}
        >
          <span>Episodes</span>
        </Link>
        <Link
          href="/about"
          className={cn(
            "hidden p-2 text-sm transition-opacity hover:opacity-75 md:inline-block",
            pathname.startsWith("/about") && "font-bold",
          )}
        >
          <span>About</span>
        </Link>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </nav>
    </div>
  );
}

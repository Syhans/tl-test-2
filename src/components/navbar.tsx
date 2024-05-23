"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationItem } from "@/interfaces";
import { PAGE_TITLE } from "@/lib/constants";
import { CalendarRange, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Navigation } from "./navigation";

export function Navbar({ navigation }: { navigation: NavigationItem[] }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const onNavigate = () => {
    setSheetOpen(false);
  };
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
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
              <span className="sr-only">Open Navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <Navigation navigation={navigation} onNavigate={onNavigate} />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

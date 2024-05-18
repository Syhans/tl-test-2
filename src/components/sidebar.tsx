"use client";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { useSidebarToggle } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function Sidebar({
  children,
  isOpen,
}: {
  children?: React.ReactNode;
  isOpen: boolean;
}) {
  const toggleSidebar = useSidebarToggle();

  return (
    <aside
      className={cn(
        "hidden flex-col transition-all ease-in-out md:sticky md:top-16 md:flex md:w-64 md:shrink-0 md:self-start",
        !isOpen && "md:w-20",
      )}
    >
      <div
        className={cn(
          "scrollbar grow overflow-y-auto overflow-x-hidden p-4 md:h-[calc(100svh-64px)]",
          !isOpen && "invisible",
        )}
      >
        <div
          className={cn(
            "w-[224px] overflow-hidden transition-all duration-300 ease-in-out",
            !isOpen && "w-0",
          )}
        >
          {/* Content */}
          {children}
          <div className="flex h-[1000px] w-full items-center justify-center border border-black dark:border-white max-md:hidden">
            Sidebar Placeholder
          </div>
        </div>
      </div>
      <div
        className={cn(
          "sticky bottom-0 mx-4 flex items-center gap-2 bg-gray-50 py-4 dark:border-neutral-800 dark:bg-gray-950",
          isOpen ? "border-t" : "flex-wrap justify-center",
        )}
      >
        <div className="flex grow flex-col">
          <ThemeToggle showLabel={isOpen} />
        </div>
        <Button onClick={toggleSidebar} variant="ghost" size="icon">
          {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
      </div>
    </aside>
  );
}

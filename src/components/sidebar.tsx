"use client";

import { useSidebar, useSidebarToggle } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function Sidebar({ children }: { children?: React.ReactNode }) {
  const isOpen = useSidebar();
  const toggleSidebar = useSidebarToggle();

  return (
    <aside
      className={cn(
        "hidden flex-col transition-all ease-in-out md:sticky md:top-16 md:flex md:h-[calc(100svh-4rem)] md:w-64 md:shrink-0 md:self-start",
        !isOpen && "md:w-20",
      )}
    >
      <div
        className={cn(
          "scrollbar grow overflow-y-auto overflow-x-hidden p-4 ",
          !isOpen && "invisible",
        )}
      >
        <div
          className={cn(
            "w-[224px] overflow-hidden transition-all duration-300 ease-in-out",
            !isOpen && "w-0",
          )}
        >
          <div
            className={cn(
              "opacity-100 transition-opacity duration-500 ease-in-out",
              !isOpen && "w-0 opacity-0",
            )}
          >
            {children}
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

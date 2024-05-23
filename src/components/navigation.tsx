"use client";

import { type NavigationItem } from "@/interfaces";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button, buttonVariants } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export function Navigation({
  navigation,
  onNavigate,
}: {
  navigation: NavigationItem[];
  onNavigate?: () => void;
}) {
  return (
    <ul className="flex w-full flex-col gap-1">
      {navigation.map((item, index) => (
        <NavigationItem key={index} item={item} onNavigate={onNavigate} />
      ))}
    </ul>
  );
}

function NavigationItem({
  item,
  onNavigate,
}: {
  item: NavigationItem;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(pathname.startsWith(item.href));
  const isActive = item.href === pathname && pathname !== "/calendar";
  if (item.children) {
    return (
      <li>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between font-normal",
                isActive &&
                  "bg-gray-100 font-medium text-teal-500 dark:bg-gray-800",
              )}
            >
              {item.label}
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  isOpen ? "rotate-90 transform" : "rotate-0 transform",
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="CollapsibleContent">
            <div className="flex py-1">
              {/* Vertical line */}
              <div className="mx-2 w-px bg-gray-200 dark:bg-gray-800" />
              <ul className="flex w-full flex-col gap-1">
                {item.children.map((child: NavigationItem, index: number) => (
                  <NavigationItem
                    key={index}
                    item={child}
                    onNavigate={onNavigate}
                  />
                ))}
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </li>
    );
  }
  // should always have href
  return (
    <li>
      <Link
        href={item.href}
        onClick={onNavigate}
        className={cn(
          buttonVariants({
            variant: "ghost",
            className: cn(
              "w-full justify-start font-normal",
              isActive &&
                "bg-gray-100 font-medium text-teal-500 dark:bg-gray-800",
            ),
          }),
        )}
      >
        {item.label}
      </Link>
    </li>
  );
}

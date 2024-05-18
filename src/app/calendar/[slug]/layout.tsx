"use client";
import { Sidebar } from "@/components/sidebar";
import { TableOfContents } from "@/components/table-of-contents";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const sidebarIsOpen = useSidebar();
  return (
    <div className="mx-auto flex max-w-[90rem]">
      <Sidebar isOpen={sidebarIsOpen} />
      <TableOfContents editable={true} />
      {children}
    </div>
  );
}

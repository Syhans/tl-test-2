import { Navigation } from "@/components/navigation";
import { Sidebar } from "@/components/sidebar";
import { TableOfContents } from "@/components/table-of-contents";
import { getNavigation } from "@/lib/api";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigation = getNavigation();
  return (
    <div className="mx-auto flex max-w-[90rem]">
      <Sidebar>
        <Navigation navigation={navigation} />
      </Sidebar>
      <TableOfContents />
      {children}
    </div>
  );
}

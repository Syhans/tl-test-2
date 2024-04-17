import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  return (
    <footer className="container mx-auto px-5 py-8 text-center text-gray-500 dark:text-gray-400">
      <ThemeToggle />
    </footer>
  );
}

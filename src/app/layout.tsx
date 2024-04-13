import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { PAGE_TITLE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "Statically generated blog with Next.js. Test implementation a timeline project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-gray-50 dark:bg-gray-950 font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">{children}</div>
          <footer className="container mx-auto px-5 py-8 text-center text-gray-500 dark:text-gray-400">
            <ThemeToggle />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { PAGE_TITLE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | " + PAGE_TITLE,
    default: PAGE_TITLE,
  },
  description:
    "Statically generated blog with Next.js. Test implementation of a timeline project.",
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
          "bg-gray-50 font-sans antialiased dark:bg-gray-950",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-[calc(100svh-64px)]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

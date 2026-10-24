import type { Metadata } from "next";
import { outfit, inter } from "@/app/fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TopNav } from "@/components/shell/top-nav";
import { FloatingDock } from "@/components/shell/floating-dock";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "StayDesk — Sistem Manajemen Apartemen & Invoice",
  description:
    "Webapp manajemen check-in/check-out unit apartemen, ringkasan keuangan dan invoice otomatis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${outfit.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased font-sans flex flex-col">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Top Pill Navigation */}
          <TopNav />

          {/* Floating Dock on Left */}
          <FloatingDock />

          {/* Main Content Area (padded on left for dock on wide screens) */}
          <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 xl:pl-24 py-6">
            {children}
          </main>

          {/* Toast notifications */}
          <Toaster
            position="bottom-left"
            toastOptions={{
              className:
                "rounded-[16px] bg-[var(--surface-solid)] text-[var(--ink)] border border-[var(--line)] shadow-xl",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

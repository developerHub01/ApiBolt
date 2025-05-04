import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import PreventDefaultActions from "@/components/PreventDefaultActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "API Bolt",
  description:
    "API Bolt, a REST API client with awesome categorization and local first approach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="forest-light"
          themes={[
            "forest-light",
            "forest-dark",
            "ice-wave",
            "storm-blue",
            "violet-blaze",
            "void-violet",
            "white-smoke",
            "blackout",
          ]}
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <PreventDefaultActions />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavDock } from "@/components/primitives/NavDock";
import { ScrollProgress } from "@/components/primitives/ScrollProgress";
import { ScrollToTop } from "@/components/primitives/ScrollToTop";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  title: "Dr. Mahek Batra — Resident Dentist · MDS · Researcher",
  description:
    "Dr. Mahek Batra — Gold Medalist Resident Dentist, MDS in Conservative Dentistry & Endodontics, four-time published author and government-registered researcher. Smile care, skincare, beauty tips and clinical excellence.",
  metadataBase: new URL("https://mahekbatra.example.com"),
  openGraph: {
    title: "Dr. Mahek Batra — Resident Dentist · MDS · Researcher",
    description:
      "Gold Medalist Resident Dentist, MDS in Conservative Dentistry & Endodontics with four publications.",
    images: ["/mahek-graduation.jpeg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1620" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delay={120}>
            <ScrollProgress />
            {children}
            <NavDock />
            <ScrollToTop />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

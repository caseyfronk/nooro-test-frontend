import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { RocketLogo } from "@/components/rocket-logo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Casey's Todo App",
  description: "A todo app following a provided Figma design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <header className="bg-[#0d0d0d]">
          <nav className="mx-auto flex h-50 max-w-[736px] items-center justify-center gap-3 p-3">
            <div className="flex items-center gap-3 text-5xl font-bold">
              <RocketLogo />
              <span className="text-[#4EA8DE]">Todo</span>
              <span className="text-secondary">App</span>
            </div>
          </nav>
        </header>
        <div className="mx-auto max-w-[736px]">{children}</div>
        <Toaster position="bottom-center" richColors duration={2000} />
      </body>
    </html>
  );
}

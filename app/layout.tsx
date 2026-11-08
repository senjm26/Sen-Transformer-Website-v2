import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sen Engineering Solutions, Inc.",
  description: "A transformer company specializing in SPFC",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}

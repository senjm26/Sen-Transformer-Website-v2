import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = "Sen Engineering Solutions | SMART Power Flow Controller (Sen Transformer)";
const description =
  "The SMART Power Flow Controller gives utilities independent control of active and reactive power flow, built from proven transformer and tap-changer technology. A 33 kV, ±6.5 MVA commercial-grade Sen Transformer has been built and tested.";

// sentransformer.com redirects here, so this is the canonical address
const siteUrl = "https://www.sentransformer.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Sen Engineering Solutions, Inc.",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

// Structured data so search engines know who the company is and what it makes
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Sen Engineering Solutions, Inc.",
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      description,
      email: "senkk@sentransformer.com",
      founder: [
        { "@type": "Person", name: "Kalyan K. Sen", jobTitle: "President & Chief Technology Officer" },
        { "@type": "Person", name: "Mey Ling Sen", jobTitle: "Chief Operating Officer" },
      ],
    },
    {
      "@type": "Product",
      name: "SMART Power Flow Controller (Sen Transformer)",
      description:
        "An impedance regulating transformer that controls active and reactive power flow independently, along with voltage, phase angle, and impedance, using proven transformer and load tap changer technology.",
      image: `${siteUrl}/sentransformer.jpg`,
      brand: { "@id": `${siteUrl}/#organization` },
      manufacturer: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        suppressHydrationWarning
        className="antialiased"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}

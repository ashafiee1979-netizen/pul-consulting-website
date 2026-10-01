import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#061D30",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pul-consulting-website.vercel.app"),
  title: {
    default: "PUL Consulting Services | Bridging the Gap Since 2010",
    template: "%s | PUL Consulting Services",
  },
  description:
    "Official website of PUL Consulting Services, established 2010. Strategic project governance, nationwide workforce deployment, institutional capacity building, and managed logistics for donor agencies and global enterprises.",
  keywords: [
    "PUL Consulting Services",
    "PUL Consulting",
    "Consultancy Afghanistan",
    "Project Management Kabul",
    "USAID Implementing Partner Afghanistan",
    "World Bank Partner",
    "GIZ Afghanistan",
    "Workforce Outsourcing",
    "PUL Global Partners",
    "Linguist Point International",
    "Program Governance",
    "Third-Party Monitoring",
    "Field Logistics"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PUL Consulting Services | Bridging the Gap Since 2010",
    description:
      "Strategic project governance, nationwide workforce deployment, institutional capacity building, and managed logistics for donor agencies and global enterprises.",
    url: "https://pul-consulting-website.vercel.app",
    siteName: "PUL Consulting Services",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PUL Consulting Services | Bridging the Gap Since 2010",
    description:
      "Strategic project governance, nationwide workforce deployment, institutional capacity building, and managed logistics for donor agencies and global enterprises.",
  },
  icons: {
    icon: "/assets/brand/pul-consulting.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen text-corp-ink antialiased selection:bg-corp-blue selection:text-white">
        {children}
      </body>
    </html>
  );
}

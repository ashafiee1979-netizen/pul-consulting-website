import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PUL Consulting Services | Bridging the Gap Since 2010",
  description:
    "Official website of PUL Consulting Services, established 2010 in Kabul, Afghanistan. Parent enterprise providing Project Management, Workforce Outsourcing, Nationwide Capacity Building, and Integrated Logistics for USAID, World Bank, GIZ, and multinational enterprises.",
  keywords: [
    "PUL Consulting Services",
    "PUL Consulting",
    "Consultancy Afghanistan",
    "Project Management Kabul",
    "USAID Partner Afghanistan",
    "World Bank Partner",
    "GIZ Afghanistan",
    "Workforce Outsourcing",
    "PUL Global Partners",
    "Linguist Point International",
    "Halal Catering Services Kabul"
  ],
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

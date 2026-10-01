import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audited Project Registry & Evidence | PUL Consulting Services",
  description:
    "Curated registry of 17 landmark programs representing over 30+ cumulative contracts across 15+ provinces since 2010 for USAID, GIZ, The World Bank, Huawei, and Etisalat.",
  openGraph: {
    title: "Audited Project Registry & Evidence | PUL Consulting Services",
    description: "Verified program execution since 2010, nationwide workforce mobilization, and technical operations for multilateral donors and global contractors.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

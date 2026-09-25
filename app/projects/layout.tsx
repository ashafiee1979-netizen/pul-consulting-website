import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audited Project Registry & Evidence | PUL Consulting Services",
  description:
    "Curated registry of 16 landmark programs representing over 14 years and 30+ cumulative contracts across 15+ provinces for USAID, GIZ, The World Bank, Huawei, and Etisalat.",
  openGraph: {
    title: "Audited Project Registry & Evidence | PUL Consulting Services",
    description: "14+ years of verified program execution, nationwide workforce mobilization, and technical operations for multilateral donors and global contractors.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

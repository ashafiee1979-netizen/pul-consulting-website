import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Capabilities & Solutions | PUL Consulting Services",
  description:
    "Explore 15 specialized practice areas across 4 strategic pillars: Strategic PMO & Governance, Technology & Enterprise AI, Large-Scale Workforce Operations, and Multilingual Logistics.",
  openGraph: {
    title: "Practice Capabilities & Solutions | PUL Consulting Services",
    description: "15 practice areas delivering governed project management, digital transformation, and field operations across complex operating theaters.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

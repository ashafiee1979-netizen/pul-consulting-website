import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | PUL Consulting Services",
  description:
    "Terms of Service governing the use of the PUL Consulting Services website, capability statements, and preliminary RFP consultation inquiries.",
  openGraph: {
    title: "Terms of Service | PUL Consulting Services",
    description:
      "Institutional terms and conditions for PUL Consulting Services website and services.",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

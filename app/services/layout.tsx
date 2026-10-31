import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services & Solutions",
  description: "Explore project management, workforce services, training, technology, language services, and operational support from PUL Consulting and its specialist partners.",
  openGraph: {
    title: "Services & Solutions | PUL Consulting Services",
    description: "Explore project management, workforce services, training, technology, language services, and operational support from PUL Consulting and its specialist partners.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

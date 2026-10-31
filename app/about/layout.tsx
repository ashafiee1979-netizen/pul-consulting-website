import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Us & Our Partners",
  description: "Established in Kabul in 2010, PUL Consulting combines local delivery experience with specialist partners in advisory, language services, and technology.",
  openGraph: {
    title: "About Us & Our Partners | PUL Consulting Services",
    description: "Established in Kabul in 2010, PUL Consulting combines local delivery experience with specialist partners in advisory, language services, and technology.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

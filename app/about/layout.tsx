import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us & Global Partner Network | PUL Consulting Services",
  description:
    "Established in Kabul in 2010. PMP® & Scrum certified management governance, audited operational delivery, and global consortium including PUL Global Partners (USA), Linguist Point, and Quantu Tech.",
  openGraph: {
    title: "About Us & Global Partner Network | PUL Consulting Services",
    description: "14+ years of continuous operational governance and dual-continent reach connecting Kabul HQ with U.S. federal and global commercial partners.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PUL Consulting Services",
  description:
    "Privacy Policy for PUL Consulting Services. Learn how we handle corporate inquiries, donor communications, and professional data in compliance with international standards.",
  openGraph: {
    title: "Privacy Policy | PUL Consulting Services",
    description:
      "Privacy policy and data protection principles of PUL Consulting Services.",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

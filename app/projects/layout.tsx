import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "Projects & Experience",
  description: "Explore 34 historical assignments in workforce management, training, telecom operations, and project support across Afghanistan since 2010.",
  openGraph: {
    title: "Projects & Experience | PUL Consulting Services",
    description: "Explore 34 historical assignments in workforce management, training, telecom operations, and project support across Afghanistan since 2010.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

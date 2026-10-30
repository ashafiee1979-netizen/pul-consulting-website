import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Experience",
  description: "Explore 17 featured assignments in workforce management, training, telecom operations, and project support across Afghanistan since 2010.",
  openGraph: {
    title: "Projects & Experience | PUL Consulting Services",
    description: "Explore 17 featured assignments in workforce management, training, telecom operations, and project support across Afghanistan since 2010.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

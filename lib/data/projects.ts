export type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  repoUrl: string;
  demoUrl?: string;
};

export const projects: ProjectItem[] = [
  {
    slug: "retro-portfolio",
    title: "Retro Portfolio",
    description: "Interactive portfolio with typing race and nostalgic UI.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    repoUrl: "https://github.com/",
  },
  {
    slug: "typing-engine",
    title: "Typing Engine",
    description: "Reusable typing test logic with real-time WPM and accuracy tracking.",
    tech: ["React", "Zustand", "Zod"],
    repoUrl: "https://github.com/",
  },
];
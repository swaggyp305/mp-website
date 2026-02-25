import Link from "next/link";
import { notFound } from "next/navigation";
import RetroContainer from "@/components/layout/RetroContainer";
import { projects } from "@/lib/data/projects";

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((entry) => entry.slug === params.slug);
  if (!project) notFound();

  return (
    <RetroContainer>
      <Link href="/projects" className="text-sm underline">
        ← Back to projects
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">{project.title}</h1>
      <p className="mt-3 leading-relaxed">{project.description}</p>
      <p className="mt-3 text-sm">Stack: {project.tech.join(", ")}</p>
      <div className="mt-5 flex gap-3 text-sm">
        <a className="underline" href={project.repoUrl} target="_blank" rel="noreferrer">
          Repository
        </a>
        {project.demoUrl ? (
          <a className="underline" href={project.demoUrl} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        ) : null}
      </div>
    </RetroContainer>
  );
}
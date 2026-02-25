import Link from "next/link";
import RetroContainer from "@/components/layout/RetroContainer";
import { projects } from "@/lib/data/projects";

export default function ProjectsPage() {
  return (
    <RetroContainer>
      <h1 className="text-2xl font-semibold">Projects</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.slug} className="rounded border-2 border-dark-brown bg-paper-bg p-4">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="mt-2 text-sm">{project.description}</p>
            <p className="mt-3 text-xs uppercase tracking-wider text-dark-brown/70">{project.tech.join(" • ")}</p>
            <Link href={`/projects/${project.slug}`} className="focus-ring mt-4 inline-block rounded border border-dark-brown px-3 py-1 text-sm hover:bg-beige">
              Case Study
            </Link>
          </article>
        ))}
      </div>
    </RetroContainer>
  );
}
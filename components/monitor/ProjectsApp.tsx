import Link from "next/link";
import { projects } from "@/lib/data/projects";

export function ProjectsApp() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-dark-brown">Projects</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.slug} className="rounded border border-dark-brown bg-paper-bg p-3">
            <h3 className="font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm">{project.description}</p>
            <p className="mt-2 text-[11px] uppercase tracking-wide text-dark-brown/70">{project.tech.join(" • ")}</p>
            <Link href={`/projects/${project.slug}`} className="focus-ring mt-2 inline-block rounded border border-dark-brown px-2 py-1 text-xs hover:bg-beige">
              Open Case Study
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

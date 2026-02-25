import Link from "next/link";
import RetroContainer from "@/components/layout/RetroContainer";
import ViewModeToggle from "@/components/layout/ViewModeToggle";
import { profile } from "@/lib/data/profile";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <ViewModeToggle />
      <RetroContainer>
        <p className="font-terminal text-monitor-amber">BOOTING PORTFOLIO.EXE...</p>
        <h1 className="mt-3 text-3xl font-semibold">{profile.name}</h1>
        <p className="mt-2 text-lg">{profile.title}</p>
        <p className="mt-4 max-w-3xl leading-relaxed">{profile.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/projects" className="focus-ring rounded border-2 border-dark-brown px-4 py-2 hover:bg-beige">
            View Projects
          </Link>
          <Link href="/typing" className="focus-ring rounded border-2 border-dark-brown px-4 py-2 hover:bg-beige">
            Start Typing Race
          </Link>
        </div>
      </RetroContainer>
    </div>
  );
}
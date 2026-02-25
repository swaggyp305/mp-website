import RetroContainer from "@/components/layout/RetroContainer";
import { profile } from "@/lib/data/profile";

export default function AboutPage() {
  return (
    <RetroContainer>
      <h1 className="text-2xl font-semibold">About</h1>
      <div className="mt-4 space-y-3 leading-relaxed">
        {profile.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </RetroContainer>
  );
}
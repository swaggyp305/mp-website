import { profile } from "@/lib/data/profile";

export function AboutApp() {
  return (
    <div className="space-y-3 text-dark-brown">
      <h2 className="text-xl font-semibold">About</h2>
      {profile.bio.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

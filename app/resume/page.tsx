import RetroContainer from "@/components/layout/RetroContainer";

const experiences = [
  { role: "Software Engineer", company: "Your Company", range: "2023–Present", summary: "Built full-stack apps with TypeScript and cloud-native architecture." },
  { role: "Developer", company: "Previous Team", range: "2021–2023", summary: "Shipped product features and improved performance across web services." },
];

export default function ResumePage() {
  return (
    <RetroContainer>
      <h1 className="text-2xl font-semibold">Resume</h1>
      <ol className="mt-6 space-y-4">
        {experiences.map((experience) => (
          <li key={`${experience.company}-${experience.role}`} className="rounded border-2 border-dark-brown p-4">
            <h2 className="text-lg font-semibold">{experience.role}</h2>
            <p className="text-sm">{experience.company} • {experience.range}</p>
            <p className="mt-2">{experience.summary}</p>
          </li>
        ))}
      </ol>
      <a href="/resume.pdf" className="focus-ring mt-6 inline-block rounded border-2 border-dark-brown px-4 py-2 hover:bg-beige">
        Download PDF
      </a>
    </RetroContainer>
  );
}
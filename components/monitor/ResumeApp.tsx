const experiences = [
  { role: "Software Engineer", company: "Your Company", range: "2023–Present", summary: "Built full-stack apps with TypeScript and cloud-native architecture." },
  { role: "Developer", company: "Previous Team", range: "2021–2023", summary: "Shipped product features and improved performance across web services." },
];

export function ResumeApp() {
  return (
    <div className="space-y-3 text-dark-brown">
      <h2 className="text-xl font-semibold">Resume</h2>
      <ol className="space-y-2">
        {experiences.map((experience) => (
          <li key={`${experience.company}-${experience.role}`} className="rounded border border-dark-brown bg-paper-bg p-3">
            <h3 className="font-semibold">{experience.role}</h3>
            <p className="text-xs">{experience.company} • {experience.range}</p>
            <p className="mt-1 text-sm">{experience.summary}</p>
          </li>
        ))}
      </ol>
      <a href="/resume.pdf" className="focus-ring inline-block rounded border border-dark-brown px-3 py-1 text-sm hover:bg-beige">
        Download PDF
      </a>
    </div>
  );
}

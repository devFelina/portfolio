import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const GitHubIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12 .5C5.73.5.75 5.64.75 12.02c0 5.1 3.2 9.42 7.64 10.95.56.1.77-.25.77-.55 0-.27-.01-1.02-.02-2-3.11.7-3.77-1.55-3.77-1.55-.51-1.34-1.25-1.7-1.25-1.7-1.03-.72.08-.71.08-.71 1.14.08 1.74 1.2 1.74 1.2 1 .18 1.96.1 2.44.02.1-.75.39-1.2.7-1.48-2.48-.29-5.08-1.28-5.08-5.68 0-1.25.43-2.27 1.14-3.07-.12-.29-.49-1.46.11-3.03 0 0 .93-.3 3.05 1.17.89-.25 1.84-.37 2.79-.37.95 0 1.9.12 2.79.37 2.12-1.47 3.05-1.17 3.05-1.17.6 1.57.23 2.74.11 3.03.71.8 1.14 1.82 1.14 3.07 0 4.41-2.6 5.38-5.09 5.67.4.35.77 1.03.77 2.08 0 1.5-.01 2.71-.01 3.08 0 .3.2.66.78.55 4.43-1.53 7.63-5.85 7.63-10.95C23.25 5.64 18.27.5 12 .5Z" />
  </svg>
);

const projects = [
  {
    year: "2026",
    title: "Nexar — Quantum/Classical Workload Orchestration",
    description:
      "Routes workloads between classical compute, quantum simulators, and quantum hardware.",
    tags: ["Python", "TypeScript", "FastAPI", "React"],
    extra: "+3",
    url: "#",
    githubUrl: "#",
  },
  {
    year: "2026",
    title: "LaundrIQ — Cloud-Native Laundry Management",
    description:
      "Microservices-based laundry platform with CI/CD, DevSecOps, and containerized deployment.",
    tags: ["TypeScript", "Java", "Docker", "Terraform"],
    extra: "+3",
    url: "#",
    githubUrl: "#",
  },
  {
    year: "2026",
    title: "POSiFy — Digital Restaurant (SaaS POS)",
    description:
      "Cloud-based, multi-tenant SaaS POS platform for restaurants and cafes.",
    tags: ["TypeScript", "Java", "Docker"],
    extra: "UI",
    url: "#",
    githubUrl: "#",
  },
  {
    year: "2025",
    title: "AtlasFlow — Analytics Dashboard",
    description:
      "A real-time analytics dashboard with elegant reporting, filtering, and role-aware views.",
    tags: ["React", "Tailwind", "Charts", "Node.js"],
    extra: "Live",
    url: "#",
    githubUrl: "#",
  },
  {
    year: "2025",
    title: "NovaStudio — Portfolio Builder",
    description:
      "A fast portfolio builder for creators with reusable sections and polished motion.",
    tags: ["React", "Vite", "Framer Motion", "CSS"],
    extra: "UX",
    url: "#",
    githubUrl: "#",
  },
  {
    year: "2024",
    title: "PulseTrack — Team Operations Hub",
    description:
      "A lightweight operations hub for collaboration, visibility, and progress tracking.",
    tags: ["TypeScript", "API", "PostgreSQL"],
    extra: "SaaS",
    url: "#",
    githubUrl: "#",
  },
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-28 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-8rem] top-[-6rem] h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[-10rem] top-32 h-96 w-96 rounded-full bg-white/4 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-14 sm:mb-16 animate-fade-in">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-muted-foreground">
            Selected Work
          </span>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            A few things I&apos;ve built.
          </h2>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-8 text-muted-foreground">
            A small, opinionated selection of projects from the past few years, each one a
            chance to make something feel inevitable.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-card/70 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-card/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 80}ms` }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_35%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs sm:text-sm tracking-[0.28em] uppercase text-muted-foreground">
                    {project.year}
                  </p>
                  <h3 className="mt-4 text-2xl sm:text-[1.7rem] font-semibold leading-tight text-foreground max-w-[16ch]">
                    {project.title}
                  </h3>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/40 text-muted-foreground transition-colors duration-300 group-hover:border-white/30 group-hover:text-foreground">
                  <button
                    type="button"
                    aria-label={`Open ${project.title}`}
                    onClick={() => setSelectedProject(project)}
                    className="flex h-full w-full items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="relative mt-6 max-w-md text-sm sm:text-base leading-7 text-muted-foreground">
                {project.description}
              </p>

              <div className="relative mt-8 flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/80 bg-background/30 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:border-white/15 group-hover:text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="relative mt-8 flex items-center justify-between border-t border-border/60 pt-5 text-xs sm:text-sm text-muted-foreground">
                <span>{project.extra}</span>
                <span className="tracking-[0.25em] uppercase">Featured</span>
              </div>
            </article>
          ))}
        </div>

        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
            <button
              type="button"
              aria-label="Close project modal"
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />

            <div className="relative z-10 w-full max-w-2xl rounded-[1.75rem] border border-white/10 bg-[#151515] p-5 sm:p-7 shadow-[0_20px_80px_rgba(0,0,0,0.6)] animate-pop-in">
              <div className="absolute right-4 top-4">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-muted-foreground transition-colors duration-300 hover:border-white/30 hover:text-foreground"
                  aria-label="Close project details"
                >
                  <span className="text-xl leading-none">×</span>
                </button>
              </div>

              <div className="animate-fade-in animation-delay-100">
                <p className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-primary/80">
                  {selectedProject.year} • Contributor / Developer
                </p>
                <h3 className="mt-4 max-w-xl text-3xl sm:text-4xl font-bold leading-tight text-foreground">
                  {selectedProject.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base sm:text-lg leading-8 text-muted-foreground">
                  {selectedProject.description}
                </p>

                <div className="mt-8">
                  <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-muted-foreground">
                    Tech Stack
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
                  >
                    Visit
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open GitHub"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-white/30 hover:bg-white/5"
                  >
                    <GitHubIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
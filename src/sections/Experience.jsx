import { BrainCircuit, Layers3, Timer, Workflow } from "lucide-react";
import { engineeringExperience, projectHighlights } from "@/data/experience";

const experienceIcons = {
  "full-stack": Layers3,
  "ai-systems": BrainCircuit,
  "apis-data": Workflow,
  delivery: Timer,
};

export const Experience = () => (
  <section id="experience" className="relative overflow-hidden py-28 sm:py-32">
    <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(88%,80rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-border-strong to-transparent" aria-hidden="true" />
    <div className="container mx-auto px-6">
      <div className="max-w-3xl">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm">Practical Work</span>
        <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">Engineering Experience</h2>
        <p className="mt-5 text-base leading-8 text-secondary-foreground sm:text-lg">Hands-on experience through projects and collaborative development.</p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 sm:mt-16">
        {engineeringExperience.map((experience) => {
          const Icon = experienceIcons[experience.id];
          return (
            <article key={experience.id} className="rounded-3xl border border-border bg-surface/65 p-6 transition-[border-color,background-color] duration-200 hover:border-border-strong hover:bg-surface sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background-elevated">
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground sm:text-2xl">{experience.title}</h3>
              <p className="mt-3 text-sm leading-7 text-secondary-foreground sm:text-base">{experience.description}</p>
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Project evidence</p>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label={`Projects demonstrating ${experience.title}`}>
                {experience.projects.map((project) => (
                  <li key={project} className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-secondary-foreground sm:text-sm">{project}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div className="mt-16 border-t border-border pt-10 sm:mt-20 sm:pt-12">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Project Highlights</span>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">Evidence over claims.</h3>
          </div>
          <ol className="divide-y divide-border border-y border-border">
            {projectHighlights.map((highlight, index) => (
              <li key={highlight.id} className="grid gap-3 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5">
                <span className="font-mono text-sm text-accent" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">{highlight.label}</h4>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">{highlight.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);

import { BrainCircuit, Code2, Database, Server, Wrench } from "lucide-react";
import { skillCategories } from "@/data/skills";

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  "ai-ml": BrainCircuit,
  databases: Database,
  tools: Wrench,
};

export const Skills = () => (
  <section id="skills" className="relative overflow-hidden pt-10 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28">
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-accent/[0.04] blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-white/[0.03] blur-3xl" />
    </div>

    <div className="container relative z-10 mx-auto px-6">
      <div className="mb-14 max-w-3xl sm:mb-16">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm">Technical Skills</span>
        <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">Tools for building complete systems.</h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-secondary-foreground sm:text-lg">A practical toolkit developed through AI, data, and full-stack projects—from interface design to deployment.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category) => {
          const Icon = categoryIcons[category.id];
          return (
            <article key={category.id} className="rounded-3xl border border-border bg-surface/65 p-6 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background-elevated">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <h3 className="pt-1.5 text-xl font-semibold leading-7 text-foreground">{category.label}</h3>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${category.label} technologies`}>
                {category.technologies.map((technology) => (
                  <li key={technology} className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm font-medium text-secondary-foreground">{technology}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

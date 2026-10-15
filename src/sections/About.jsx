import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
  { icon: Lightbulb, title: "Applied AI", description: "Building machine-learning and language-model workflows around practical product needs." },
  { icon: Rocket, title: "Full-Stack Delivery", description: "Connecting interfaces, APIs, and data into complete applications people can use." },
  { icon: Code2, title: "Clean Engineering", description: "Writing maintainable code with a focus on clarity, performance, and reliable behavior." },
  { icon: Users, title: "Collaboration", description: "Working with communities and teams while continuing to learn, share, and improve." },
];

export const About = () => (
  <section id="about" className="relative overflow-hidden py-28 sm:py-32">
    <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(88%,80rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-border-strong to-transparent" aria-hidden="true" />
    <div className="container relative z-10 mx-auto px-6">
      <div className="mb-14 max-w-3xl sm:mb-16">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm">About Me</span>
        <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">Building across AI and product.</h2>
      </div>

      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 xl:gap-28">
        <div className="space-y-5 text-base leading-8 text-secondary-foreground sm:text-lg">
          <p>I&apos;m Kushan Chamikara, a third-year AI &amp; Data Science undergraduate focused on turning models and ideas into useful software.</p>
          <p>My work spans machine-learning pipelines, APIs, databases, and React interfaces. I enjoy closing the gap between technical experiments and complete products that can be deployed and used.</p>
          <p className="text-sm font-medium leading-7 text-muted-foreground sm:text-base">IEEE member · AIESEC member · Open-source contributor · Always learning</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-3xl border border-border bg-surface/65 p-6 transition-[border-color,background-color] duration-200 hover:border-border-strong hover:bg-surface">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background-elevated">
                <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

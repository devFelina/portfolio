import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
  { icon: Lightbulb, title: "Applied AI", description: "Building machine-learning and language-model workflows around practical product needs." },
  { icon: Rocket, title: "Full-Stack Delivery", description: "Connecting interfaces, APIs, and data into complete applications people can use." },
  { icon: Code2, title: "Clean Engineering", description: "Writing maintainable code with a focus on clarity, performance, and reliable behavior." },
  { icon: Users, title: "Collaboration", description: "Working with communities and teams while continuing to learn, share, and improve." },
];

export const About = () => (
  <section id="about" className="relative overflow-hidden pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
    <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(88%,80rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-border-strong to-transparent" aria-hidden="true" />
    <div className="container relative z-10 mx-auto px-6">
      <div className="mb-8 max-w-3xl sm:mb-10 lg:mb-12">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm">About Me</span>
        <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">Building across AI and product.</h2>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:gap-16">
        <div className="space-y-4 text-base leading-relaxed text-secondary-foreground sm:text-lg">
          <p>I&apos;m Kushan Chamikara, a third-year AI &amp; Data Science undergraduate focused on turning models and ideas into useful software.</p>
          <p>My work spans machine-learning pipelines, APIs, databases, and React interfaces. I enjoy closing the gap between technical experiments and complete products that can be deployed and used.</p>
          <p className="text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">IEEE member · AIESEC member · Open-source contributor · Always learning</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-4">
          {highlights.map((item) => (
            <article key={item.title} className="flex flex-col justify-between rounded-2xl border border-border bg-surface/65 p-5 transition-[border-color,background-color] duration-200 hover:border-border-strong hover:bg-surface sm:p-6">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background-elevated">
                  <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-foreground sm:text-lg">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

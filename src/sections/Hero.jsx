import { ArrowRight, ChevronDown, Download } from "lucide-react";
import { LinkButton } from "@/components/Button";
import { heroSkills } from "@/data/skills";
import { socialLinks as sharedSocialLinks } from "@/data/socialLinks";
import heroBgImg from "../assets/hero-bg-2.webp";
import profileImg from "../assets/profile-photo.webp";

const GitHubIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 .5C5.73.5.75 5.64.75 12.02c0 5.1 3.2 9.42 7.64 10.95.56.1.77-.25.77-.55 0-.27-.01-1.02-.02-2-3.11.7-3.77-1.55-3.77-1.55-.51-1.34-1.25-1.7-1.25-1.7-1.03-.72.08-.71.08-.71 1.14.08 1.74 1.2 1.74 1.2 1 .18 1.96.1 2.44.02.1-.75.39-1.2.7-1.48-2.48-.29-5.08-1.28-5.08-5.68 0-1.25.43-2.27 1.14-3.07-.12-.29-.49-1.46.11-3.03 0 0 .93-.3 3.05 1.17.89-.25 1.84-.37 2.79-.37.95 0 1.9.12 2.79.37 2.12-1.47 3.05-1.17 3.05-1.17.6 1.57.23 2.74.11 3.03.71.8 1.14 1.82 1.14 3.07 0 4.41-2.6 5.38-5.09 5.67.4.35.77 1.03.77 2.08 0 1.5-.01 2.71-.01 3.08 0 .3.2.66.78.55 4.43-1.53 7.63-5.85 7.63-10.95C23.25 5.64 18.27.5 12 .5Z" />
  </svg>
);

const LinkedInIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.2 8.25h4.6V23H.2V8.25ZM8.02 8.25h4.41v2.01h.06c.61-1.16 2.11-2.39 4.35-2.39 4.65 0 5.51 3.06 5.51 7.04V23h-4.6v-6.52c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.51 1.7-2.51 3.46V23h-4.6V8.25Z" />
  </svg>
);

const socialIcons = { github: GitHubIcon, linkedin: LinkedInIcon };
const socialLinks = sharedSocialLinks.map((social) => ({ ...social, Icon: socialIcons[social.id] }));
const selectedSkills = ["Python", "React", "TypeScript", "TensorFlow"];
const heroDots = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  duration: `${20 + ((index * 7) % 16)}s`,
  delay: `${(index * 3) % 5}s`,
}));

const SkillList = ({ hidden = false }) => (
  <div className="technology-list flex shrink-0 items-center" aria-hidden={hidden || undefined} data-marquee-copy={hidden || undefined}>
    {heroSkills.map((skill) => (
      <span key={skill} className="shrink-0 px-5 py-3 text-sm font-medium tracking-wide text-muted-foreground/70 sm:px-7 sm:text-base">
        {skill}
      </span>
    ))}
  </div>
);

export const Hero = () => {
  const resumeHref = `${import.meta.env.BASE_URL}Kushan_Chamikara_Resume.pdf`;

  return (
    <section id="hero" className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <img src={heroBgImg} alt="" className="h-full w-full object-cover opacity-25" decoding="async" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_38%,transparent_0%,var(--color-background)_68%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/70 to-background" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {heroDots.map((dot, index) => (
          <span
            key={index}
            className="hero-decorative-dot absolute h-1 w-1 rounded-full bg-white/40"
            style={{ left: dot.left, top: dot.top, animation: `slow-drift ${dot.duration} ease-in-out infinite`, animationDelay: dot.delay }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto my-auto px-6 pb-10 pt-24 sm:pb-14 sm:pt-28 lg:pb-14 lg:pt-28 xl:pt-32">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:gap-12 xl:gap-20">
          <div className="max-w-2xl space-y-5 lg:space-y-6">
            <div className="hero-reveal">
              <span className="inline-flex items-center rounded-full border border-border bg-surface/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-secondary-foreground backdrop-blur-md sm:text-sm">
                AI &amp; Data Science · Full-Stack Development
              </span>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <h1 className="hero-reveal animation-delay-100 text-[clamp(2.25rem,4.2vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.035em]">
                Building intelligent solutions for real-world problems.
              </h1>
              <p className="hero-reveal animation-delay-200 max-w-xl text-base leading-relaxed text-secondary-foreground sm:text-lg">
                I&apos;m Kushan Chamikara. I design and develop full-stack applications, AI-powered systems, and practical software solutions that turn complex ideas into useful digital experiences.
              </p>
            </div>

            <ul className="hero-reveal animation-delay-300 flex flex-wrap gap-2 pt-1" aria-label="Selected technologies">
              {selectedSkills.map((skill) => (
                <li key={skill} className="rounded-full border border-border bg-black/30 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">{skill}</li>
              ))}
            </ul>

            <div className="hero-reveal animation-delay-300 flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
              <LinkButton href="#projects" size="lg" className="w-full sm:w-auto">
                Explore Projects <ArrowRight className="h-5 w-5" />
              </LinkButton>
              <LinkButton href={resumeHref} download="Kushan_Chamikara_Resume.pdf" variant="secondary" size="lg" className="w-full sm:w-auto">
                <Download className="h-5 w-5" /> Download CV
              </LinkButton>
            </div>

            <div className="hero-reveal animation-delay-400 flex items-center gap-3 pt-1">
              <span className="mr-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Connect</span>
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/70 text-secondary-foreground transition-[color,border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface-hover hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <social.Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="hero-reveal animation-delay-200 relative mx-auto w-full max-w-[21rem] sm:max-w-[23rem] lg:mx-0 lg:max-w-[24rem] xl:max-w-[26rem] lg:justify-self-end">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-white/[0.04] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border-strong bg-surface/80 p-2 shadow-2xl shadow-black/50 backdrop-blur-md">
              <div className="overflow-hidden rounded-[1.5rem] bg-background-elevated">
                <img src={profileImg} alt="Kushan Chamikara" className="aspect-[4/5] w-full object-cover object-top" decoding="async" fetchPriority="high" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-black/70 px-3.5 py-2.5 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:gap-3 sm:px-4 sm:py-3">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                </span>
                <span className="text-xs font-medium text-foreground sm:text-sm">Available for work</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-reveal animation-delay-600 mt-10 border-t border-border pt-5 lg:mt-12 lg:pt-6">
          <p className="mb-2.5 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Technologies I work with</p>
          <div className="relative overflow-hidden" role="region" aria-label="Technology list">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-24" />
            <div className="technology-track flex w-max animate-marquee">
              <SkillList />
              <SkillList hidden />
            </div>
          </div>
        </div>
      </div>

      <a href="#about" aria-label="Scroll to About section" className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent xl:flex">
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
};

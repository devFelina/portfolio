import { Button } from "@/components/Button";
import profileImg from '../assets/profile-photo.webp';
import heroBgImg from '../assets/hero-bg-2.webp'; 

import {
  ArrowRight,
  ChevronDown,
  Download,
} from "lucide-react";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";

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

const LinkedInIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.2 8.25h4.6V23H.2V8.25ZM8.02 8.25h4.41v2.01h.06c.61-1.16 2.11-2.39 4.35-2.39 4.65 0 5.51 3.06 5.51 7.04V23h-4.6v-6.52c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.51 1.7-2.51 3.46V23h-4.6V8.25Z" />
  </svg>
);

const skills = [
  "Python",
  "Java",
  "JavaScript",
  "C",
  "Skit-learn",
  "TensorFlow",
  "NLP",
  "Random Forest",
  "OpenAI API",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Vercel",
  "Tailwind CSS",
  "Figma",
  "Git",
  "GitHub Actions",
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/devFelina",
    Icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kushan-chamikara-a24933279/",
    Icon: LinkedInIcon,
  },
];

export const Hero = () => {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = `${import.meta.env.BASE_URL}Kushan_Chamikara_Resume.pdf`; // Points directly to public folder
    link.download = "Kushan_Chamikara_Resume.pdf"; // Suggests this filename on download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0">
        <img
          src={heroBgImg} // 2. Updated from string literal to the imported variable
          alt="Hero image"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
      </div>

      {/* Green Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "var(--color-primary)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slow-drift ${
                15 + Math.random() * 20
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary border border-white/10 bg-black hover:bg-white/5 transition-colors duration-300">
                AI & Data Science • Full-Stack Development
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                Making better world with <span className="text-primary glow-text">AI</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                Hi, I'm Kushan Chamikara — an AI undergraduate at SLIIT. <br />
                I see patterns in everything around me. <br />
                I connect data, uncover structure, and turn it into solutions.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <Button
                size="lg"
                onClick={scrollToProjects}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-black bg-white hover:bg-white/90"
              >
                View Projects <ArrowRight className="w-5 h-5" />
              </Button>
              <AnimatedBorderButton onClick={handleDownloadCV}>
                <Download className="w-5 h-5" />
                Download CV
              </AnimatedBorderButton>
            </div>

            <div className="flex flex-wrap items-center gap-3 animate-fade-in animation-delay-400">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex items-center justify-center rounded-full glass p-3 text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary hover:border-primary/50"
                >
                  <social.Icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
          {/* Right Column - Profile Image */}
          <div className="relatice animate-fade-in animation-delay-300">
            {/* Profile Image */}
            <div className="relative max-w-sm mx-auto">
              <div
                className="absolute inset-0 
              rounded-3xl bg-gradient-to-br 
              from-primary/30 via-transparent 
              to-primary/10 blur-2xl animate-pulse"
              />
              <div className="relative glass rounded-3xl p-2 glow-border">
                <img
                  src={profileImg} // 3. Updated from string literal to the imported variable
                  alt="Kushan Chamikara"
                  className="w-full aspect-[4/5] object-cover rounded-2xl"
                />

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 glass rounded-xl px-4 py-3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">
                      Available for work
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Technologies I work with
          </p>
          <div className="relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 w-32
             bg-gradient-to-r from-background to-transparent z-10"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-32
             bg-gradient-to-l from-background to-transparent z-10"
            />
            <div className="flex animate-marquee">
              {[...skills, ...skills].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 px-8 py-4">
                  <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 
      animate-fade-in animation-delay-800"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
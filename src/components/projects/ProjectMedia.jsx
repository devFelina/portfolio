import { useState } from "react";

const getProjectInitials = (title) =>
  title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const ProjectFallback = ({ project, failed = false }) => (
  <div
    className="relative isolate flex h-full w-full items-center justify-center overflow-hidden bg-background-elevated"
    aria-label={`${project.title} ${failed ? "preview unavailable" : "abstract project identifier"}`}
    role="img"
  >
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
    <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
    <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
    <span className="relative select-none text-5xl font-bold tracking-[-0.08em] text-white/15 sm:text-6xl">
      {getProjectInitials(project.title)}
    </span>
    <span className="absolute bottom-4 left-4 rounded-full border border-border bg-black/55 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
      {failed ? "Preview unavailable" : "Project preview"}
    </span>
  </div>
);

const ProjectImage = ({ project, modal }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) return <ProjectFallback project={project} failed />;

  return (
    <img
      src={project.image}
      alt={project.imageAlt || `${project.title} application interface`}
      width="1600"
      height="1000"
      loading="lazy"
      decoding="async"
      draggable="false"
      onError={() => setHasError(true)}
      className={`h-full w-full bg-background-elevated ${
        modal ? "object-contain" : "object-cover"
      }`}
      style={{ objectPosition: project.imagePosition || "center" }}
    />
  );
};

export const ProjectMedia = ({ project, modal = false }) => (
  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-border bg-background-elevated">
    {project.image ? (
      <ProjectImage key={project.image} project={project} modal={modal} />
    ) : (
      <ProjectFallback project={project} />
    )}
  </div>
);

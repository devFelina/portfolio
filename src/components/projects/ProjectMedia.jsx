const getProjectInitials = (title) =>
  title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export const ProjectMedia = ({ project, featured = false }) => {
  const aspectClass = featured ? "aspect-[16/9]" : "aspect-[16/10]";

  if (project.image) {
    return (
      <div className={`${aspectClass} overflow-hidden bg-background-elevated`}>
        <img
          src={project.image}
          alt={project.imageAlt || `${project.title} interface screenshot`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div
      className={`${aspectClass} relative isolate overflow-hidden bg-background-elevated`}
      aria-label={`${project.title} abstract project identifier`}
      role="img"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
      <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
      <div className="relative flex h-full items-center justify-center">
        <span className="select-none text-5xl font-bold tracking-[-0.08em] text-white/15 sm:text-6xl">
          {getProjectInitials(project.title)}
        </span>
      </div>
      <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-sm">
        Project preview
      </span>
    </div>
  );
};

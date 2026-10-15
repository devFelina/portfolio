import { LinkButton } from "@/components/Button";
import { GitHubIcon } from "@/components/GitHubIcon";
import { ExternalLink } from "lucide-react";
import { ProjectMedia } from "./ProjectMedia";

export const ProjectCard = ({ project, featured = false, onViewDetails }) => {
  const hasLiveDemo =
    project.liveUrl && project.liveUrl !== project.repositoryUrl;
  const projectType = project.projectType?.join(" · ");

  return (
    <article
      className={`group flex h-full min-w-0 flex-col overflow-hidden border border-border bg-card/80 transition-[transform,border-color,background-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-border-strong hover:bg-surface-hover hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)] focus-within:border-border-strong ${
        featured ? "rounded-[2rem]" : "rounded-[1.5rem]"
      }`}
    >
      <ProjectMedia project={project} featured={featured} />

      <div className={`flex flex-1 flex-col ${featured ? "p-6 sm:p-8" : "p-5 sm:p-6"}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <span>{project.year}</span>
          {project.category && (
            <>
              <span aria-hidden="true">•</span>
              <span>{project.category}</span>
            </>
          )}
          {featured && (
            <span className="ml-auto rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[0.65rem] tracking-[0.18em] text-accent">
              Showcase
            </span>
          )}
        </div>

        {projectType && (
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-secondary-foreground">
            {projectType}
          </p>
        )}

        <h3
          className={`${projectType ? "mt-2" : "mt-4"} font-semibold leading-tight text-foreground ${
            featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          }`}
        >
          {project.title}
        </h3>

        <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-border bg-background/35 px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-6">
          <button
            type="button"
            onClick={(event) => onViewDetails(project, event.currentTarget)}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`View details for ${project.title}`}
          >
            View Details
          </button>

          {hasLiveDemo && (
            <LinkButton
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
              className="border border-border px-4"
              aria-label={`Open live demo for ${project.title}`}
            >
              Live Demo
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
          )}

          {project.repositoryUrl && (
            <LinkButton
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="icon"
              className="border border-border"
              aria-label={`Open GitHub repository for ${project.title}`}
              title="GitHub repository"
            >
              <GitHubIcon className="h-5 w-5" />
            </LinkButton>
          )}
        </div>
      </div>
    </article>
  );
};

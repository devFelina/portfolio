import { LinkButton } from "@/components/Button";
import { GitHubIcon } from "@/components/GitHubIcon";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { ProjectMedia } from "./ProjectMedia";

export const ProjectModal = ({ project, onClose, returnFocusRef }) => {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = useId();
  const hasLiveDemo =
    project.liveUrl && project.liveUrl !== project.repositoryUrl;
  const projectType = project.projectType?.join(" · ");

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousTrigger = returnFocusRef.current;

    if (!dialog) return undefined;

    document.body.style.overflow = "hidden";
    dialog.showModal();

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;

      if (dialog.open) dialog.close();

      if (previousTrigger?.isConnected) {
        previousTrigger.focus();
      } else {
        document.getElementById("projects-heading")?.focus();
      }
    };
  }, [project.id, returnFocusRef]);

  const handleDialogClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleDialogClick}
      onCancel={handleCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-[1.75rem] border border-border-strong bg-transparent p-0 text-foreground shadow-[0_30px_100px_rgba(0,0,0,0.75)] backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <article className="animate-project-modal relative flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden bg-surface">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-black/70 text-foreground backdrop-blur-md transition-colors duration-200 hover:border-border-strong hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:right-5 sm:top-5"
          aria-label={`Close ${project.title} details`}
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="overflow-y-auto overscroll-contain">
          <ProjectMedia project={project} featured />

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {project.category && <span>{project.category}</span>}
              {project.category && <span aria-hidden="true">•</span>}
              <span>{project.year}</span>
            </div>

            {projectType && (
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {projectType}
              </p>
            )}

            <h2
              id={titleId}
              className="mt-4 max-w-3xl pr-10 text-3xl font-bold leading-tight text-foreground sm:text-4xl"
            >
              {project.title}
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-7 text-secondary-foreground sm:text-lg sm:leading-8">
              {project.details || project.summary}
            </p>

            <section className="mt-8" aria-labelledby={`${titleId}-technologies`}>
              <h3
                id={`${titleId}-technologies`}
                className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
              >
                Technology stack
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-border bg-background/40 px-3.5 py-1.5 text-sm font-medium text-secondary-foreground"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </section>

            {project.features?.length > 0 && (
              <section className="mt-8" aria-labelledby={`${titleId}-features`}>
                <h3
                  id={`${titleId}-features`}
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
                >
                  Core features
                </h3>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-secondary-foreground sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.context && (
              <div className="mt-8 rounded-2xl border border-border bg-background/35 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Context
                </p>
                <p className="mt-3 text-sm leading-6 text-secondary-foreground">
                  {project.context}
                </p>
              </div>
            )}

            {project.role && (
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Role
                </p>
                <p className="mt-3 text-base text-foreground">{project.role}</p>
              </div>
            )}

            {(hasLiveDemo || project.repositoryUrl) && (
              <div className="mt-10 flex flex-wrap gap-3 border-t border-border pt-6">
                {hasLiveDemo && (
                  <LinkButton
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    variant="secondary"
                    aria-label={`Open GitHub repository for ${project.title}`}
                  >
                    <GitHubIcon className="h-5 w-5" />
                    GitHub
                  </LinkButton>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </dialog>
  );
};

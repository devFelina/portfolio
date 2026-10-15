import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { projects } from "@/data/projects";
import { useCallback, useMemo, useRef, useState } from "react";

// Presentation-only selection. This does not change factual `featured` metadata.
const showcaseProjectIds = [
  "ai-house-planner",
  "fenceguard-lk",
  "car-price-prediction-system",
  "car-dealership-mern-application",
];
const showcaseProjectIdSet = new Set(showcaseProjectIds);

const technologyFilters = [
  { id: "all", label: "All", technologies: null },
  { id: "python", label: "Python", technologies: ["Python"] },
  { id: "react", label: "React", technologies: ["React", "React.js"] },
  { id: "javascript", label: "JavaScript", technologies: ["JavaScript"] },
  { id: "java", label: "Java", technologies: ["Java"] },
];

const matchesFilter = (project, filter) =>
  !filter.technologies ||
  filter.technologies.some((technology) =>
    project.technologies.includes(technology),
  );

export const Projects = () => {
  const [activeFilterId, setActiveFilterId] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const returnFocusRef = useRef(null);

  const filters = useMemo(
    () =>
      technologyFilters.map((filter) => ({
        ...filter,
        count: projects.filter((project) => matchesFilter(project, filter)).length,
      })),
    [],
  );

  const activeFilter =
    filters.find((filter) => filter.id === activeFilterId) ?? filters[0];

  const filteredProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project, activeFilter)),
    [activeFilter],
  );

  const showcaseProjects = showcaseProjectIds
    .map((projectId) =>
      filteredProjects.find((project) => project.id === projectId),
    )
    .filter(Boolean);
  const standardProjects = filteredProjects.filter(
    (project) => !showcaseProjectIdSet.has(project.id),
  );

  const openProject = useCallback((project, trigger) => {
    returnFocusRef.current = trigger;
    setSelectedProject(project);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden py-28 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-8rem] top-[-6rem] h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[-10rem] top-32 h-96 w-96 rounded-full bg-white/4 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-3xl animate-fade-in">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground sm:text-sm">
            Selected Work
          </span>
          <h2
            id="projects-heading"
            tabIndex={-1}
            className="mt-5 text-4xl font-bold leading-tight text-foreground focus:outline-none sm:text-5xl lg:text-6xl"
          >
            A few things I&apos;ve built.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            A small, opinionated selection of projects from the past few years, each one a
            chance to make something feel inevitable.
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          <ProjectFilters
            filters={filters}
            activeFilter={activeFilterId}
            onFilterChange={setActiveFilterId}
          />
          <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {showcaseProjects.length > 0 && (
          <div className="mt-14 sm:mt-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  Showcase
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                  Featured presentation
                </h3>
              </div>
              <span className="hidden text-sm text-muted-foreground sm:block">
                {showcaseProjects.length} project{showcaseProjects.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="grid items-stretch gap-6 lg:grid-cols-2">
              {showcaseProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured
                  onViewDetails={openProject}
                />
              ))}
            </div>
          </div>
        )}

        {standardProjects.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  More work
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                  Project archive
                </h3>
              </div>
              <span className="hidden text-sm text-muted-foreground sm:block">
                {standardProjects.length} project{standardProjects.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
              {standardProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={openProject}
                />
              ))}
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="mt-14 rounded-[1.5rem] border border-border bg-card/60 px-6 py-12 text-center">
            <h3 className="text-xl font-semibold text-foreground">No matching projects</h3>
            <p className="mt-2 text-muted-foreground">
              Try another technology filter to explore the project archive.
            </p>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeProject}
          returnFocusRef={returnFocusRef}
        />
      )}
    </section>
  );
};

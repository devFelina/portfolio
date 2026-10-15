export const ProjectFilters = ({ filters, activeFilter, onFilterChange }) => (
  <div
    className="flex flex-wrap gap-2"
    role="group"
    aria-label="Filter projects by technology"
  >
    {filters.map((filter) => {
      const isActive = activeFilter === filter.id;

      return (
        <button
          key={filter.id}
          type="button"
          onClick={() => onFilterChange(filter.id)}
          aria-pressed={isActive}
          className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-[color,background-color,border-color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
            isActive
              ? "border-border-strong bg-white/10 text-foreground"
              : "border-border bg-background/30 text-muted-foreground hover:border-border-strong hover:bg-white/5 hover:text-foreground"
          }`}
        >
          <span>{filter.label}</span>
          <span
            className={`min-w-6 rounded-full px-1.5 py-0.5 text-center text-xs ${
              isActive ? "bg-accent/15 text-accent" : "bg-white/5 text-muted-foreground"
            }`}
            aria-label={`${filter.count} projects`}
          >
            {filter.count}
          </span>
        </button>
      );
    })}
  </div>
);

export const Skills = () => {
	const skillRows = [
		{
			label: "Frontend",
			tags: ["JavaScript", "React", "Next.js", "Vite", "Tailwind CSS"],
		},
		{
			label: "Backend",
			tags: ["Node.js", "Express", "Spring Boot", "Java", "Pythn","PostgreSQL", "MongoDB"],
		},
		{
			label: "Tools & Platform",
			tags: ["Colab", "Docker", "GitHub"],
		},
	];

	return (
		<section id="skills" className="py-28 sm:py-32 relative overflow-hidden">
			<div className="absolute inset-0 -z-10">
				<div className="absolute left-[-6rem] top-[-6rem] h-72 w-72 rounded-full bg-white/5 blur-3xl" />
				<div className="absolute right-[-8rem] bottom-[-6rem] h-80 w-80 rounded-full bg-white/4 blur-3xl" />
			</div>

			<div className="container mx-auto px-6 relative z-10">
				<div className="max-w-3xl mb-16 animate-fade-in">
					<span className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-primary/80">
						Skills
					</span>
					<h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
						The toolkit.
					</h2>
					<p className="mt-5 max-w-2xl text-base sm:text-lg leading-8 text-muted-foreground">
						A working set of tools I reach for. I care more about the right answer than the trendy one.
					</p>
				</div>

				<div className="space-y-0">
					{skillRows.map((row, rowIndex) => (
						<div
							key={row.label}
							className={`grid gap-6 py-7 sm:py-8 lg:grid-cols-[220px_minmax(0,1fr)] items-start ${
								rowIndex === 0 ? "border-t border-white/10" : "border-t border-white/10"
							} animate-fade-in`}
							style={{ animationDelay: `${(rowIndex + 1) * 90}ms` }}
						>
							<div className="text-xl sm:text-2xl font-semibold text-foreground">
								{row.label}
							</div>

							<div className="flex flex-wrap gap-3 sm:gap-3.5">
								{row.tags.map((tag) => (
									<span
										key={tag}
										className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm sm:text-[0.95rem] font-medium text-muted-foreground transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-foreground"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

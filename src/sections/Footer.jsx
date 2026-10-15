import { ArrowUp } from "lucide-react";
import { navigationLinks } from "@/data/navigation";
import { socialLinks } from "@/data/socialLinks";

const footerNavigation = navigationLinks.filter(({ id }) =>
  ["about", "projects", "skills", "contact"].includes(id),
);

const linkClasses =
  "inline-flex min-h-11 items-center rounded-lg text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-elevated/50">
      <div className="container mx-auto px-6 py-10 sm:py-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start md:gap-12">
          <div>
            <a href="#hero" className="inline-flex min-h-11 items-center rounded-lg text-xl font-bold tracking-tight text-foreground transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-label="KC portfolio home">KC.</a>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">AI, data, and full-stack development focused on useful digital products.</p>
          </div>

          <div className="flex flex-col gap-5 sm:items-end">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {footerNavigation.map((link) => (
                  <li key={link.id}><a href={link.href} className={linkClasses}>{link.label}</a></li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {socialLinks.map((link) => (
                <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>{link.label}</a>
              ))}
              <a href="#hero" className={`${linkClasses} gap-2`}>Back to top <ArrowUp className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">© {currentYear} Kushan Chamikara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

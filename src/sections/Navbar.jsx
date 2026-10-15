import { LinkButton } from "@/components/Button";
import { navigationLinks } from "@/data/navigation";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const sectionIds = new Set(navigationLinks.map((link) => link.id));
const contactLink = navigationLinks.find((link) => link.id === "contact");

const getHashSection = () => {
  if (typeof window === "undefined") return "hero";

  const id = window.location.hash.slice(1);
  return sectionIds.has(id) ? id : "hero";
};

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState(getHashSection);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

  const closeMobileMenu = useCallback((restoreFocus = false) => {
    setIsMobileMenuOpen(false);
    if (restoreFocus) {
      menuButtonRef.current?.focus();
    }
  }, []);

  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId);
    closeMobileMenu();
  };

  useEffect(() => {
    const visibility = new Map();
    const sections = navigationLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibility.set(entry.target.id, entry);
          } else {
            visibility.delete(entry.target.id);
          }
        });

        const visibleSections = [...visibility.values()].sort((a, b) => {
          const aDistance = Math.abs(a.boundingClientRect.top - 96);
          const bDistance = Math.abs(b.boundingClientRect.top - 96);
          return aDistance - bDistance;
        });

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-88px 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(getHashSection());
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const updateScrollState = () => {
      animationFrame = 0;
      setIsScrolled(window.scrollY > 24);

      const isAtPageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;

      if (isAtPageBottom) {
        setActiveSection("contact");
      }
    };

    const handleScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu(true);
      }
    };

    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        closeMobileMenu();
      }
    };

    const desktopMediaQuery = window.matchMedia("(min-width: 768px)");
    const handleViewportChange = (event) => {
      if (event.matches) closeMobileMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    desktopMediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      desktopMediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, [closeMobileMenu, isMobileMenuOpen]);

  const getLinkClasses = (sectionId, mobile = false) => {
    const isActive = activeSection === sectionId;
    const shared =
      "relative rounded-full font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

    if (mobile) {
      return `${shared} flex min-h-11 items-center px-4 py-2.5 text-base ${
        isActive
          ? "bg-white/10 text-foreground"
          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
      }`;
    }

    return `${shared} px-3 py-2 text-sm lg:px-4 ${
      isActive
        ? "bg-white/10 text-foreground shadow-sm shadow-black/20"
        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
    }`;
  };

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 border-b py-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        isScrolled
          ? "border-border bg-background/85 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        className="container mx-auto flex items-center justify-between gap-4 px-6"
        aria-label="Primary navigation"
      >
        <a
          href="#hero"
          className="flex min-h-11 items-center rounded-full text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={() => handleNavigation("hero")}
          aria-label="KC portfolio home"
        >
          KC<span className="text-primary">.</span>
        </a>

        <div className="hidden items-center md:flex">
          <div className="glass flex items-center gap-0.5 rounded-full p-1">
            {navigationLinks.map((link) => (
              <a
                href={link.href}
                key={link.id}
                onClick={() => handleNavigation(link.id)}
                className={getLinkClasses(link.id)}
                aria-current={activeSection === link.id ? "location" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <LinkButton
          href={contactLink.href}
          variant="secondary"
          size="sm"
          onClick={() => handleNavigation(contactLink.id)}
          className="hidden border-white/20 bg-black/60 hover:bg-white/10 md:inline-flex"
          aria-current={activeSection === contactLink.id ? "location" : undefined}
        >
          Contact Me
        </LinkButton>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:border-border-strong hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="animate-menu-in px-4 pt-3 md:hidden"
        >
          <nav
            className="glass-strong mx-auto flex max-w-md flex-col gap-1 rounded-3xl p-3 shadow-2xl shadow-black/40"
            aria-label="Mobile navigation"
          >
            {navigationLinks.map((link) => (
              <a
                href={link.href}
                key={link.id}
                onClick={() => handleNavigation(link.id)}
                className={getLinkClasses(link.id, true)}
                aria-current={activeSection === link.id ? "location" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

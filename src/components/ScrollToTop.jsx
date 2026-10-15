import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrame = 0;

    const toggleVisibility = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(() => {
          animationFrame = 0;
          const visibilityThreshold = Math.max(500, window.innerHeight * 0.75);
          setIsVisible(window.scrollY > visibilityThreshold);
        });
      }
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-xl shadow-black/30 backdrop-blur-xl transition-colors duration-200 hover:border-border-strong hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        bottom: "calc(1rem + env(safe-area-inset-bottom))",
        right: "calc(1rem + env(safe-area-inset-right))",
      }}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};

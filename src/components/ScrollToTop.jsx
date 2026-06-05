import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToHero = () => {
    document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToHero}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full glass 
      text-foreground border border-white/10 bg-black/40 hover:bg-white/10 
      transition-all duration-300 hover:-translate-y-1 hover:text-primary hover:border-primary/50
      ${
        isVisible 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};
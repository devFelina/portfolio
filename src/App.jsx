import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";
import { ScrollToTop } from "./components/ScrollToTop";
import { LoadingReveal } from "./components/LoadingReveal";

function App() {

  return (
    <div className="min-h-screen overflow-x-hidden">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-xl transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <LoadingReveal />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <ScrollToTop />
      </main>
    </div>
  )
}

export default App

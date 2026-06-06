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
      <Navbar />
      <main>
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

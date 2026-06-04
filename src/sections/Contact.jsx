import { useState } from "react"; // Added missing useState import
import { Button } from "@/components/Button";
import emailjs from "@emailjs/browser";
// Added standard Lucide icon imports (or adjust to match your project icon library)
import { Send, CheckCircle, AlertCircle } from "lucide-react"; 

const socialLinks = [
  { label: "GitHub", href: "https://github.com/devFelina" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kushan-chamikara-a24933279/" },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing. Please check your environment variables.");
      } 

      await emailjs.send(
        serviceId, 
        templateId, 
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }, 
        publicKey
      );
      
      setSubmitStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" }); 
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus({ type: "error", message: error.message || "Failed to send message. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }; // <-- Fixed: Added missing closing brace for handleSubmit

  return (
    <section id="contact" className="py-28 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-8rem] top-[-6rem] h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[-10rem] bottom-[-6rem] h-96 w-96 rounded-full bg-white/4 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="animate-fade-in">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-primary/80">
              Contact
            </span>
            <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground max-w-xl">
              Let&apos;s make something.
            </h2>
            <p className="mt-5 max-w-xl text-base sm:text-lg leading-8 text-muted-foreground">
              Tell me about your project, role, or idea. I read every message and reply within a few days.
            </p>

            <div className="mt-14 space-y-8">
              <div>
                <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-muted-foreground">
                  Email
                </p>
                <a
                  href="mailto:hgp.ashi@gmail.com"
                  className="mt-3 inline-flex text-base sm:text-lg text-foreground transition-colors duration-300 hover:text-primary"
                >
                  kushan.s.chamikara@gmail.com
                </a>
              </div>

              <div>
                <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-muted-foreground">
                  Based in
                </p>
                <p className="mt-3 text-base sm:text-lg text-foreground">Galle, Sri Lanka</p>
              </div>

              <div>
                <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-muted-foreground">
                  Elsewhere
                </p>
                <div className="mt-4 flex flex-wrap gap-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base sm:text-lg text-foreground/90 transition-colors duration-300 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in animation-delay-200">
            <div className="glass-strong rounded-[2rem] border border-white/10 p-5 sm:p-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-3 block text-xs sm:text-sm tracking-[0.35em] uppercase text-muted-foreground">
                      Name
                    </span>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => 
                        setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-full border border-white/10 bg-black/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors duration-300 focus:border-white/30 focus:ring-1 focus:ring-white/20"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-3 block text-xs sm:text-sm tracking-[0.35em] uppercase text-muted-foreground">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => 
                        setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-full border border-white/10 bg-black/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors duration-300 focus:border-white/30 focus:ring-1 focus:ring-white/20"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-3 block text-xs sm:text-sm tracking-[0.35em] uppercase text-muted-foreground">
                    Message
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, role, or idea."
                    value={formData.message}
                    onChange={(e) => 
                      setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-[1.5rem] border border-white/10 bg-black/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors duration-300 focus:border-white/30 focus:ring-1 focus:ring-white/20 resize-none"
                  />
                </label>

                <div className="pt-2 space-y-4"> {/* Added gap spacing wrapper */}
                  <Button
                    className=" flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>

                  {submitStatus.type && (
                    <div
                      className={`flex items-center gap-3 p-4 rounded-xl ${
                        submitStatus.type === "success"
                          ? "bg-green-500/10 border border-green-500/20 text-green-400"
                          : "bg-red-500/10 border border-red-500/20 text-red-400"
                      }`}
                    >
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <p className="text-sm">{submitStatus.message}</p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; // <-- Fixed matching braces for component scope
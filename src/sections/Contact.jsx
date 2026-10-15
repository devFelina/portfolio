import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { AlertCircle, CheckCircle, Mail, Send } from "lucide-react";
import { Button } from "@/components/Button";
import { socialLinks } from "@/data/socialLinks";

const initialFormData = { name: "", email: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateForm = ({ name, email, message }) => {
  const errors = {};
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName) errors.name = "Please enter your name.";
  else if (trimmedName.length < 2) errors.name = "Name must be at least 2 characters.";

  if (!trimmedEmail) errors.email = "Please enter your email address.";
  else if (!emailPattern.test(trimmedEmail)) errors.email = "Please enter a valid email address.";

  if (!trimmedMessage) errors.message = "Please enter a message.";
  else if (trimmedMessage.length < 10) errors.message = "Message must be at least 10 characters.";

  return errors;
};

export const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const submissionLockRef = useRef(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((current) => ({ ...current, [name]: undefined }));
    }
    if (submitStatus.type) setSubmitStatus({ type: null, message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submissionLockRef.current) return;

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitStatus({ type: "error", message: "Please correct the highlighted fields." });
      const firstInvalidField = ["name", "email", "message"].find((field) => errors[field]);
      const invalidFieldRefs = {
        name: nameInputRef,
        email: emailInputRef,
        message: messageInputRef,
      };
      invalidFieldRefs[firstInvalidField]?.current?.focus();
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus({
        type: "error",
        message: "The message service is temporarily unavailable. Please email me directly.",
      });
      return;
    }

    submissionLockRef.current = true;
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
        publicKey,
      );

      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error("Message service rejected the request.");
      }

      setSubmitStatus({ type: "success", message: "Your message was sent successfully." });
      setFormData(initialFormData);
      setFieldErrors({});
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Your message could not be sent. Please try again or email me directly.",
      });
    } finally {
      submissionLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  const fieldClasses =
    "mt-2 min-h-12 w-full rounded-xl border border-border bg-background/70 px-4 py-3 text-foreground outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-muted-foreground/60 hover:border-border-strong focus:border-accent focus:bg-background focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <section id="contact" className="relative overflow-hidden pt-10 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-32 top-12 h-80 w-80 rounded-full bg-accent/[0.04] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20 xl:gap-28">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm">Contact</span>
            <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">Let&apos;s build something meaningful.</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-secondary-foreground sm:text-lg">Have a project, opportunity, or idea worth exploring? Share the details and let&apos;s start a thoughtful conversation.</p>

            <div className="mt-10 space-y-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Email</p>
                <a href="mailto:kushan.s.chamikara@gmail.com" className="mt-3 inline-flex max-w-full items-center gap-3 break-all rounded-lg text-base text-foreground transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:text-lg">
                  <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  kushan.s.chamikara@gmail.com
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Based in</p>
                <p className="mt-3 text-base text-foreground sm:text-lg">Galle, Sri Lanka</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Connect</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface/65 px-5 py-2 text-sm font-medium text-secondary-foreground transition-[color,border-color,background-color] hover:border-accent/50 hover:bg-surface-hover hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border-strong bg-surface/80 p-5 shadow-2xl shadow-black/30 backdrop-blur-md sm:p-8">
            <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-medium text-foreground">Name</label>
                  <input ref={nameInputRef} id="contact-name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={80} value={formData.name} onChange={updateField} disabled={isSubmitting} aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "contact-name-error" : undefined} placeholder="Your name" className={fieldClasses} />
                  {fieldErrors.name && <p id="contact-name-error" className="mt-2 text-sm text-red-300">{fieldErrors.name}</p>}
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-sm font-medium text-foreground">Email</label>
                  <input ref={emailInputRef} id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} value={formData.email} onChange={updateField} disabled={isSubmitting} aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "contact-email-error" : undefined} placeholder="you@example.com" className={fieldClasses} />
                  {fieldErrors.email && <p id="contact-email-error" className="mt-2 text-sm text-red-300">{fieldErrors.email}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="text-sm font-medium text-foreground">Message</label>
                <textarea ref={messageInputRef} id="contact-message" name="message" rows={7} required minLength={10} maxLength={2000} value={formData.message} onChange={updateField} disabled={isSubmitting} aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? "contact-message-error" : "contact-message-help"} placeholder="Tell me about your project, role, or idea." className={`${fieldClasses} resize-y`} />
                <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
                  {fieldErrors.message ? <p id="contact-message-error" className="text-sm text-red-300">{fieldErrors.message}</p> : <p id="contact-message-help">10–2,000 characters</p>}
                  <span aria-hidden="true">{formData.message.length}/2000</span>
                </div>
              </div>

              <div className="mt-6">
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto" aria-describedby={submitStatus.type ? "contact-submit-status" : undefined}>
                  {isSubmitting ? "Sending…" : "Send Message"}
                  {!isSubmitting && <Send className="h-4 w-4" aria-hidden="true" />}
                </Button>

                <div className="mt-4 min-h-14" aria-live="polite" aria-atomic="true">
                  {submitStatus.type && (
                    <div id="contact-submit-status" role={submitStatus.type === "error" ? "alert" : "status"} className={`flex items-start gap-3 rounded-xl border p-4 ${submitStatus.type === "success" ? "border-success/25 bg-success/10 text-green-300" : "border-red-400/25 bg-red-400/10 text-red-300"}`}>
                      {submitStatus.type === "success" ? <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /> : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />}
                      <p className="text-sm leading-6">{submitStatus.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

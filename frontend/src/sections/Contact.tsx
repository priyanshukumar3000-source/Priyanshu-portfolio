import { useState } from "react";
import { Github, Instagram, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { SOCIALS } from "@/data/portfolio";
import { apiPost } from "@/lib/api";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { sfx } from "@/hooks/useSound";

const SOCIAL_ICONS: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
};

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await apiPost<ContactMessage>("/contact", form);
      sfx.success();
      toast.success("Transmission received. I'll respond within 24 hours.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Signal lost — the message couldn't be sent. Try the email icon instead.");
    } finally {
      setSending(false);
    }
  };

  const field =
    "w-full rounded-xl border border-purple-500/25 bg-[#0c091a]/80 px-4 py-3 text-sm text-purple-50 placeholder:text-purple-400/40 outline-none transition-all focus:border-purple-400/70 focus:shadow-[0_0_20px_rgba(168,85,247,0.25)]";

  return (
    <section id="contact" data-testid="contact-section" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(147,51,234,0.14),transparent_60%)]" />
      <div className="relative mx-auto w-[min(980px,92vw)]">
        <SectionHeading
          num="08"
          code="OPEN_CHANNEL"
          title="Let's Build Something Extraordinary."
          jp="連絡"
          sub="A project, a role, a hackathon team, or just a good conversation — transmit your signal."
        />

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10">
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="glass-panel corner-brackets rounded-2xl p-6 sm:p-8 space-y-5"
              data-testid="contact-form"
            >
              <div>
                <label htmlFor="contact-name" className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-purple-300/80 uppercase">
                  Name
                </label>
                <input
                  id="contact-name"
                  data-testid="contact-name-input"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-purple-300/80 uppercase">
                  Email
                </label>
                <input
                  id="contact-email"
                  data-testid="contact-email-input"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@signal.dev"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-purple-300/80 uppercase">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  data-testid="contact-message-input"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe the mission..."
                  className={`${field} resize-none`}
                />
              </div>
              <button
                data-testid="contact-submit-button"
                type="submit"
                disabled={sending}
                onMouseEnter={sfx.hover}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_30px_rgba(147,51,234,0.45)] transition-all duration-300 hover:bg-purple-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.75)] disabled:opacity-60"
              >
                {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4 transition-transform group-hover:translate-x-1" />}
                {sending ? "Transmitting..." : "Send Message"}
              </button>
            </form>
          </Reveal>

          <div className="flex flex-col justify-center gap-4">
            {SOCIALS.map((s, i) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <Reveal key={s.name} delay={0.07 * i}>
                  <a
                    data-testid={`social-link-${s.icon}`}
                    href={s.url}
                    target={s.icon === "mail" ? undefined : "_blank"}
                    rel="noreferrer"
                    onMouseEnter={sfx.hover}
                    onClick={sfx.click}
                    className="group flex items-center gap-4 rounded-xl border border-purple-500/20 bg-[#0c091a]/70 px-5 py-4 transition-all duration-300 hover:border-purple-400/60 hover:bg-purple-600/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-0.5"
                  >
                    <span className="grid size-11 place-items-center rounded-full border border-purple-400/40 bg-purple-600/15 text-purple-300 transition-all duration-300 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-heading text-sm font-bold uppercase tracking-[0.15em] text-white">
                        {s.name}
                      </span>
                      <span className="block font-mono text-xs text-purple-300/60">{s.handle}</span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
            <Reveal delay={0.3}>
              <p className="mt-2 font-mono text-[10px] tracking-[0.25em] text-purple-400/50 leading-relaxed">
                RESPONSE_TIME: &lt; 24H
                <br />
                TIMEZONE: IST (UTC+5:30)
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

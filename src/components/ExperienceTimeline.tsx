import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const experiences = [
  {
    role: "Research Engineer Intern",
    company: "Zeetron Network Pvt. Ltd.",
    description:
      "Conducted research and engineering tasks, applying core technical principles to real-world networking and development challenges.",
    link: "https://drive.google.com/file/d/1nfOd0dXvjPmtN0yQSAY0Xydl5N28Mhyq/view?usp=drive_link",
  },
  {
    role: "Full-Stack Developer",
    company: "CivilSite Labor Tracking",
    description:
      "Architected and deployed a custom labor-tracking web application for a civil engineering client, featuring a robust archival system and secure Supabase backend integration.",
  },
];

const ExperienceTimeline = () => {
  return (
    <div className="relative pl-8 md:pl-12">
      <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px">
        <div className="h-full w-full bg-border" />
        <motion.div
          className="absolute inset-0 w-full"
          style={{
            background: "linear-gradient(180deg, transparent 0%, hsl(var(--muted-foreground)) 40%, hsl(var(--muted-foreground)) 60%, transparent 100%)",
            opacity: 0.3,
            filter: "blur(3px)",
          }}
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="space-y-12">
        {experiences.map((exp, i) => (
          <ScrollReveal key={exp.role} delay={i * 0.15}>
            <div className="relative">
              <div className="absolute -left-8 md:-left-12 top-1.5 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/50 border-2 border-background" />
                <motion.div
                  className="absolute w-5 h-5 rounded-full"
                  style={{ background: "radial-gradient(circle, hsl(var(--muted-foreground) / 0.2), transparent 70%)" }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                />
              </div>
              <div className="glass-card p-6 md:p-8">
                <h3 className="text-lg font-medium text-foreground">{exp.role}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-3">{exp.company}</p>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{exp.description}</p>
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-xs font-medium tracking-wide text-foreground border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                  >
                    View Live <ExternalLink size={14} />
                  </a>
                )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;

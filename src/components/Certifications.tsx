import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const certifications = [
  {
    title: "5-Day AI Agents Intensive",
    issuer: "Google & Kaggle",
    date: "December 2025",
    link: "https://drive.google.com/file/d/10aV5Y9a-cGqPXumojDTOsrSy20CQ-ie5/view?usp=drive_link",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google Cloud & Simplilearn",
    date: "November 2025",
    link: "https://drive.google.com/file/d/1yqIYGkAVicDu_P8iMM-5ceCgxJxIvQdk/view?usp=drive_link",
  },
];

const Certifications = () => {
  return (
    <div className="flex flex-col gap-3">
      {certifications.map((cert, i) => (
        <ScrollReveal key={cert.title} delay={i * 0.1}>
          <motion.div
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="group glass-card glass-card-hover px-8 py-6 cursor-default"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-foreground tracking-tight-custom">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">{cert.issuer}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-muted-foreground/70 font-mono tracking-wide">
                  {cert.date}
                </span>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground border border-slate-900/15 bg-slate-900/5 rounded-full px-3 py-1 transition-all duration-300 hover:bg-slate-900/10 hover:border-slate-900/25"
                >
                  View Certificate
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      ))}
    </div>
  );
};

export default Certifications;

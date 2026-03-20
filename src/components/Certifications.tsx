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
            className="group glass-card px-8 py-6 cursor-default transition-shadow duration-300 hover:shadow-[inset_0_0_20px_hsla(30,8%,70%,0.12)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <h3 className="text-base font-semibold text-[#1C1B1A] tracking-tight-custom">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">{cert.issuer}</p>
              </div>
              <span className="text-xs text-muted-foreground/70 font-mono tracking-wide shrink-0">
                {cert.date}
              </span>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-full px-3 py-1 transition-colors duration-300 hover:bg-accent shrink-0"
              >
                View Certificate
                <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        </ScrollReveal>
      ))}
    </div>
  );
};

export default Certifications;

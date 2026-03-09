import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const skills = [
  "Python", "Pandas", "Numpy", "React", "Tailwind",
  "Supabase", "Vercel", "Kafka", "OpenCV", "YOLO",
];

const AboutBento = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
      {/* Biography — spans 7 columns */}
      <ScrollReveal className="md:col-span-7">
        <div className="glass-card p-8 md:p-10 h-full">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Biography</p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            I bridge the gap between seamless web interfaces and robust backend pipelines.
            My focus is on writing clean, functional code and deploying highly available systems,
            blending my academic foundation in AI/DS with hands-on development.
          </p>
        </div>
      </ScrollReveal>

      {/* Core Arsenal — spans 5 columns */}
      <ScrollReveal delay={0.1} className="md:col-span-5">
        <div className="glass-card p-8 md:p-10 h-full">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Core Arsenal</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.5, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 + i * 0.06,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="px-3 py-1.5 text-xs font-medium text-muted-foreground border border-border rounded-full hover:border-foreground/30 hover:text-foreground transition-colors duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Education — full width accent strip */}
      <ScrollReveal delay={0.2} className="md:col-span-4">
        <div className="glass-card p-8 md:p-10 h-full flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Education</p>
          <p className="text-foreground font-semibold text-lg tracking-tight-custom">B.Tech — AI & Data Science</p>
          <p className="text-sm text-muted-foreground mt-1">Class of 2027</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.25} className="md:col-span-4">
        <div className="glass-card p-8 md:p-10 h-full flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Focus Areas</p>
          <p className="text-foreground font-medium text-base leading-relaxed">
            Full-Stack Development, DevOps, Data Pipelines, Computer Vision
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3} className="md:col-span-4">
        <div className="glass-card p-8 md:p-10 h-full flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Location</p>
          <p className="text-foreground font-medium text-base">India 🇮🇳</p>
          <p className="text-sm text-muted-foreground mt-1">Open to remote work worldwide</p>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default AboutBento;

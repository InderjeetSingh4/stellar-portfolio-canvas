import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const skills = [
  "Python", "Pandas", "Numpy", "React", "Tailwind",
  "Supabase", "Vercel", "Kafka", "OpenCV", "YOLO",
];

const AboutBento = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
      {/* Biography — spans 3 columns */}
      <ScrollReveal className="md:col-span-3">
        <div className="glass-card p-8 md:p-10 h-full">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Biography</p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            I bridge the gap between seamless web interfaces and robust backend pipelines.
            My focus is on writing clean, functional code and deploying highly available systems,
            blending my academic foundation in AI/DS with hands-on development.
          </p>
        </div>
      </ScrollReveal>

      {/* Core Arsenal — spans 2 columns */}
      <ScrollReveal delay={0.1} className="md:col-span-2">
        <div className="glass-card p-8 md:p-10 h-full">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Core Arsenal</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="px-3 py-1.5 text-xs font-medium text-muted-foreground border border-border rounded-full hover:border-foreground/30 hover:text-foreground transition-colors duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default AboutBento;

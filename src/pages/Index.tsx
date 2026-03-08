import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Phone } from "lucide-react";
import ParticleField from "@/components/ParticleField";
import HeroObject from "@/components/HeroObject";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import TextReveal from "@/components/TextReveal";
import Magnetic from "@/components/Magnetic";
import Preloader from "@/components/Preloader";
import GrainOverlay from "@/components/GrainOverlay";
import Marquee from "@/components/Marquee";
import SmoothScroll from "@/components/SmoothScroll";
import ContactForm from "@/components/ContactForm";

const projects = [
  {
    title: "Analytics Dashboard",
    description: "A real-time data visualization platform built for enterprise teams. Features interactive charts, predictive modeling, and automated reporting.",
    tags: ["React", "D3.js", "Python", "PostgreSQL"],
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack marketplace with headless CMS, payment integration, and a custom recommendation engine powered by collaborative filtering.",
    tags: ["Next.js", "Stripe", "Node.js", "MongoDB"],
  },
  {
    title: "ML Pipeline Tool",
    description: "Visual drag-and-drop interface for building machine learning pipelines. Supports data preprocessing, model training, and deployment workflows.",
    tags: ["TypeScript", "TensorFlow", "FastAPI", "Docker"],
  },
  {
    title: "Portfolio CMS",
    description: "A minimalist content management system for creatives. Markdown-first with real-time preview and one-click deployment.",
    tags: ["React", "Tailwind", "Supabase", "Vercel"],
  },
];

const experience = [
  { role: "Senior Full-Stack Developer", company: "TechCorp", period: "2022 — Present" },
  { role: "Data Analyst", company: "DataFlow Inc.", period: "2020 — 2022" },
  { role: "Web Developer", company: "StartupLab", period: "2018 — 2020" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/InderjeetSingh4", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/inderjeet-singh-5b9b25395", icon: Linkedin },
  { label: "Phone", href: "tel:+917357987320", icon: Phone },
];

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      {loaded && (
        <SmoothScroll>
          <div className="relative min-h-screen overflow-x-hidden">
            <CustomCursor />
            <GrainOverlay />
            <ParticleField />
            <Navbar />

            {/* Hero */}
            <section className="relative min-h-screen flex flex-col items-center justify-center section-padding pt-32">
              <HeroObject />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
                className="text-center mt-8 max-w-3xl mx-auto"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight-custom text-foreground leading-[1.05]">
                  Full-Stack Developer
                  <span className="block text-muted-foreground">Data Analyst</span>
                  <span className="block text-muted-foreground/60">&amp; Problem Solver</span>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="mt-6 text-muted-foreground text-base md:text-lg max-w-md mx-auto leading-relaxed"
                >
                  Crafting elegant digital experiences through code, data, and design.
                </motion.p>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
              >
                <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 h-2 rounded-full bg-muted-foreground/50"
                  />
                </div>
              </motion.div>
            </section>

            {/* Marquee */}
            <Marquee />

            {/* About */}
            <section id="about" className="section-padding max-w-4xl mx-auto">
              <ScrollReveal>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">About</p>
              </ScrollReveal>
              <TextReveal as="h2" className="text-3xl md:text-4xl font-bold tracking-tight-custom text-foreground mb-8 flex flex-wrap">
                Building at the intersection of design, code, and data.
              </TextReveal>
              <ScrollReveal delay={0.15}>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-2xl">
                  I'm a full-stack developer and data analyst who transforms complex datasets into
                  actionable insights and elegant interfaces. With expertise spanning modern web
                  frameworks and statistical modeling, I bridge the gap between raw data and
                  meaningful user experiences. Every project begins with curiosity and ends with precision.
                </p>
              </ScrollReveal>
            </section>

            {/* Projects */}
            <section id="projects" className="section-padding max-w-5xl mx-auto">
              <ScrollReveal>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Selected Work</p>
              </ScrollReveal>
              <TextReveal as="h2" className="text-3xl md:text-4xl font-bold tracking-tight-custom text-foreground mb-12 flex flex-wrap">
                Projects that push boundaries.
              </TextReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, i) => (
                  <ProjectCard key={project.title} {...project} index={i} />
                ))}
              </div>
            </section>

            {/* Experience */}
            <section id="experience" className="section-padding max-w-4xl mx-auto">
              <ScrollReveal>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Career</p>
              </ScrollReveal>
              <TextReveal as="h2" className="text-3xl md:text-4xl font-bold tracking-tight-custom text-foreground mb-12 flex flex-wrap">
                Experience and expertise.
              </TextReveal>
              <div className="space-y-0">
                {experience.map((exp, i) => (
                  <ScrollReveal key={exp.role} delay={i * 0.1}>
                    <div className="flex items-center justify-between py-6 border-b border-border group cursor-default">
                      <div>
                        <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300">{exp.role}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section id="contact" className="section-padding max-w-5xl mx-auto pb-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
                <div>
                  <ScrollReveal>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Get in Touch</p>
                  </ScrollReveal>
                  <TextReveal as="h2" className="text-3xl md:text-5xl font-bold tracking-tight-custom text-foreground mb-6 flex flex-wrap">
                    Let's build something extraordinary.
                  </TextReveal>
                  <ScrollReveal delay={0.15}>
                    <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-lg">
                      Available for freelance projects, collaborations, and full-time roles.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.25}>
                    <Magnetic strength={0.2}>
                      <a href="mailto:theinderjeet52@gmail.com" className="inline-block glass-card glass-card-hover px-8 py-4 text-sm font-medium text-foreground tracking-wide">
                        theinderjeet52@gmail.com
                      </a>
                    </Magnetic>
                  </ScrollReveal>
                  <ScrollReveal delay={0.35}>
                    <div className="flex gap-6 mt-12">
                      {socials.map((s) => (
                        <Magnetic key={s.label} strength={0.3}>
                          <a
                            href={s.href}
                            target={s.label !== "Phone" ? "_blank" : undefined}
                            rel={s.label !== "Phone" ? "noopener noreferrer" : undefined}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                            aria-label={s.label}
                          >
                            <s.icon size={18} />
                            <span className="hidden sm:inline">{s.label}</span>
                          </a>
                        </Magnetic>
                      ))}
                    </div>
                  </ScrollReveal>
                </div>
                <ContactForm />
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-8 text-center">
              <p className="text-xs text-muted-foreground">© 2026 — Designed & Built with precision.</p>
            </footer>
          </div>
        </SmoothScroll>
      )}
    </>
  );
};

export default Index;

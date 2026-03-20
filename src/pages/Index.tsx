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
import Typewriter from "@/components/Typewriter";
import AboutBento from "@/components/AboutBento";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Certifications from "@/components/Certifications";

const projects = [
  {
    title: "Site Stat",
    subtitle: "Full-Stack Data Tracking & Management",
    description: "A robust web application designed for comprehensive data tracking and management. Engineered with secure backend integration to handle real-time statistics, temporary access links, and seamless data entry.",
    tags: ["React", "Tailwind CSS", "Supabase", "Vercel"],
    visual: "dashboard" as const,
  },
  {
    title: "Vision Pro",
    subtitle: "Advanced Computer Vision System",
    description: "A high-performance object detection application capable of real-time processing and live camera streaming. Built with a focus on accuracy and seamless video frame handling.",
    tags: ["Python", "React", "Tailwind CSS", "YOLO", "Machine Learning"],
    visual: "vision" as const,
    link: "https://visionpro-app.vercel.app/",
  },
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
              <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
                <HeroObject />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
                  className="text-center mt-8 max-w-3xl mx-auto"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight-custom text-foreground leading-[1.05]">
                    Inderjeet Singh
                  </h1>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-4 text-xl md:text-2xl lg:text-3xl font-medium tracking-tight-custom"
                  >
                    <Typewriter />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-6 text-muted-foreground text-base md:text-lg max-w-lg mx-auto leading-relaxed"
                  >
                    Building scalable web architecture and data-driven systems. Currently pursuing a B.Tech in Artificial Intelligence and Data Science (Class of 2027).
                  </motion.p>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="mt-20"
                >
                  <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-1 h-2 rounded-full bg-muted-foreground/50"
                    />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Marquee */}
            <Marquee />

            {/* About */}
            <section id="about" className="section-padding">
              <div className="max-w-7xl w-full mx-auto">
                <ScrollReveal>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">About & Expertise</p>
                </ScrollReveal>
                <TextReveal as="h2" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight-custom text-foreground mb-12 flex flex-wrap">
                  Building at the intersection of design, code, and data.
                </TextReveal>
                <AboutBento />
              </div>
            </section>

            {/* Projects */}
            <section id="projects" className="section-padding">
              <div className="max-w-7xl w-full mx-auto">
                <ScrollReveal>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Selected Work</p>
                </ScrollReveal>
                <TextReveal as="h2" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight-custom text-foreground mb-14 flex flex-wrap">
                  Projects that push boundaries.
                </TextReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {projects.map((project, i) => (
                    <ProjectCard key={project.title} {...project} index={i} />
                  ))}
                </div>
              </div>
            </section>

            {/* Experience */}
            <section id="experience" className="section-padding">
              <div className="max-w-7xl w-full mx-auto">
                <ScrollReveal>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Experience</p>
                </ScrollReveal>
                <TextReveal as="h2" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight-custom text-foreground mb-14 flex flex-wrap">
                  Where I've contributed.
                </TextReveal>
                <div className="max-w-4xl">
                  <ExperienceTimeline />
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section id="certifications" className="section-padding">
              <div className="max-w-7xl w-full mx-auto">
                <ScrollReveal>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Certifications & Credentials</p>
                </ScrollReveal>
                <TextReveal as="h2" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight-custom text-foreground mb-14 flex flex-wrap">
                  Validated expertise.
                </TextReveal>
                <div className="max-w-4xl">
                  <Certifications />
                </div>
              </div>
            </section>

            {/* Contact */}
            <section id="contact" className="section-padding pb-32">
              <div className="max-w-7xl w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
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

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Phone } from "lucide-react";
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
import ParallaxDoodles from "@/components/ParallaxDoodles";

const projects = [
  {
    title: "Workforce Attrition Intelligence",
    subtitle: "Diagnostic HR Analytics Dashboard",
    description: "A diagnostic HR analytics dashboard for Palo Alto Networks. Processed 1,470+ employee records to identify high-risk turnover hotspots and overtime impacts.",
    tags: ["Python", "Streamlit", "Pandas", "Plotly"],
    visual: "dashboard" as const,
    featured: true,
    link: "https://paloaltoattrition.streamlit.app/",
  },
  {
    title: "Competitor Intelligence ETL Pipeline",
    subtitle: "Automated Data Pipeline",
    description: "An automated data pipeline that extracts competitive intelligence from web layers, transforms the data, and loads it into a structured relational database for querying.",
    tags: ["Python", "SQL", "ETL", "Web Scraping"],
    visual: "dashboard" as const,
  },
  {
    title: "Ferry Analytics",
    subtitle: "Operational Data Analytics",
    description: "Comprehensive data analytics project uncovering operational trends and metrics.",
    tags: ["Data Analytics", "Python", "Visualization"],
    visual: "dashboard" as const,
    link: "https://ferry-analytics-i2sepxvk8ppeubc5erb6pq.streamlit.app/",
  },
  {
    title: "Site Stat",
    subtitle: "Full-Stack Data Tracking & Management",
    description: "A robust web application designed for comprehensive data tracking and management. Engineered with secure backend integration to handle real-time statistics, temporary access links, and seamless data entry.",
    tags: ["React", "Tailwind CSS", "Supabase", "Vercel"],
    visual: "dashboard" as const,
    link: "https://nature1.online",
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
            <BackgroundDoodles />
            <ParticleField />
            <Navbar />

            {/* Hero */}
            <section className="relative min-h-screen flex flex-col items-center justify-center section-padding pt-32 overflow-hidden">
              <ParallaxDoodles />
              <div className="max-w-7xl w-full mx-auto flex flex-col items-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className="text-center max-w-2xl mx-auto relative rounded-3xl px-8 py-10 md:px-14 md:py-14 border border-white/70 shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_20px_60px_-20px_rgba(15,23,42,0.15)] backdrop-blur-2xl bg-white/60 [backdrop-filter:blur(28px)_saturate(160%)]"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(135deg,rgba(255,255,255,0.55)_0%,transparent_55%,rgba(200,210,225,0.18)_100%)]" />
                  <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold tracking-display text-slate-900 leading-[1.05] flex flex-wrap justify-center gap-x-4">
                    {"Inderjeet Singh".split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                          duration: 1,
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.3 + i * 0.12,
                        }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>
                  <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mt-4 text-xl md:text-2xl lg:text-3xl font-medium tracking-tight-custom text-gray-700 transform-gpu will-change-transform"
                  >
                    <Typewriter />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.95, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mt-6 text-gray-600 text-base md:text-lg max-w-lg mx-auto leading-relaxed"
                  >
                    Building scalable web architecture and data-driven systems. Currently pursuing a B.Tech in Artificial Intelligence and Data Science (Class of 2027).
                  </motion.p>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 1 }}
                  className="mt-20 transform-gpu will-change-transform"
                >
                  <div className="w-5 h-8 rounded-full border border-slate-900/20 flex items-start justify-center p-1">
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-1 h-2 rounded-full bg-slate-900/50 transform-gpu will-change-transform"
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
                    <div key={project.title} className={(project as any).featured ? "md:col-span-2" : ""}>
                      <ProjectCard {...project} index={i} />
                    </div>
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

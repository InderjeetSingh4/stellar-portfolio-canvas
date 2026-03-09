import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

const navItems = ["About", "Projects", "Experience", "Contact"];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 py-5"
      style={{
        background: "hsla(var(--background), 0.8)",
        backdropFilter: "blur(20px)",
      }}
    >
      <Magnetic strength={0.15}>
        <span className="text-foreground font-semibold text-lg tracking-tight-custom">
          portfolio<span className="text-muted-foreground">.</span>
        </span>
      </Magnetic>
      <ul className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item}>
            <Magnetic strength={0.25}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item}
              </a>
            </Magnetic>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navbar;

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setStatus("sending");

    const mailtoLink = `mailto:theinderjeet52@gmail.com?subject=${encodeURIComponent(
      `Portfolio Contact from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.open(mailtoLink, "_blank");
    setStatus("sent");
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setStatus("idle");
    }, 3000);
  };

  const inputClasses =
    "w-full bg-transparent border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300";

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="glass-card p-6 md:p-8 space-y-5 max-w-lg"
    >
      <div>
        <label htmlFor="name" className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          maxLength={100}
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          className={inputClasses}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          maxLength={255}
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          className={inputClasses}
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Message
        </label>
        <textarea
          id="message"
          placeholder="Tell me about your project..."
          maxLength={1000}
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
          className={`${inputClasses} resize-none`}
          required
        />
      </div>
      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 glass-card glass-card-hover px-6 py-3 text-sm font-medium text-foreground tracking-wide disabled:opacity-50 transition-all duration-300"
      >
        {status === "sent" ? (
          "Message Sent ✓"
        ) : status === "sending" ? (
          "Opening Mail..."
        ) : (
          <>
            Send Message <Send size={14} />
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;

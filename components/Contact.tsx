"use client";

import React from "react";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Alert, CloseButton } from "@heroui/react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const [status, setStatus] = React.useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setStatus(null);

    try {
      const { data: result } = await axios.post("/api/contact", data);

      setStatus({ type: "success", message: "Success, send message" });
      reset();
    } catch (error: any) {
      const result = error.response?.data;
      if (result?.error === "Owner email missing") {
        setStatus({ type: "error", message: "Error, owner email missing" });
      } else {
        setStatus({
          type: "error",
          message: result?.error || "Failed to send message",
        });
      }
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section className="section-padding flex flex-col items-center relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-4 mb-16"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-medium text-foreground">
            Contact
          </h2>
          <div className="w-16 h-1 bg-primary/40 mx-auto rounded-full" />
        </div>
      </motion.div>

      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 z-[110] w-full max-w-xs px-4"
          >
            <Alert
              color="secondary"
              className="shadow-lg bg-black/10 glass backdrop-blur-2xl"
            >
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title className="">
                  Maaf, privasi. File tidak bisa diakses.
                </Alert.Title>
              </Alert.Content>
              <CloseButton
                onClick={() => setStatus(null)}
                className={"bg-red-900/10 glass text-foreground"}
              />
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-4xl w-full">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 glass p-8 md:p-10 rounded-4xl space-y-8"
        >
          <div className="space-y-3 mb-12">
            <h3 className="text-xl font-medium tracking-tight">Send Message</h3>
            <p className="text-muted-foreground font-light text-xs">
              I&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-1">
                  Name
                </div>
                <input
                  {...register("name")}
                  placeholder="Your name"
                  className="w-full bg-card border border-border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/30 text-base"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-1">
                  Email
                </div>
                <input
                  {...register("email")}
                  placeholder="your@example.com"
                  className="w-full bg-card border border-border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/30 text-base"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-1">
                Message
              </div>
              <textarea
                {...register("message")}
                placeholder="Your message..."
                rows={5}
                className="w-full bg-card border border-border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none placeholder:text-muted-foreground/30 text-base"
              />
              {errors.message && (
                <p className="text-xs text-red-500 ml-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-black px-5 py-2.5 rounded-full text-xs font-medium transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full md:w-auto justify-center"
            >
              <FaPaperPlane
                size={14}
                className={isSubmitting ? "animate-pulse" : ""}
              />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl space-y-6"
          >
            <h3 className="text-xl font-medium tracking-tight">
              Contact Information
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-inner shrink-0 cursor-pointer">
                  <FaEnvelope size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground mb-0.5">
                    Email
                  </p>
                  <p className="font-medium text-sm break-all">
                    blurkraken9999@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-inner shrink-0 cursor-pointer">
                  <FaPhone size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground mb-0.5">
                    Phone
                  </p>
                  <p className="font-medium text-sm break-words">
                    085646831030
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-inner shrink-0 cursor-pointer">
                  <FaMapMarkerAlt size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground mb-0.5">
                    Location
                  </p>
                  <p className="font-medium text-sm break-words">
                    Kaltim, Samarinda Kota
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-3xl space-y-6"
          >
            <h3 className="text-xl font-medium tracking-tight">
              Connect With Me
            </h3>

            <div className="flex gap-3">
              <a
                href="https://github.com/rohmanNEXT"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card hover:bg-primary hover:text-black rounded-full transition-all duration-500 border border-border shadow-xl"
              >
                <FaGithub size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-rachman-7b61b3276/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card hover:bg-primary hover:text-black rounded-full transition-all duration-500 border border-border shadow-xl"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="https://rohman-profile.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card hover:bg-primary hover:text-black rounded-full transition-all duration-500 border border-border shadow-xl"
              >
                <FaGlobe size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

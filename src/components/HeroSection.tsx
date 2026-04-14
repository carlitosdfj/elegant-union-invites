import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logoSS from "@/assets/logo-ss.jpeg";

const targetDate = new Date("2026-08-21T16:00:00").getTime();

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = Date.now();
    const diff = Math.max(0, targetDate - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const countdownItems = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <img
          src={logoSS}
          alt="Logo Sebastián & Sara"
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full mx-auto mb-8 object-cover shadow-md"
        />

        <p className="font-script text-xl sm:text-2xl text-warm-brown mb-6">
          Nos casamos
        </p>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-foreground leading-[1.1]">
          Sebastián
        </h1>
        <p className="font-serif text-3xl sm:text-4xl text-warm-brown my-2">&</p>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-foreground leading-[1.1]">
          Sara
        </h1>

        <div className="w-24 h-px bg-warm-brown mx-auto my-8" />

        <p className="font-script text-base sm:text-lg text-muted-foreground mt-1">
          Viernes, 21 de Agosto de 2026
        </p>
        <p className="font-sans-detail text-xs sm:text-sm tracking-[0.15em] text-muted-foreground mt-2">
          Rionegro, Antioquia
        </p>
      </motion.div>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-12 flex gap-4 sm:gap-8"
      >
        {countdownItems.map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-5xl font-light text-foreground">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="font-sans-detail text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;

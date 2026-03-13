import { motion } from "framer-motion";
import { Church, Wine, DoorOpen, UtensilsCrossed, Cake } from "lucide-react";

const events = [
  { time: "4:00 pm", title: "Ceremonia", icon: Church },
  { time: "5:00 pm", title: "Cóctel de Bienvenida & Fotos", icon: Wine },
  { time: "6:00 pm", title: "Entrada al Salón & Brindis", icon: DoorOpen },
  { time: "7:00 pm", title: "Cena", icon: UtensilsCrossed },
  { time: "8:00 pm", title: "Postres & Torta", icon: Cake },
];

const TimelineSection = () => {
  return (
    <section className="py-20 px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-serif text-4xl sm:text-5xl text-center mb-16 text-foreground font-light"
      >
        Itinerario
      </motion.h2>

      <div className="max-w-md mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-warm-brown/30" />

        {events.map((event, index) => {
          const Icon = event.icon;
          return (
            <motion.div
              key={event.time}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 sm:gap-6 mb-10 last:mb-0 relative"
            >
              {/* Icon circle */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-card border-2 border-warm-brown/30 flex items-center justify-center flex-shrink-0 z-10">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-warm-brown" />
              </div>

              <div className="pt-1 sm:pt-3">
                <p className="font-sans-detail text-xs tracking-[0.2em] uppercase text-warm-brown mb-1">
                  {event.time}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl text-foreground font-light">
                  {event.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TimelineSection;

import { motion } from "framer-motion";
import { Mail, UserX, Users } from "lucide-react";

const infoItems = [
  {
    icon: Mail,
    title: "Lluvia de Sobres",
    description: "Tu presencia es nuestro mejor regalo. Si deseas obsequiarnos algo, preferimos lluvia de sobres.",
  },
  {
    icon: UserX,
    title: "Evento solo para adultos",
    description: "Nos encantan los niños, pero en esta ocasión queremos celebrar solo con adultos.",
  },
  {
    icon: Users,
    title: "Invitación estrictamente personal",
    description: "Esta invitación es personal e intransferible. No se admiten acompañantes adicionales.",
  },
];

const ImportantInfoSection = () => {
  return (
    <section className="py-20 px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-serif text-4xl sm:text-5xl text-center mb-12 text-foreground font-light"
      >
        Información Importante
      </motion.h2>

      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-card border border-warm-brown/20 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-warm-brown" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
              <p className="font-sans-detail text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ImportantInfoSection;

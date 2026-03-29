import { motion } from "framer-motion";
import dressCodeImg from "@/assets/dress-code.png";

const forbiddenColors = [
  { name: "Blanco", color: "#FFFFFF", border: true },
  { name: "Negro", color: "#1a1a1a", border: false },
  { name: "Verdes", color: "#4a6741", border: false },
  { name: "Rose Gold", color: "#B76E79", border: false },
];

const DressCodeSection = () => {
  return (
    <section className="py-20 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-lg mx-auto"
      >
        <h2 className="font-serif text-4xl sm:text-5xl text-foreground font-light mb-4">
          Código de Vestimenta
        </h2>
        <p className="font-sans-detail text-lg tracking-[0.15em] uppercase text-warm-brown mb-8">
          Formal
        </p>

        <img
          src={dressCodeImg}
          alt="Referencia de vestimenta formal: vestido largo y traje"
          className="mx-auto w-64 sm:w-80 mb-10 opacity-80"
        />

        <div className="mb-6">
          <p className="font-sans-detail text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Colores no permitidos
          </p>

          <div className="flex justify-center gap-6 sm:gap-8 flex-wrap">
            {forbiddenColors.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full border-2"
                  style={{
                    backgroundColor: item.color,
                    borderColor: item.border ? "hsl(var(--muted-foreground))" : item.color,
                  }}
                />
                <span className="font-sans-detail text-xs text-muted-foreground">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DressCodeSection;

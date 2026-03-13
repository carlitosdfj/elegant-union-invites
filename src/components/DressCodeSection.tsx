import { motion } from "framer-motion";

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
        <p className="font-sans-detail text-lg tracking-[0.15em] uppercase text-warm-brown mb-10">
          Formal
        </p>

        <div className="mb-6">
          <p className="font-sans-detail text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Colores no permitidos
          </p>

          <div className="flex justify-center gap-6 sm:gap-8 flex-wrap">
            {forbiddenColors.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2">
                {/* Dress silhouette */}
                <div className="relative w-16 h-24 sm:w-20 sm:h-28">
                  <svg viewBox="0 0 60 80" className="w-full h-full">
                    {/* Simple dress silhouette */}
                    <path
                      d="M30 8 C25 8, 20 12, 18 18 L14 35 C14 35, 22 32, 30 32 C38 32, 46 35, 46 35 L42 18 C40 12, 35 8, 30 8 Z"
                      fill={item.color}
                      stroke={item.border ? "#ccc" : "none"}
                      strokeWidth="1"
                    />
                    <path
                      d="M14 35 L8 75 C8 75, 30 72, 52 75 L46 35 C46 35, 38 32, 30 32 C22 32, 14 35, 14 35 Z"
                      fill={item.color}
                      stroke={item.border ? "#ccc" : "none"}
                      strokeWidth="1"
                    />
                    {/* X mark */}
                    <line x1="18" y1="20" x2="42" y2="60" stroke="#C44" strokeWidth="3" strokeLinecap="round" />
                    <line x1="42" y1="20" x2="18" y2="60" stroke="#C44" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
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

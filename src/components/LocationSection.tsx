import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocationSection = () => {
  return (
    <section className="py-20 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-lg mx-auto"
      >
        <MapPin className="w-8 h-8 text-warm-brown mx-auto mb-4" />
        <h2 className="font-serif text-4xl sm:text-5xl text-foreground font-light mb-4">
          Lugar
        </h2>
        <h3 className="font-serif text-2xl sm:text-3xl text-warm-brown mb-2">
          Casa Cartagena
        </h3>
        <p className="font-sans-detail text-sm text-muted-foreground mb-8">
          Rionegro, Antioquia
        </p>

        <Button
          variant="wedding"
          size="lg"
          asChild
        >
          <a
            href="https://www.google.com/maps/search/Casa+Cartagena+Rionegro+Antioquia"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cómo Llegar
          </a>
        </Button>
      </motion.div>
    </section>
  );
};

export default LocationSection;

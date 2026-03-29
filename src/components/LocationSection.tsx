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
          Casa Cartagena – Wink Eventos
        </h3>
        <p className="font-sans-detail text-sm text-muted-foreground mb-2">
          Calle 38 transversal 24A
        </p>
        <p className="font-sans-detail text-sm text-muted-foreground mb-8">
          Rionegro, Antioquia, Colombia
        </p>

        <Button
          variant="wedding"
          size="lg"
          asChild
        >
          <a
            href="https://maps.app.goo.gl/QpmsAFdHpUUqv6Pt6"
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

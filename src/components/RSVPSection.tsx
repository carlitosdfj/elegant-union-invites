import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const RSVPSection = () => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);
  const [allergies, setAllergies] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || attendance === null) {
      toast.error("Por favor completa tu nombre y confirma tu asistencia.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("rsvps").insert({
        name: name.trim(),
        attendance: attendance === "yes",
        allergies: allergies.trim() || null,
      });

      if (error) throw error;

      setSubmitted(true);
      toast.success("¡Gracias por confirmar!");
    } catch {
      toast.error("Hubo un error. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <h2 className="font-serif text-4xl text-foreground font-light mb-4">
            ¡Gracias!
          </h2>
          <p className="font-sans-detail text-sm text-muted-foreground">
            {attendance === "yes"
              ? "Nos emociona que nos acompañes en este día tan especial."
              : "Lamentamos que no puedas acompañarnos. Te tendremos presente."}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto"
      >
        <h2 className="font-script text-4xl sm:text-5xl text-center mb-4 text-foreground">
          Confirma tu Asistencia
        </h2>
        <p className="font-sans-detail text-xs text-center text-muted-foreground mb-10 tracking-[0.15em]">
          Por favor confirma antes del 21 de julio de 2026
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-sans-detail text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
              Nombre completo
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="bg-card border-warm-brown/20 focus:border-warm-brown font-sans-detail text-sm"
              maxLength={100}
            />
          </div>

          <div>
            <label className="font-sans-detail text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3 block">
              ¿Asistirás?
            </label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={attendance === "yes" ? "wedding" : "wedding-outline"}
                size="lg"
                className="flex-1"
                onClick={() => setAttendance("yes")}
              >
                Sí, asistiré
              </Button>
              <Button
                type="button"
                variant={attendance === "no" ? "wedding" : "wedding-outline"}
                size="lg"
                className="flex-1"
                onClick={() => setAttendance("no")}
              >
                No podré ir
              </Button>
            </div>
          </div>

          <div>
            <label className="font-sans-detail text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
              Alergias alimentarias
            </label>
            <Textarea
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="¿Tienes alguna alergia o restricción alimentaria?"
              className="bg-card border-warm-brown/20 focus:border-warm-brown font-sans-detail text-sm resize-none"
              rows={3}
              maxLength={500}
            />
          </div>

          <Button
            type="submit"
            variant="wedding"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Confirmar"}
          </Button>
        </form>
      </motion.div>
    </section>
  );
};

export default RSVPSection;

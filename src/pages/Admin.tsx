import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Check, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface RSVP {
  id: string;
  name: string;
  attendance: boolean;
  allergies: string | null;
  created_at: string;
}

const Admin = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("get-rsvps", {
        body: { password },
      });

      if (fnError) throw fnError;
      if (data?.error) {
        setError(data.error);
        return;
      }

      setRsvps(data.rsvps || []);
      setAuthenticated(true);
    } catch {
      setError("Error al conectar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const attending = rsvps.filter((r) => r.attendance);
  const notAttending = rsvps.filter((r) => !r.attendance);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="max-w-sm w-full space-y-6 text-center">
          <Lock className="w-10 h-10 text-warm-brown mx-auto" />
          <h1 className="font-serif text-3xl text-foreground font-light">Admin</h1>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="bg-card border-warm-brown/20 focus:border-warm-brown font-sans-detail text-sm"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" variant="wedding" className="w-full" disabled={loading}>
            {loading ? "Verificando..." : "Entrar"}
          </Button>
          <Link to="/" className="font-sans-detail text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Volver a la invitación
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl text-foreground font-light">Confirmaciones</h1>
          <Link to="/" className="font-sans-detail text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Invitación
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-warm-brown/20 rounded-lg p-4 text-center">
            <p className="font-serif text-3xl text-foreground">{rsvps.length}</p>
            <p className="font-sans-detail text-xs text-muted-foreground tracking-wide uppercase">Total</p>
          </div>
          <div className="bg-card border border-warm-brown/20 rounded-lg p-4 text-center">
            <p className="font-serif text-3xl text-foreground">{attending.length}</p>
            <p className="font-sans-detail text-xs text-muted-foreground tracking-wide uppercase">Asisten</p>
          </div>
          <div className="bg-card border border-warm-brown/20 rounded-lg p-4 text-center">
            <p className="font-serif text-3xl text-foreground">{notAttending.length}</p>
            <p className="font-sans-detail text-xs text-muted-foreground tracking-wide uppercase">No asisten</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-warm-brown/20 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-warm-brown/10">
                <th className="text-left p-4 font-sans-detail text-xs uppercase tracking-wide text-muted-foreground">Nombre</th>
                <th className="text-center p-4 font-sans-detail text-xs uppercase tracking-wide text-muted-foreground">Asiste</th>
                <th className="text-left p-4 font-sans-detail text-xs uppercase tracking-wide text-muted-foreground">Alergias</th>
                <th className="text-left p-4 font-sans-detail text-xs uppercase tracking-wide text-muted-foreground">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp) => (
                <tr key={rsvp.id} className="border-b border-warm-brown/5">
                  <td className="p-4 font-sans-detail text-sm text-foreground">{rsvp.name}</td>
                  <td className="p-4 text-center">
                    {rsvp.attendance ? (
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 font-sans-detail text-sm text-muted-foreground">
                    {rsvp.allergies || "—"}
                  </td>
                  <td className="p-4 font-sans-detail text-xs text-muted-foreground">
                    {new Date(rsvp.created_at).toLocaleDateString("es-CO", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
              {rsvps.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center font-sans-detail text-sm text-muted-foreground">
                    Aún no hay confirmaciones
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;

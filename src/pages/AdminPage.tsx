import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { CalendarIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AnalyticsData {
  step_name: string;
  count: number;
}

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "KonvertiKompar") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
    }
  }, [isAuthenticated, startDate, endDate]);

  const handleLogin = () => {
    if (password === "KonvertiKompar") {
      localStorage.setItem("adminAuth", "KonvertiKompar");
      setIsAuthenticated(true);
      toast.success("Connexion réussie");
    } else {
      toast.error("Code incorrect");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    setPassword("");
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("quiz_analytics")
        .select("step_name")
        .gte("timestamp", startDate.toISOString())
        .lte("timestamp", endDate.toISOString());

      if (error) throw error;

      // Group by step name and count
      const grouped = data.reduce((acc: Record<string, number>, item) => {
        acc[item.step_name] = (acc[item.step_name] || 0) + 1;
        return acc;
      }, {});

      const formattedData = Object.entries(grouped).map(([step_name, count]) => ({
        step_name,
        count: count as number,
      }));

      // Sort by step number
      const stepOrder = [
        "Étape 1: Type de projet",
        "Étape 2: Localisation",
        "Étape 3: Budget",
        "Étape 4: Timeline",
        "Étape 5: Détails",
        "Étape 6: Coordonnées",
        "Confirmation",
        "Disqualifié: Budget",
        "Disqualifié: Timeline",
      ];

      formattedData.sort((a, b) => {
        const indexA = stepOrder.indexOf(a.step_name);
        const indexB = stepOrder.indexOf(b.step_name);
        return indexA - indexB;
      });

      setAnalytics(formattedData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Erreur lors du chargement des statistiques");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin - Kompar Analytics</h1>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Entrez le code d'accès"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Se connecter
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Statistiques du Quiz</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Période</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-2 block">Date de début</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(startDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-2 block">Date de fin</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(endDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Progression dans le quiz</h2>
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Chargement...</p>
          ) : analytics.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Aucune donnée pour cette période</p>
          ) : (
            <div className="space-y-4">
              {analytics.map((item) => (
                <div key={item.step_name} className="border-b border-border pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.step_name}</span>
                    <span className="text-2xl font-bold text-primary">{item.count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((item.count / Math.max(...analytics.map((a) => a.count))) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;

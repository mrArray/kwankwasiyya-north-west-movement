import { Card } from "@/components/ui/card";
import { useCountUp } from "@/hooks/useCountUp";
import { api, Statistics } from "@/lib/api";
import { TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function StatsCounter() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.getStatistics();
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (error) {
        // Silently fail for public page
        console.error("Failed to fetch statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const totalCount = useCountUp(stats?.totalSupporters || 0, 2500);
  const todayCount = useCountUp(stats?.todayRegistrations || 0, 2000);
  const weekCount = useCountUp(stats?.weekRegistrations || 0, 2000);

  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur">
                <div className="p-6 text-center">
                  <div className="h-8 w-32 bg-primary-foreground/20 animate-pulse rounded mx-auto mb-2" />
                  <div className="h-4 w-24 bg-primary-foreground/20 animate-pulse rounded mx-auto" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12" style={{background: 'linear-gradient(90deg, #e53935 0%, #fdeaea 80%)', color: '#fff'}}>
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-lg opacity-90">Real-time registration statistics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card style={{background: '#fff', border: '2px solid #e53935', color: '#e53935'}} className="shadow-sm">
            <div className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="h-12 w-12 rounded-full" style={{background: 'rgba(229,57,53,0.13)', color: '#e53935', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Users className="h-6 w-6" style={{color: '#e53935'}} />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 tabular-nums" style={{color: '#e53935'}}>
                {totalCount.toLocaleString()}
              </div>
              <div className="text-sm opacity-90 font-medium" style={{color: '#e53935'}}>Total Registered Supporters</div>
            </div>
          </Card>

          <Card style={{background: '#fff', border: '2px solid #e53935', color: '#e53935'}} className="shadow-sm">
            <div className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="h-12 w-12 rounded-full" style={{background: 'rgba(229,57,53,0.13)', color: '#e53935', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <TrendingUp className="h-6 w-6" style={{color: '#e53935'}} />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 tabular-nums" style={{color: '#e53935'}}>
                {todayCount.toLocaleString()}
              </div>
              <div className="text-sm opacity-90 font-medium" style={{color: '#e53935'}}>Registered Today</div>
            </div>
          </Card>

          <Card style={{background: '#fff', border: '2px solid #e53935', color: '#e53935'}} className="shadow-sm">
            <div className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="h-12 w-12 rounded-full" style={{background: 'rgba(229,57,53,0.13)', color: '#e53935', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <TrendingUp className="h-6 w-6" style={{color: '#e53935'}} />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 tabular-nums" style={{color: '#e53935'}}>
                {weekCount.toLocaleString()}
              </div>
              <div className="text-sm opacity-90 font-medium" style={{color: '#e53935'}}>Registered This Week</div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm opacity-75" style={{color: '#e53935'}}>
            <span className="inline-block w-2 h-2" style={{background: '#e53935', borderRadius: '9999px'}} />
            Live updates every 30 seconds
          </p>
        </div>
      </div>
    </section>
  );
}

import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, LGData, Metrics, StateData, TrendData } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminAnalytics() {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [stateData, setStateData] = useState<StateData[]>([]);
  const [lgData, setLgData] = useState<LGData[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const [trendsRes, stateRes, lgRes, metricsRes] = await Promise.all([
          api.getRegistrationTrends(30),
          api.getSupportersByState(),
          api.getSupportersByLG(),
          api.getKeyMetrics(),
        ]);

        if (trendsRes.success && trendsRes.data) {
          setTrends(trendsRes.data);
        }

        if (stateRes.success && stateRes.data) {
          setStateData(stateRes.data);
        }

        if (lgRes.success && lgRes.data) {
          setLgData(lgRes.data);
        }

        if (metricsRes.success && metricsRes.data) {
          setMetrics(metricsRes.data);
        }
      } catch (error) {
        toast.error("Failed to load analytics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const maxTrendValue = Math.max(...trends.map((t) => t.count), 1);
  const maxStateValue = Math.max(...stateData.map((s) => s.count), 1);
  const maxLgValue = Math.max(...lgData.slice(0, 10).map((l) => l.count), 1);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Analytics</h2>
          <p className="text-muted-foreground">Insights and trends from supporter registrations</p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 w-48 bg-muted animate-pulse rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            {metrics && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Supporters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{metrics.totalSupporters.toLocaleString()}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Average Age
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{typeof metrics.averageAge === 'number' ? metrics.averageAge.toFixed(1) : '-'}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      States Covered
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{metrics.statesCount}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Local Governments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{metrics.lgCount}</div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Registration Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Registration Trends (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                {trends.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No trend data available
                  </div>
                ) : (
                  <div className="space-y-2">
                    {trends.map((trend) => (
                      <div key={trend.date} className="flex items-center gap-4">
                        <div className="w-24 text-sm text-muted-foreground">
                          {new Date(trend.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-8 bg-primary rounded transition-all"
                              style={{
                                width: `${(trend.count / maxTrendValue) * 100}%`,
                                minWidth: trend.count > 0 ? "2rem" : "0",
                              }}
                            />
                            <span className="text-sm font-medium">{trend.count}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Supporters by State */}
            <Card>
              <CardHeader>
                <CardTitle>Supporters by State</CardTitle>
              </CardHeader>
              <CardContent>
                {stateData.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No state data available
                  </div>
                ) : (
                  <div className="space-y-2">
                    {stateData.map((state) => (
                      <div key={state.state} className="flex items-center gap-4">
                        <div className="w-32 text-sm font-medium truncate">{state.state}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-8 bg-chart-2 rounded transition-all"
                              style={{
                                width: `${(state.count / maxStateValue) * 100}%`,
                                minWidth: state.count > 0 ? "2rem" : "0",
                              }}
                            />
                            <span className="text-sm font-medium">{state.count.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top 10 Local Governments */}
            <Card>
              <CardHeader>
                <CardTitle>Top 10 Local Governments</CardTitle>
              </CardHeader>
              <CardContent>
                {lgData.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No local government data available
                  </div>
                ) : (
                  <div className="space-y-2">
                    {lgData.slice(0, 10).map((lg) => (
                      <div key={`${lg.state}-${lg.LG}`} className="flex items-center gap-4">
                        <div className="w-32 text-sm font-medium truncate">
                          {lg.LG}
                          <span className="text-xs text-muted-foreground block">{lg.state}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-8 bg-chart-3 rounded transition-all"
                              style={{
                                width: `${(lg.count / maxLgValue) * 100}%`,
                                minWidth: lg.count > 0 ? "2rem" : "0",
                              }}
                            />
                            <span className="text-sm font-medium">{lg.count.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

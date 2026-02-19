import React, { useState, useEffect } from "react";
import { AlertCircle, Zap, Flame, Brain } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardCardSkeleton from "@/components/dashboard/DashboardCardSkeleton";
import ToolForm from "@/components/dashboard/ToolForm";
import HistoryList from "@/components/dashboard/HistoryList";
import { Alert, AlertDescription } from "@/components/ui/alert";
import dashboardAPI, { DashboardStats, Report } from "@/lib/dashboardAPI";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentReports, setRecentReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const statsData = await dashboardAPI.getStats();
        setStats(statsData);

        const historyData = await dashboardAPI.getHistory(1, 5);
        setRecentReports(historyData.reports);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerateReport = async (inputData: Record<string, any>, type: string) => {
    try {
      setGenerating(true);
      setError(null);
      const newReport = await dashboardAPI.generateReport(inputData, type);
      setRecentReports((prev) => [newReport, ...prev]);

      // Refresh stats
      const updatedStats = await dashboardAPI.getStats();
      setStats(updatedStats);

      alert("Report generated successfully!");
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to generate report";
      setError(errorMsg);
      alert(errorMsg);
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    try {
      await dashboardAPI.deleteReport(reportId);
      setRecentReports((prev) => prev.filter((r) => r._id !== reportId));

      // Refresh stats
      const updatedStats = await dashboardAPI.getStats();
      setStats(updatedStats);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to delete report";
      alert(errorMsg);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome back, {stats?.userName || "User"}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your numerology insights and analysis at a glance.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <>
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
            </>
          ) : stats ? (
            <>
              <DashboardCard
                title="Total Reports"
                value={stats.totalReports}
                icon={<Brain size={24} className="text-white" />}
              />
              <DashboardCard
                title="Plan"
                value={stats.planType.toUpperCase()}
                subtitle={`${stats.usedQueries}/${stats.queryLimit} used`}
                icon={<Flame size={24} className="text-white" />}
              />
              <DashboardCard
                title="Remaining"
                value={stats.remainingUsage}
                subtitle="queries this month"
                icon={<Zap size={24} className="text-white" />}
                gradient="from-amber-600 to-orange-600"
              />
              <DashboardCard
                title="Status"
                value={stats.remainingUsage > 0 ? "Active" : "Limited"}
                subtitle={
                  stats.remainingUsage > 0
                    ? "Ready to generate"
                    : "Upgrade to continue"
                }
                icon={<AlertCircle size={24} className="text-white" />}
                gradient={stats.remainingUsage > 0 ? "from-green-600 to-emerald-600" : "from-red-600 to-pink-600"}
              />
            </>
          ) : null}
        </div>

        {/* Generate Report Section */}
        <ToolForm onSubmit={handleGenerateReport} loading={generating} />

        {/* Recent Reports */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Reports</h2>
          <HistoryList
            reports={recentReports}
            onDelete={handleDeleteReport}
            onView={(report) => {
              // TODO: Open report modal or navigate to detail page
              console.log("View report:", report);
            }}
            loading={loading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

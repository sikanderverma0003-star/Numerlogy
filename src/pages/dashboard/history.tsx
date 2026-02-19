import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import HistoryList from "@/components/dashboard/HistoryList";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import dashboardAPI, { Report } from "@/lib/dashboardAPI";

export default function HistoryPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await dashboardAPI.getHistory(page, 20);
        setReports(data.reports);
        setTotalPages(data.pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [page]);

  const handleDeleteReport = async (reportId: string) => {
    try {
      await dashboardAPI.deleteReport(reportId);
      setReports((prev) => prev.filter((r) => r._id !== reportId));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to delete report";
      alert(errorMsg);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Report History</h1>
          <p className="text-gray-600 mt-2">All your generated numerology reports and analyses</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Reports List */}
        <HistoryList
          reports={reports}
          onDelete={handleDeleteReport}
          onView={(report) => setSelectedReport(report)}
          loading={loading}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 items-center">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              variant="outline"
            >
              Previous
            </Button>
            <span className="text-gray-600 font-medium">
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}

        {/* Report Detail Modal would go here */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto p-8 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedReport.type.charAt(0).toUpperCase() + selectedReport.type.slice(1)} Report
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Input Data</p>
                  <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto text-gray-900">
                    {JSON.stringify(selectedReport.inputData, null, 2)}
                  </pre>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Results</p>
                  <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto text-gray-900">
                    {JSON.stringify(selectedReport.result, null, 2)}
                  </pre>
                </div>
              </div>
              <Button
                onClick={() => setSelectedReport(null)}
                className="w-full mt-6"
                variant="outline"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

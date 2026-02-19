import React from "react";
import { Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Report } from "@/lib/dashboardAPI";

interface HistoryListProps {
  reports: Report[];
  onDelete: (reportId: string) => void;
  onView: (report: Report) => void;
  loading?: boolean;
}

const HistoryList = ({ reports, onDelete, onView, loading = false }: HistoryListProps) => {
  if (loading) {
    return <div className="text-center py-12 text-gray-600">Loading reports...</div>;
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <p className="text-gray-600 mb-2">No reports yet. Create your first report to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report._id}
          className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 capitalize">
                {report.type} Report
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {report.inputData?.fullName || "Unnamed"} •{" "}
                {new Date(report.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Created {new Date(report.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => onView(report)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Eye size={16} />
                <span className="hidden sm:inline">View</span>
              </Button>
              <Button
                onClick={() => {
                  if (confirm("Are you sure you want to delete this report?")) {
                    onDelete(report._id);
                  }
                }}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;

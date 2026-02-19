import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-3 w-48" />
    </div>
  );
};

export default DashboardCardSkeleton;

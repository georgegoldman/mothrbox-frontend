"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "./data-table/history/column";
import { DataTable } from "@/components/data-table";
import { api } from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";
import type { HistoryResponse } from "@/lib/types";

export default function HistoryPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const res = await api.get<HistoryResponse>("/file-upload/history");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="mb-4 h-10 w-full" />
        <Skeleton className="mb-4 h-10 w-full" />
        <Skeleton className="mb-4 h-10 w-full" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-sm text-red-500">Failed to load history.</div>
    );
  }

  // if (data.docs.length === 0) {
  //   return (
  //     <div className="text-muted-foreground p-6 text-sm">No history yet 😴</div>
  //   );
  // }

  return (
    <div>
      <DataTable columns={columns} data={data.docs} />
    </div>
  );
}

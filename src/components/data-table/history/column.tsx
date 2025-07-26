/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { ColumnDef } from "@tanstack/react-table";
import type { HistoryItem } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

export const columns: ColumnDef<HistoryItem>[] = [
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "filesize",
    header: "Size",
  },
  {
    accessorKey: "type",
    header: "Algorithm",
  },
  {
    accessorKey: "operation",
    header: "Operation",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.operation}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={`font-medium ${
            status === "SUCCESSFUL" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) =>
      formatDistanceToNow(new Date(row.original.createdAt), {
        addSuffix: true,
      }),
  },
];

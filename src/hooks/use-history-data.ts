/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import { useState, useEffect } from "react";
import type { HistoryItem } from "@/components/history-log";

export function useHistoryData() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        setLoading(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 700));

        // Mock history data
        const mockHistory: HistoryItem[] = [
          {
            id: "1",
            fileName: "File-Hfgvehbejfdy7567.pdf",
            type: "AES",
            date: "29-02-2025",
            time: "14:30:22",
            status: "cancelled",
            size: "2.4 MB",
            user: "Michael John",
          },
          {
            id: "2",
            fileName: "File-Hfgvehbejfdy7567.pdf",
            type: "AES",
            date: "29-02-2025",
            time: "13:15:45",
            status: "successful",
            size: "1.8 MB",
            user: "Michael John",
          },
          {
            id: "3",
            fileName: "sensitive_data.txt",
            type: "XOR",
            date: "28-02-2025",
            time: "09:45:12",
            status: "successful",
            size: "45 KB",
            user: "Michael John",
          },
          {
            id: "4",
            fileName: "project_notes.docx",
            type: "AES",
            date: "27-02-2025",
            time: "16:22:33",
            status: "pending",
            size: "1.2 MB",
            user: "Michael John",
          },
          {
            id: "5",
            fileName: "financial_report_2025.xlsx",
            type: "XOR",
            date: "26-02-2025",
            time: "11:05:18",
            status: "successful",
            size: "3.7 MB",
            user: "Michael John",
          },
          {
            id: "6",
            fileName: "client_database.sql",
            type: "AES",
            date: "25-02-2025",
            time: "08:30:55",
            status: "cancelled",
            size: "8.2 MB",
            user: "Michael John",
          },
          {
            id: "7",
            fileName: "presentation_final.pptx",
            type: "XOR",
            date: "24-02-2025",
            time: "15:40:27",
            status: "successful",
            size: "5.1 MB",
            user: "Michael John",
          },
        ];

        setHistoryItems(mockHistory);
        setError(null);
      } catch (err) {
        setError("Failed to load history data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  return {
    historyItems,
    loading,
    error,
  };
}

"use client";

import {
  downloadAndDecryptFile,
  triggerFileDownload,
} from "@/app/actions/auth";
import { Header } from "@/components/header";
import { StatusBadge } from "@/components/status-badge";
import type { StatusType } from "@/lib/types";
import { Copy, File, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DecryptPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [selectedFile, setSelectedFile] = useState<globalThis.File | null>(
    null,
  );
  const [alias, setAlias] = useState<string>("");
  const [progress, setProgress] = useState(0);

  const simulateProgress = () => {
    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
      }
    }, 150); // feel free to tweak
  };

  // In DecryptPage.tsx
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a valid file!");
      return;
    }

    if (!alias.trim()) {
      toast.error("Please provide a decryption alias!");
      return;
    }

    toast.promise(
      downloadAndDecryptFile(selectedFile, alias).then(
        ({ decryptedBlob, originalFileName, originalFileType }) => {
          triggerFileDownload(
            decryptedBlob,
            originalFileName,
            originalFileType,
          );
          setSelectedFile(null);
          setProgress(0);
          return "File decrypted successfully!";
        },
      ),
      {
        loading: "Decrypting file...",
        success: (message) => message,
        error: (err: Error) => err.message || "Decryption failed!",
      },
    );
  };

  return (
    <div>
      <Header title="Decrypt" subtitle="Ready to decrypt your data?" />

      <div className="p-3 sm:p-4 md:p-6">
        <h2 className="mb-4 text-base font-medium md:text-lg">
          Upload Or Paste Your Decrypted File
        </h2>

        {/* Tabs */}
        <div className="mb-6 grid grid-cols-2 gap-2 sm:gap-4">
          <button
            className={`rounded-md py-2 text-center text-sm font-medium transition md:py-3 md:text-base ${
              activeTab === "upload"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Upload File
          </button>
          <button
            className={`rounded-md py-2 text-center text-sm font-medium transition md:py-3 md:text-base ${
              activeTab === "paste"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("paste")}
          >
            Paste File
          </button>
        </div>

        {/* Upload Section */}
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          {activeTab === "upload" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* File Upload UI */}
              <div className="mb-4 rounded-lg border border-dashed border-gray-700 bg-gray-800/50 p-4 md:p-6">
                {!selectedFile ? (
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 p-3">
                      <Upload className="h-5 w-5" />
                    </div>
                    <p className="mb-2 text-xs text-gray-400 sm:text-sm">
                      Drag & Drop your file here or click to upload
                    </p>
                    <input
                      type="file"
                      name="file"
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                          setProgress(0);
                          simulateProgress();
                        }
                      }}
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block cursor-pointer rounded bg-purple-600 px-3 py-1.5 text-xs font-medium hover:bg-purple-700 sm:px-4 sm:py-2 sm:text-sm"
                    >
                      Select File
                    </label>
                  </div>
                ) : (
                  <div className="mb-6 rounded-lg border border-gray-700 bg-gray-800/30 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-xs font-medium sm:text-sm">
                            {selectedFile.name.length > 20
                              ? selectedFile.name.substring(0, 20) + "..."
                              : selectedFile.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            ({(selectedFile.size / 1024).toFixed(2)} KB)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-400">{progress}%</div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setProgress(0);
                          }}
                          className="rounded-full p-1 hover:bg-gray-700"
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 h-1 rounded-full bg-gray-700">
                      <div
                        className="h-1 rounded-full bg-purple-600 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* alias Input */}
              <div>
                <label
                  htmlFor="alias"
                  className="mb-2 block text-xs text-gray-400 sm:text-sm"
                >
                  Enter your decryption alias
                </label>
                <input
                  type="password"
                  name="alias"
                  id="alias"
                  placeholder="e.g. 4erfth76e5rgfgjkj"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-800/50 p-3 text-sm focus:border-purple-500 focus:outline-none md:p-4"
                />
              </div>
            </div>
          )}

          {/* Paste Text Section */}
          {activeTab === "paste" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <div>
                <textarea
                  className="mb-4 h-24 w-full rounded-lg border border-dashed border-gray-700 bg-gray-800/50 p-3 text-sm focus:border-purple-500 focus:outline-none md:h-32 md:p-4"
                  placeholder="Paste your text your encrypted text here..."
                ></textarea>
              </div>

              <div>
                <label className="mb-2 block text-xs text-gray-400 sm:text-sm">
                  Enter your decryption or alias
                </label>
                <input
                  type="password"
                  className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm focus:border-purple-500 focus:outline-none md:p-3"
                  placeholder="e.g.4erfth76e5rgfgjkj"
                />
              </div>
            </div>
          )}

          <button className="mt-6 w-full rounded-lg bg-purple-600 py-2 text-sm font-medium transition hover:bg-purple-700 md:py-3">
            Decrypt Now
          </button>
        </form>

        <div className="mt-8">
          <h2 className="mb-4 text-base font-medium md:text-lg">
            Recent History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 text-left text-xs text-gray-400">
                  <th className="pb-2">File/Text</th>
                  <th className="pb-2 text-center">Type</th>
                  <th className="pb-2 text-center">Date</th>
                  <th className="pb-2 text-center">Status</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm">
                {[
                  {
                    file: "File-Hfgvehbejfdy7567.pdf",
                    type: "XOR",
                    date: "29-02-2025",
                    status: "successful" as StatusType,
                  },
                  {
                    file: "File-Hfgvehbejfdy7567.pdf",
                    type: "AES",
                    date: "29-02-2025",
                    status: "pending" as StatusType,
                  },
                  {
                    file: "File-Hfgvehbejfdy7567.pdf",
                    type: "XOR",
                    date: "29-02-2025",
                    status: "successful" as StatusType,
                  },
                  {
                    file: "File-Hfgvehbejfdy7567.pdf",
                    type: "XOR",
                    date: "29-02-2025",
                    status: "successful" as StatusType,
                  },
                  {
                    file: "File-Hfgvehbejfdy7567.pdf",
                    type: "AES",
                    date: "29-02-2025",
                    status: "cancelled" as StatusType,
                  },
                ].map((item, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="flex items-center gap-2 py-3">
                      <File className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="max-w-[80px] truncate sm:max-w-[120px] md:max-w-none">
                        {item.file}
                      </span>
                    </td>
                    <td className="text-center">{item.type}</td>
                    <td className="text-center">{item.date}</td>
                    <td className="text-center">
                      <StatusBadge status={item.status} className="text-xs" />
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="rounded p-1 hover:bg-gray-700">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button className="rounded p-1 hover:bg-gray-700">
                          <Upload className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

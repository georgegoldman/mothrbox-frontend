"use client";

import { Header } from "@/components/header";
import { StatusBadge } from "@/components/status-badge";
import type { StatusType } from "@/lib/types";
import { Copy, File, Upload, X } from "lucide-react";
import { useState } from "react";

export default function DecryptPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [selectedFile, setSelectedFile] = useState<globalThis.File | null>(
    null,
  );

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Welcome back Michael, Ready to secure your data?"
      />

      <div className="p-6">
        <h2 className="mb-4 text-lg font-medium">
          Upload Or Paste Your Decrypted File
        </h2>

        {/* Tabs */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <button
            className={`rounded-md py-3 text-center font-medium transition ${
              activeTab === "upload"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Upload File
          </button>
          <button
            className={`rounded-md py-3 text-center font-medium transition ${
              activeTab === "paste"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("paste")}
          >
            Paste File
          </button>
        </div>

        {/* Upload File Section */}
        {activeTab === "upload" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="mb-4 rounded-lg border border-dashed border-gray-700 bg-gray-800/50 p-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 p-3">
                    <Upload className="h-5 w-5" />
                  </div>
                  <p className="mb-2 text-sm text-gray-400">
                    Drag & Drop your encrypted file here or click to upload
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                      }
                    }}
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block cursor-pointer rounded bg-purple-600 px-4 py-2 text-sm font-medium hover:bg-purple-700"
                  >
                    Select File
                  </label>
                </div>
              </div>

              {selectedFile && (
                <div className="mb-6 rounded-lg border border-gray-700 bg-gray-800/30 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <File className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          ({(selectedFile.size / 1024).toFixed(2)} KB)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-gray-400">80%</div>
                      <button className="rounded-full p-1 hover:bg-gray-700">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-gray-700">
                    <div className="h-1 w-4/5 rounded-full bg-purple-600"></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Enter your decryption or passphrase
              </label>
              <input
                type="password"
                className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-purple-500 focus:outline-none"
                placeholder="e.g.4erfth76e5rgfgjkj"
              />
            </div>
          </div>
        )}

        {/* Paste Text Section */}
        {activeTab === "paste" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <textarea
                className="mb-4 h-32 w-full rounded-lg border border-dashed border-gray-700 bg-gray-800/50 p-4 focus:border-purple-500 focus:outline-none"
                placeholder="Paste your text your encrypted text here..."
              ></textarea>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Enter your decryption or passphrase
              </label>
              <input
                type="password"
                className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-purple-500 focus:outline-none"
                placeholder="e.g.4erfth76e5rgfgjkj"
              />
            </div>
          </div>
        )}

        <button className="mt-6 w-full rounded-lg bg-purple-600 py-3 font-medium transition hover:bg-purple-700">
          Decrypt Now
        </button>

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-medium">Recent History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 text-left text-xs text-gray-400">
                  <th className="pb-2">File/Text</th>
                  <th className="pb-2 text-center">Encryption type</th>
                  <th className="pb-2 text-center">Date</th>
                  <th className="pb-2 text-center">Status</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
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
                  <tr
                    key={index}
                    className="border-b border-gray-700/50 text-sm"
                  >
                    <td className="flex items-center gap-2 py-3">
                      <File className="h-4 w-4 text-gray-400" />
                      {item.file}
                    </td>
                    <td className="text-center">{item.type}</td>
                    <td className="text-center">{item.date}</td>
                    <td className="text-center">
                      <StatusBadge status={item.status} />
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

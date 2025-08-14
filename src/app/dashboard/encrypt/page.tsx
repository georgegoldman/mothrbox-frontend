"use client";

import { Header } from "@/components/header";
import HistoryPage from "@/components/history";
import { extractApiError } from "@/lib/axios";
import { useEncryptFile } from "@/lib/dal/encrypt";
import { getCookieValue } from "@/lib/helpers";
import { ChevronDown, File, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function EncryptPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [selectedFile, setSelectedFile] = useState<globalThis.File | null>(
    null,
  );
  const [alias, setAlias] = useState<string>("");
  // const [tempStore, setTempStore] = useState(true);
  const [progress, setProgress] = useState(0);
  const { mutateAsync: encrypt } = useEncryptFile();

  const simulateProgress = () => {
    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
      }
    }, 150); // adjust speed here
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile || selectedFile.size === 0 || selectedFile.name === "") {
      toast.error("Please select a valid file before submitting!");
      return;
    }

    const payload = {
      file: selectedFile,
      alias,
      owner: getCookieValue("userId") ?? "unknown", // Replace with your logic
    };

    toast.promise(encrypt(payload), {
      loading: "Encrypting file...",
      success: () => {
        setSelectedFile(null);
        setAlias("");
        setProgress(0);
        return "File encrypted successfully!";
      },
      error: (err) => extractApiError(err),
    });
  };

  return (
    <div>
      <Header title="Encrypt Data" subtitle="Ready to encrypt your data?" />

      <div className="p-3 sm:p-4 md:p-6">
        <h2 className="mb-4 text-base font-medium md:text-lg">
          Upload Or Paste Your Encrypted File
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

        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          {/* Upload File Section */}
          {activeTab === "upload" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="mb-4 rounded-lg border border-dashed border-gray-700 bg-gray-800/50 p-4 md:p-6">
                {!selectedFile && (
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 p-3">
                      <Upload className="h-5 w-5" />
                    </div>
                    <p className="mb-2 text-xs text-gray-400 sm:text-sm">
                      Drag & Drop your encrypted file here or click to upload
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
                          setProgress(0); // Reset progress
                          simulateProgress(); // Start loading bar
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
                )}

                {selectedFile && (
                  <div className="mb-6 rounded-lg border border-gray-700 bg-gray-800/30 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 flex-shrink-0 text-gray-400 sm:h-5 sm:w-5" />
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-red-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
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

              <div>
                <label
                  htmlFor="alias"
                  className="mb-2 block text-xs text-gray-400 sm:text-sm"
                >
                  Encryption Key Alias
                </label>
                <input
                  type="text"
                  name="alias"
                  id="alias"
                  placeholder="Enter Alias"
                  onChange={(e) => setAlias(e.target.value)}
                  className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-800/50 p-3 text-sm focus:border-purple-500 focus:outline-none md:p-4"
                />
              </div>

              {/* Uncomment this section if you're using encryption method selector */}
              {/* <div>
      <label className="mb-2 block text-xs text-gray-400 sm:text-sm">
        Select encryption method e.g., XOR, AES
      </label>
      <div className="relative">
        <select className="w-full appearance-none rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm focus:border-purple-500 focus:outline-none md:p-3">
          <option value="">Select</option>
          <option value="xor">XOR</option>
          <option value="aes">AES</option>
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 sm:h-5 sm:w-5" />
      </div>
    </div> */}
            </div>
          )}

          {/* Paste Text Section */}
          {activeTab === "paste" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <textarea
                className="mb-4 h-24 w-full rounded-lg border border-dashed border-gray-700 bg-gray-800/50 p-3 text-sm focus:border-purple-500 focus:outline-none md:h-32 md:p-4"
                placeholder="Paste your text your encrypted text here..."
              />

              <div>
                <label className="mb-2 block text-xs text-gray-400 sm:text-sm">
                  Select encryption method e.g., XOR, AES
                </label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm focus:border-purple-500 focus:outline-none md:p-3">
                    <option value="">Select</option>
                    <option value="xor">XOR</option>
                    <option value="aes">AES</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 sm:h-5 sm:w-5" />
                </div>
              </div>
            </div>
          )}

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2"></div>

          {/* <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="temp-store"
              className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-900"
              checked={tempStore}
              onChange={(e) => setTempStore(e.target.checked)}
            />
            <label
              htmlFor="temp-store"
              className="ml-2 text-xs text-gray-300 sm:text-sm"
            >
              Temporarily store encrypted file (auto-deletes after 24 hours)
            </label>
          </div> */}

          <button className="w-full rounded-lg bg-purple-600 py-2 text-sm font-medium transition hover:bg-purple-700 md:py-3">
            Encrypt Now
          </button>
        </form>

        <div className="mt-8">
          <h2 className="mb-4 text-base font-medium md:text-lg">
            Recent History
          </h2>
          <div>
            <HistoryPage />
            {/* <table className="w-full">
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
            </table> */}
          </div>
        </div>
      </div>
    </div>
  );
}

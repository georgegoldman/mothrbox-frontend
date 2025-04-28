"use client"

import { Header } from "@/components/header"
import { StatusBadge } from "@/components/status-badge"
import { Copy, File, Upload, X } from "lucide-react"
import { useState } from "react"

export default function DecryptPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  return (
    <div>
      <Header title="Dashboard" subtitle="Welcome back Michael, Ready to secure your data?" />

      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">Upload Or Paste Your Decrypted File</h2>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            className={`py-3 rounded-md text-center font-medium transition ${
              activeTab === "upload" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Upload File
          </button>
          <button
            className={`py-3 rounded-md text-center font-medium transition ${
              activeTab === "paste" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("paste")}
          >
            Paste File
          </button>
        </div>

        {/* Upload File Section */}
        {activeTab === "upload" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-gray-800/50 border border-gray-700 border-dashed rounded-lg p-6 mb-4">
                <div className="text-center">
                  <div className="bg-purple-600 rounded-lg p-3 w-10 h-10 flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Drag & Drop your encrypted file here or click to upload</p>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0])
                      }
                    }}
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm font-medium cursor-pointer"
                  >
                    Select File
                  </label>
                </div>
              </div>

              {selectedFile && (
                <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <File className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-gray-400">({(selectedFile.size / 1024).toFixed(2)} KB)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-gray-400">80%</div>
                      <button className="p-1 rounded-full hover:bg-gray-700">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="h-1 bg-gray-700 rounded-full mt-2">
                    <div className="h-1 bg-purple-600 rounded-full w-4/5"></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Enter your decryption or passphrase</label>
              <input
                type="password"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 mb-4 focus:outline-none focus:border-purple-500"
                placeholder="e.g.4erfth76e5rgfgjkj"
              />
            </div>
          </div>
        )}

        {/* Paste Text Section */}
        {activeTab === "paste" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <textarea
                className="w-full h-32 bg-gray-800/50 border border-gray-700 border-dashed rounded-lg p-4 mb-4 focus:outline-none focus:border-purple-500"
                placeholder="Paste your text your encrypted text here..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Enter your decryption or passphrase</label>
              <input
                type="password"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 mb-4 focus:outline-none focus:border-purple-500"
                placeholder="e.g.4erfth76e5rgfgjkj"
              />
            </div>
          </div>
        )}

        <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition mt-6">
          Decrypt Now
        </button>

        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Recent History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-700">
                  <th className="pb-2">File/Text</th>
                  <th className="pb-2">Encryption type</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { file: "File-Hfgvehbejfdy7567.pdf", type: "XOR", date: "29-02-2025", status: "successful" },
                  { file: "File-Hfgvehbejfdy7567.pdf", type: "AES", date: "29-02-2025", status: "pending" },
                  { file: "File-Hfgvehbejfdy7567.pdf", type: "XOR", date: "29-02-2025", status: "successful" },
                  { file: "File-Hfgvehbejfdy7567.pdf", type: "XOR", date: "29-02-2025", status: "successful" },
                  { file: "File-Hfgvehbejfdy7567.pdf", type: "AES", date: "29-02-2025", status: "cancelled" },
                ].map((item, index) => (
                  <tr key={index} className="border-b border-gray-700/50 text-sm">
                    <td className="py-3 flex items-center gap-2">
                      <File className="h-4 w-4 text-gray-400" />
                      {item.file}
                    </td>
                    <td>{item.type}</td>
                    <td>{item.date}</td>
                    <td>
                      <StatusBadge status={item.status as any} />
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1 rounded hover:bg-gray-700">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-700">
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
  )
}

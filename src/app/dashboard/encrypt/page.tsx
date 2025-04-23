"use client";

import TitleBar from "@/components/TitleBar";
import { useState, useRef } from "react";

type HistoryItem = {
  name: string;
  type: string;
  date: string;
  status: "Successful" | "Pending" | "Cancelled";
  action: string;
};

export default function EncryptPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [encryptionMethod, setEncryptionMethod] = useState("");
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const recentHistory: HistoryItem[] = [
    {
      name: "File-Hfgvehbejj4y7567.pdf",
      type: "XOR",
      date: "29-02-2025",
      status: "Successful",
      action: "View"
    },
    {
      name: "File-Hfgvehbejj4y7567.pdf",
      type: "AES",
      date: "29-02-2025",
      status: "Pending",
      action: "View"
    },
    {
      name: "File-Hfgvehbejj4y7567.pdf",
      type: "XOR",
      date: "29-02-2025",
      status: "Successful",
      action: "View"
    },
    {
      name: "File-Hfgvehbejj4y7567.pdf",
      type: "XOR",
      date: "29-02-2025",
      status: "Successful",
      action: "View"
    },
    {
      name: "File-Hfgvehbejj4y7567.pdf",
      type: "AES",
      date: "29-02-2025",
      status: "Cancelled",
      action: "View"
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 86) {
          progress = 86;
          clearInterval(interval);
        }
        setUploadProgress(progress);
      }, 200);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setUploadProgress(86); // Set progress directly for drag & drop
    }
  };

  return (
    <>
    <TitleBar title="Usage Statistics" />
    <div className="container mt-4">
      <h2 className="mb-4">Upload Or Paste Your Encrypted File</h2>

      {/* Tabs */}
<div className="d-flex mb-3 border-bottom">
  <button 
    className={`btn btn-primary btn-lg p-0 mr-3 ${activeTab === 'upload' ? 'text-primary font-weight-bold border-bottom border-primary border-2' : 'text-secondary'}`}
    onClick={() => setActiveTab('upload')}
    style={{
      background: 'none',
      border: 'none',
      borderBottom: activeTab === 'upload' ? '2px solid #0d6efd' : 'none',
      paddingBottom: '8px',
      marginBottom: '-1px'
    }}
  >
    Upload File
  </button>
  <button 
    className={`btn btn-primary btn-lg p-0 ${activeTab === 'paste' ? 'text-primary font-weight-bold border-bottom border-primary border-2' : 'text-secondary'}`}
    onClick={() => setActiveTab('paste')}
    style={{
      background: 'none',
      border: 'none',
      borderBottom: activeTab === 'paste' ? '2px solid #0d6efd' : 'none',
      paddingBottom: '8px',
      marginBottom: '-1px'
    }}
  >
    Paste File
  </button>
</div>

{activeTab === 'upload' ? (
  <div className="card mb-4 border-0 shadow-sm">
    <div className="card-body p-4">
      <div className="row mb-4">
        <div className="col-md-6">
          <h6 className="font-weight-bold">Upload File</h6>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <select 
              className="form-control"
              value={encryptionMethod}
              onChange={(e) => setEncryptionMethod(e.target.value)}
            >
              <option value="">Select encryption method e.g., XOR, AES</option>
              <option value="XOR">XOR</option>
              <option value="AES">AES</option>
            </select>
          </div>
        </div>
      </div>

      <div 
        className="border rounded p-5 text-center mb-3"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ borderStyle: 'dashed', cursor: 'pointer' }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="d-none"
          onChange={handleFileChange}
        />
        <p className="mb-1">Drag & Drop your encrypted file here or click to upload</p>
        {selectedFile && (
          <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span>{selectedFile.name.replace('=', '-')} ({(selectedFile.size / (1024 * 1024)).toFixed(1)}MB)</span>
              <span>86%</span>
            </div>
            <div className="progress">
              <div 
                className="progress-bar" 
                role="progressbar" 
                style={{ width: '86%' }}
                aria-valuenow={86}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        )}
      </div>

      <p className="text-muted small mb-4">
        Temporarily store encrypted file (auto-deletes after 24 hours)
      </p>

      <button className="btn btn-primary px-4">Encrypt Now</button>
    </div>
  </div>
) : (
  <div className="card mb-4 border-0 shadow-sm">
    <div className="card-body p-4">
      <h6 className="font-weight-bold mb-3">Paste your encrypted text here...</h6>
      
      <div className="form-group mb-4">
        <select 
          className="form-control"
          value={encryptionMethod}
          onChange={(e) => setEncryptionMethod(e.target.value)}
        >
          <option value="">Select encryption method e.g., XOR, AES</option>
          <option value="XOR">XOR</option>
          <option value="AES">AES</option>
        </select>
      </div>

      <div className="form-group mb-4">
        <textarea 
          className="form-control" 
          rows={5}
          placeholder="Paste your encrypted content here..."
        ></textarea>
      </div>

      <p className="text-muted small mb-4">
        Temporarily store encrypted file (auto-deletes after 24 hours)
      </p>

      <button className="btn btn-primary px-4">Encrypt Now</button>
    </div>
  </div>
)}

      {/* Recent History */}
      <div className="card">
        <div className="card-body">
          <h5 className="mb-3">Recent History</h5>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>File/Text</th>
                  <th>Encryption type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentHistory.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.date}</td>
                    <td>
                      <span className={`badge ${
                        item.status === 'Successful' ? 'badge-success' :
                        item.status === 'Pending' ? 'badge-warning' :
                        'badge-secondary'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {item.status === 'Cancelled' ? (
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-muted">You can only view and comment on this file.</span>
                          <button className="btn btn-link p-0">Ask to edit</button>
                        </div>
                      ) : (
                        <button className="btn btn-outline-primary btn-sm">View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div></>
  );
}
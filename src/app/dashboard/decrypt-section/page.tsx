"use client";

import { useState } from 'react';

import TitleBar from "@/components/TitleBar";

export default function DecryptPage() {
    const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

    return (
        <>
        <div className="">
            <TitleBar title="Decrypt API" />
            <div className="container mt-4">
      <h2 className="mb-3">Endpoint</h2>
      <p className="mb-4">Use this endpoint to securely encrypt keys or files using your API key.</p>

      {/* Endpoint URL */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className="badge bg-primary me-2">POST</span>
              <code>/api/v/encrypt</code>
            </div>
            <button 
              className="btn btn-outline-primary btn-sm"
              onClick={() => copyToClipboard('POST /api/v/encrypt', 'endpoint')}
            >
              {copied === 'endpoint' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Request Section */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body p-3">
          <h5 className="mb-3">Request:</h5>
          <div className="bg-light p-3 rounded mb-3">
            <pre className="mb-0">
              <code>curl -X POST "https://api.cryptix.com/decrypt" -H "Authorization: Bearer"</code>
            </pre>
          </div>
          <button 
            className="btn btn-outline-primary btn-sm"
            onClick={() => copyToClipboard('curl -X POST "https://api.cryptix.com/decrypt" -H "Authorization: Bearer"', 'request')}
          >
            {copied === 'request' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Response Section */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body p-3">
          <h5 className="mb-3">Response:</h5>
          <div className="bg-light p-3 rounded mb-3">
            <pre className="mb-0">
              <code>{"{\"decrypted\": \"hello world\"}"}</code>
            </pre>
          </div>
          <button 
            className="btn btn-outline-primary btn-sm"
            onClick={() => copyToClipboard('{"decrypted": "hello world"}', 'response')}
          >
            {copied === 'response' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Error Section */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-3">
          <h5 className="mb-3">Error:</h5>
          <h6 className="text-muted mb-3">Usage</h6>
          
          <div className="mb-3">
            <span className="badge bg-danger me-2">401</span>
            <span>Rate Limit Exceeded</span>
          </div>
          <div className="mb-3">
            <span className="badge bg-danger me-2">401</span>
            <span>Invalid or missing API key</span>
          </div>
          <div className="mb-3">
            <span className="badge bg-danger me-2">401</span>
            <span>Unauthorized</span>
          </div>
          <div className="mb-4">
            <span className="badge bg-danger me-2">400</span>
            <span>Invalid or invalid event</span>
          </div>

          <h6 className="text-muted mb-3">Rate Limit:</h6>
          <h6 className="text-muted mb-3">Usage</h6>
          
          <ul className="list-unstyled">
            <li className="mb-1">10 requests/seconds</li>
            <li className="mb-1">1000 requests/lists</li>
          </ul>
        </div>
      </div>
    </div>
        </div>
        </>
    )
}
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
    <div>
      <TitleBar title="Encrypt API" />

      <div className="container mt-4">
        <h2 className="mb-3">Endpoint</h2>
        <p className="mb-4">
          Use this endpoint to securely encrypt keys or files using your API key.
        </p>

        {/* Endpoint Section */}
        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
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

        {/* Request Section */}
        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">Request:</h5>
            <div className="bg-light p-3 rounded mb-3">
              <pre className="mb-0 text-wrap">
                <code>
                  curl -X POST "https://api.cryptix.com/encrypt" \<br />
                  -H "Content-Type: application/json" \<br />
                  -H "Authorization: Bearer YOUR_API_KEY" \<br />
                  {/* -d '{{"text":"hello world"}}' */}
                </code>
              </pre>
            </div>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() =>
                copyToClipboard(
                  `curl -X POST "https://api.cryptix.com/encrypt" \\\n-H "Content-Type: application/json" \\\n-H "Authorization: Bearer YOUR_API_KEY" \\\n-d '{"text":"hello world"}'`,
                  'request'
                )
              }
            >
              {copied === 'request' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Response Section */}
        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">Response:</h5>
            <div className="bg-light p-3 rounded mb-3">
              <pre className="mb-0">
                <code>{'{"encrypted": "aGVsbG8gd29ybGQ="}'}</code>
              </pre>
            </div>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => copyToClipboard('{"encrypted": "aGVsbG8gd29ybGQ="}', 'response')}
            >
              {copied === 'response' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Error Section */}
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">Error:</h5>
            <h6 className="text-muted mb-3">Usage</h6>

            <div className="mb-3">
              <span className="badge bg-danger me-2">401</span>
              Rate Limit Exceeded
            </div>
            <div className="mb-3">
              <span className="badge bg-danger me-2">401</span>
              Invalid or missing API key
            </div>
            <div className="mb-3">
              <span className="badge bg-danger me-2">401</span>
              Unauthorized
            </div>
            <div className="mb-4">
              <span className="badge bg-danger me-2">400</span>
              Invalid input data
            </div>

            <h6 className="text-muted mb-3">Rate Limit:</h6>
            <ul className="list-unstyled">
              <li className="mb-1">10 requests/second</li>
              <li className="mb-1">1000 requests/day</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

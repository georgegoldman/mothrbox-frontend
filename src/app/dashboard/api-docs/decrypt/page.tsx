import { Header } from "@/components/header";
import { Copy } from "lucide-react";

export default function DecryptApiPage() {
  return (
    <div>
      <Header title="Decrypt API" />

      <div className="p-3 sm:p-4 md:p-6">
        <div className="mb-4 rounded-xl bg-gray-800/50 p-4 md:mb-6 md:p-6">
          <h2 className="mb-2 text-sm font-medium">Endpoint</h2>
          <p className="mb-4 text-xs text-gray-400">
            Use this endpoint to securely decrypt text or files using your API
            key.
          </p>

          <div className="mb-4 flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 md:px-4">
            <span className="text-xs sm:text-sm">POST /api/v1/decrypt</span>
            <button className="ml-auto rounded p-1 hover:bg-gray-700">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-4 rounded-xl bg-gray-800/50 p-4 md:mb-6 md:p-6">
          <h2 className="mb-2 text-sm font-medium">Request:</h2>

          <div className="mb-4 flex items-center gap-2 overflow-x-auto rounded-lg bg-gray-800 px-3 py-2 md:px-4">
            <span className="font-mono text-xs whitespace-nowrap sm:text-sm">
              {`bash curl -X POST "https://api.cryptix.com/decrypt" -H "Authorization: Bearer"`}
            </span>
            <button className="ml-auto flex-shrink-0 rounded p-1 hover:bg-gray-700">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-4 rounded-xl bg-gray-800/50 p-4 md:mb-6 md:p-6">
          <h2 className="mb-2 text-sm font-medium">Response:</h2>

          <div className="mb-4 flex items-center gap-2 overflow-x-auto rounded-lg bg-gray-800 px-3 py-2 md:px-4">
            <span className="font-mono text-xs whitespace-nowrap sm:text-sm">
              json {'decrypted": "hello world'}
            </span>
            <button className="ml-auto flex-shrink-0 rounded p-1 hover:bg-gray-700">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-4 rounded-xl bg-gray-800/50 p-4 md:mb-6 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium">Error:</h2>
            <span className="rounded bg-gray-700 px-2 py-1 text-xs">Usage</span>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-4">
              <h3 className="mb-1 text-xs font-medium sm:text-sm">
                401 Rate Limit Exceeded
              </h3>
              <p className="text-xs text-gray-400">
                Invalid or missing API key
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-4">
              <h3 className="mb-1 text-xs font-medium sm:text-sm">
                Unauthorized
              </h3>
              <p className="text-xs text-gray-400">Invalid or invalid token</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gray-800/50 p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium">Rate Limit:</h2>
            <span className="rounded bg-gray-700 px-2 py-1 text-xs">Usage</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-4 text-center">
              <p className="text-sm font-medium">10</p>
              <p className="text-xs text-gray-400">requests/seconds</p>
            </div>
            <div className="rounded-lg bg-gray-800 p-4 text-center">
              <p className="text-sm font-medium">1000</p>
              <p className="text-xs text-gray-400">requests/day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

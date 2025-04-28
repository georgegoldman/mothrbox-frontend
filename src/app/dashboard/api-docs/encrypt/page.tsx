import { Header } from "@/components/header"
import { Copy } from "lucide-react"

export default function EncryptApiPage() {
  return (
    <div>
      <Header title="Encrypt API" />

      <div className="p-6">
        <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-medium mb-2">Endpoint</h2>
          <p className="text-xs text-gray-400 mb-4">
            Use this endpoint to securely encrypt text or files using your API key.
          </p>

          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 mb-4">
            <span className="text-sm">POST /api/v1/encrypt</span>
            <button className="ml-auto p-1 rounded hover:bg-gray-700">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-medium mb-2">Request:</h2>

          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 mb-4">
            <span className="text-sm font-mono">
              bash curl -X POST "https://api.cryptix.com/encrypt" -H "Authorization: Bearer"
            </span>
            <button className="ml-auto p-1 rounded hover:bg-gray-700">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-medium mb-2">Response:</h2>

          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 mb-4">
            <span className="text-sm font-mono">json {'decrypted": "hello world'}</span>
            <button className="ml-auto p-1 rounded hover:bg-gray-700">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium">Error:</h2>
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">Usage</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-1">401 Rate Limit Exceeded</h3>
              <p className="text-xs text-gray-400">Invalid or missing API key</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-1">Unauthorized</h3>
              <p className="text-xs text-gray-400">Invalid or invalid token</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium">Rate Limit:</h2>
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">Usage</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-sm font-medium">10</p>
              <p className="text-xs text-gray-400">requests/seconds</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-sm font-medium">1000</p>
              <p className="text-xs text-gray-400">requests/day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Header } from "@/components/header"

export default function ErrorsPage() {
  return (
    <div>
      <Header title="Error" />

      <div className="p-6">
        <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium">Error:</h2>
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">Usage</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-1">400 Bad Request</h3>
              <p className="text-xs text-gray-400">Invalid or missing parameters</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-1">401 Unauthorized</h3>
              <p className="text-xs text-gray-400">Invalid or missing API key</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-1">429 Rate Limit Exceeded</h3>
              <p className="text-xs text-gray-400">Too many requests</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-1">500 Server Error</h3>
              <p className="text-xs text-gray-400">Internal server error</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Header } from "@/components/header";

export default function ErrorsPage() {
  return (
    <div>
      <Header title="Error" />

      <div className="p-4 md:p-6">
        <div className="mb-6 rounded-xl bg-gray-800/50 p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium">Error:</h2>
            <span className="rounded bg-gray-700 px-2 py-1 text-xs">Usage</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-gray-800 p-3 md:p-4">
              <h3 className="mb-1 text-xs font-medium md:text-sm">
                400 Bad Request
              </h3>
              <p className="text-xs text-gray-400">
                Invalid or missing parameters
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-3 md:p-4">
              <h3 className="mb-1 text-xs font-medium md:text-sm">
                401 Unauthorized
              </h3>
              <p className="text-xs text-gray-400">
                Invalid or missing API key
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-3 md:p-4">
              <h3 className="mb-1 text-xs font-medium md:text-sm">
                429 Rate Limit Exceeded
              </h3>
              <p className="text-xs text-gray-400">Too many requests</p>
            </div>
            <div className="rounded-lg bg-gray-800 p-3 md:p-4">
              <h3 className="mb-1 text-xs font-medium md:text-sm">
                500 Server Error
              </h3>
              <p className="text-xs text-gray-400">Internal server error</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

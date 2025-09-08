import { Header } from "@/components/header";

export default function ErrorsPage() {
  return (
    <div>
      <Header title="Error" />

      <div className="p-3 sm:p-4 md:p-6">
        <div
          className="mb-6 rounded-xl py-4 md:py-6 border border-[#7D78FF42]"
          style={{
            background:
              "linear-gradient(96.75deg, rgba(125, 120, 255, 0.1) -0.65%, rgba(210, 0, 253, 0.1) 96.85%)",
          }}
        >
          <div className="mb-4 flex items-center justify-between border-b border-white/20 pb-8 px-4">
            <h2 className="text-sm font-medium">Error:</h2>
            <span className="rounded bg-gray-700 px-2 py-1 text-xs">Usage</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border-r border-white/20 p-3 md:p-4">
              <h3 className="mb-1 text-xs font-medium md:text-sm">
                400 Bad Request
              </h3>
              <p className="text-xs text-gray-400">
                Invalid or missing parameters
              </p>
            </div>
            <div className="rounded-lg border-r border-white/20 p-3 md:p-4">
              <h3 className="mb-1 text-xs font-medium md:text-sm">
                401 Unauthorized
              </h3>
              <p className="text-xs text-gray-400">
                Invalid or missing API key
              </p>
            </div>
            <div className="rounded-lg border-r border-white/20 p-3 md:p-4">
              <h3 className="mb-1 text-xs font-medium md:text-sm">
                429 Rate Limit Exceeded
              </h3>
              <p className="text-xs text-gray-400">Too many requests</p>
            </div>
            <div className="rounded-lg border-r border-white/20 p-3 md:p-4">
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

import { Header } from "@/components/header";

export default function RateLimitPage() {
  return (
    <div>
      <Header title="API Rate Limits" />

      <div className="p-6">
        <div className="max-w-3xl">
          <h2 className="mb-4 text-xl font-bold">Understanding Rate Limits</h2>
          <p className="mb-6 text-gray-300">
            To ensure fair usage and system stability, our API implements rate
            limiting. This page explains the rate limits and how to handle rate
            limit errors.
          </p>

          <div className="mb-6 rounded-xl bg-gray-800/50 p-6">
            <h3 className="mb-4 text-lg font-medium">Current Rate Limits</h3>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-gray-800 p-4 text-center">
                <p className="text-2xl font-bold">10</p>
                <p className="text-sm text-gray-400">requests/second</p>
              </div>
              <div className="rounded-lg bg-gray-800 p-4 text-center">
                <p className="text-2xl font-bold">1,000</p>
                <p className="text-sm text-gray-400">requests/day</p>
              </div>
            </div>

            <p className="text-sm text-gray-400">
              These limits apply per API key. If you need higher limits, please
              contact our support team.
            </p>
          </div>

          <div className="mb-6 rounded-xl bg-gray-800/50 p-6">
            <h3 className="mb-4 text-lg font-medium">Rate Limit Headers</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700 text-left">
                    <th className="pb-2 font-medium">Header</th>
                    <th className="pb-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-3 font-mono">X-RateLimit-Limit</td>
                    <td className="py-3">
                      The maximum number of requests allowed in the current
                      period
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-3 font-mono">X-RateLimit-Remaining</td>
                    <td className="py-3">
                      The number of requests remaining in the current period
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-mono">X-RateLimit-Reset</td>
                    <td className="py-3">
                      The time at which the current rate limit window resets in
                      UTC epoch seconds
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl bg-gray-800/50 p-6">
            <h3 className="mb-4 text-lg font-medium">
              Handling Rate Limit Errors
            </h3>

            <p className="mb-4 text-gray-300">
              When you exceed the rate limit, the API will return a 429 Too Many
              Requests response with the following JSON:
            </p>

            <div className="mb-4 rounded-lg bg-gray-900 p-4 font-mono text-sm">
              {`{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Please try again later.",
    "retry_after": 30
  }
}`}
            </div>

            <p className="text-sm text-gray-400">
              The <span className="font-mono">retry_after</span> field indicates
              the number of seconds to wait before making another request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

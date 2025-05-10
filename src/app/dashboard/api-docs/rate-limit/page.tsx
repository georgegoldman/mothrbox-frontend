import { Header } from "@/components/header";

export default function RateLimitPage() {
  return (
    <div>
      <Header title="API Rate Limits" />

      <div className="p-3 sm:p-4 md:p-6">
        <div className="max-w-3xl">
          <h2 className="mb-4 text-lg font-bold md:text-xl">
            Understanding Rate Limits
          </h2>
          <p className="mb-6 text-sm text-gray-300 md:text-base">
            To ensure fair usage and system stability, our API implements rate
            limiting. This page explains the rate limits and how to handle rate
            limit errors.
          </p>

          <div className="mb-6 rounded-xl bg-gray-800/50 p-4 md:p-6">
            <h3 className="mb-4 text-base font-medium md:text-lg">
              Current Rate Limits
            </h3>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-800 p-4 text-center">
                <p className="text-xl font-bold md:text-2xl">10</p>
                <p className="text-xs text-gray-400 md:text-sm">
                  requests/second
                </p>
              </div>
              <div className="rounded-lg bg-gray-800 p-4 text-center">
                <p className="text-xl font-bold md:text-2xl">1,000</p>
                <p className="text-xs text-gray-400 md:text-sm">requests/day</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 md:text-sm">
              These limits apply per API key. If you need higher limits, please
              contact our support team.
            </p>
          </div>

          <div className="mb-6 rounded-xl bg-gray-800/50 p-4 md:p-6">
            <h3 className="mb-4 text-base font-medium md:text-lg">
              Rate Limit Headers
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
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

          <div className="rounded-xl bg-gray-800/50 p-4 md:p-6">
            <h3 className="mb-4 text-base font-medium md:text-lg">
              Handling Rate Limit Errors
            </h3>

            <p className="mb-4 text-sm text-gray-300">
              When you exceed the rate limit, the API will return a 429 Too Many
              Requests response with the following JSON:
            </p>

            <div className="mb-4 overflow-x-auto rounded-lg bg-gray-900 p-3 font-mono text-xs md:p-4 md:text-sm">
              {`{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Please try again later.",
    "retry_after": 30
  }
}`}
            </div>

            <p className="text-xs text-gray-400 md:text-sm">
              The <span className="font-mono">retry_after</span> field indicates
              the number of seconds to wait before making another request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

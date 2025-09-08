import { Header } from "@/components/header";

export default function RateLimitPage() {
  return (
    <div>
      <Header title="API Rate Limits" />

      <div className="p-3 sm:p-4 md:p-6">
        <div className="mb-6 md:mb-8">
          <h2 className="mb-3 text-base font-bold md:mb-4 md:text-lg">
            Daily Limit:
          </h2>
          <p className="mb-2 text-xs">100 request per day</p>
        </div>

        <div className="mb-6 md:mb-8">
          <h2 className="mb-3 text-base font-bold md:mb-4 md:text-lg">
            Per Seconds Limit:
          </h2>
          {/* <div className=""> */}
          <p className="font-mono text-xs">10 request per seconds</p>
          {/* </div> */}
        </div>

        <div className="mb-6 md:mb-8">
          <h2 className="mb-3 text-base font-bold md:mb-4 md:text-lg">
            What happens if exceeded
          </h2>
          <p className="text-xs">
            If you exceed this limits, you’ll receive a 429 too many request
            error
          </p>
        </div>

        <div className="mb-6 md:mb-8">
          <h2 className="mb-3 text-base font-bold md:mb-4 md:text-lg">
            Upgrade Option:
          </h2>
          <p className="text-xs">
            Need more? contact support@cryptix.com to increase your limits
          </p>
        </div>
      </div>
    </div>
  );
}

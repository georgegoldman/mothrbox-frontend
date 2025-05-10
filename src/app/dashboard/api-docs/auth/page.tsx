import { Header } from "@/components/header";

export default function AuthenticationPage() {
  return (
    <div>
      <Header title="API Authentication" />

      <div className="p-3 sm:p-4 md:p-6">
        <div className="mb-6 md:mb-8">
          <h2 className="mb-3 text-base font-medium md:mb-4 md:text-lg">
            How To Authenticate
          </h2>
          <p className="mb-2 text-xs text-gray-300 md:text-sm">
            Include your API Key in the authorization header as follows:
          </p>
        </div>

        <div className="mb-6 md:mb-8">
          <h2 className="mb-3 text-base font-medium md:mb-4 md:text-lg">
            Example
          </h2>
          <div className="rounded-lg bg-gray-800/50 p-3 md:p-4">
            <p className="font-mono text-xs md:text-sm">
              Authorization: Bearer sk_live_xxxxxxx
            </p>
          </div>
        </div>

        <div className="mb-6 md:mb-8">
          <h2 className="mb-3 text-base font-medium md:mb-4 md:text-lg">
            Where To Find It
          </h2>
          <p className="text-xs text-gray-300 md:text-sm">
            Your API Key is Available in the Developer Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}

import { Header } from "@/components/header";

export default function AuthenticationPage() {
  return (
    <div>
      <Header title="API Authentication" />

      <div className="p-3 sm:p-4 md:p-6">
        <div className="mb-6 md:mb-8">
          <h2 className="mb-3 text-base font-bold md:mb-4 md:text-lg">
            How To Authenticate
          </h2>
          <p className="mb-2 text-xs">
            Include your API Key in the authorization header as follows:
          </p>
        </div>

        <div className="mb-6 md:mb-8">
          <h2 className="mb-3 text-base font-bold md:mb-4 md:text-lg">
            Example
          </h2>
          {/* <div className=""> */}
            <p className="font-mono text-xs">
              Authorization: Bearer sk_live_xxxxxxx
            </p>
          {/* </div> */}
        </div>

        <div className="mb-6 md:mb-8">
          <h2 className="mb-3 text-base font-bold md:mb-4 md:text-lg">
            Where To Find It
          </h2>
          <p className="text-xs">
            Your API Key is Available in the Developer Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}

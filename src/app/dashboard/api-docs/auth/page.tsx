import { Header } from "@/components/header"

export default function AuthenticationPage() {
  return (
    <div>
      <Header title="API Authentication" />

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">How To Authenticate</h2>
          <p className="text-sm text-gray-300 mb-2">Include your API Key in the authorization header as follows:</p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Example</h2>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm font-mono">Authorization: Bearer sk_live_xxxxxxx</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Where To Find It</h2>
          <p className="text-sm text-gray-300">Your API Key is Available in the Developer Dashboard</p>
        </div>
      </div>
    </div>
  )
}

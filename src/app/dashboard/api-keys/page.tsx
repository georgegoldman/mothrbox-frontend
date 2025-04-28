import { Header } from "@/components/header"
import { Copy, Plus, Trash } from "lucide-react"

export default function ApiKeysPage() {
  return (
    <div>
      <Header title="Key ID:" subtitle="sk_live_abc123" />

      <div className="p-6">
        <div className="bg-purple-600/20 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-2">Quick Copy</h2>
          <p className="text-sm text-gray-300 mb-4">
            Choose your frame work and paste the code into your environment file.
          </p>

          <div className="flex items-center gap-2 bg-purple-600/30 rounded-lg px-4 py-2 mb-4">
            <span className="text-sm">env_local</span>
            <button className="ml-auto p-1 rounded hover:bg-purple-600/50">
              <Copy className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">1.</span>
              <span className="text-gray-300 truncate">
                env_local yhfdvbjdalihgda5678484bbvuyy-377hjeybj5hkghjwurskidmdhf
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">2.</span>
              <span className="text-gray-300 truncate">
                env_local yhfdvbjdalihgda5678484bbvuyy-................................
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-400">*These are the same public and secrete keys as you see below</p>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-2">Publishable Key</h2>
          <p className="text-sm text-gray-400 mb-4">
            This key should be used in frontend code. It can be safely shared and does not need to be kept secrete.
          </p>

          <div className="flex items-center gap-2 bg-purple-600 rounded-lg px-4 py-3 mb-2">
            <span className="text-sm font-medium">Public Key</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm">env_local/jdfjfue755ejdghhijfvhsdyyudhj.34</span>
              <button className="p-1 rounded hover:bg-purple-700">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-2">Secrete Key</h2>
          <p className="text-sm text-gray-400 mb-4">
            Securely manage this sensitive keys. Do not share them with anyone, if you suspect that one of your secret
            keys has been compromised. You should create a new key, update your code, then delete the compromised key.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-2 bg-purple-600 rounded-lg px-4 py-3">
              <span className="text-sm font-medium">Default Key</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm">env_local/jdfjfue755ejdghhijfvhsdyyudhj.34</span>
                <button className="p-1 rounded hover:bg-purple-700">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-purple-600 rounded-lg px-4 py-3">
              <span className="text-sm font-medium">Test</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm">env_local/jdfjfue755ejdghhijfvhsdyyudhj.34</span>
                <button className="p-1 rounded hover:bg-purple-700">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-purple-600 rounded-lg px-4 py-3">
              <span className="text-sm font-medium">Testing Token</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm">env_local/jdfjfue755ejdghhijfvhsdyyudhj.34</span>
                <button className="p-1 rounded hover:bg-purple-700">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="p-1 rounded hover:bg-purple-700">
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <button className="mt-4 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition">
            <Plus className="h-4 w-4" />
            Add new key
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          <p>Our support will never ask you to share your secret keys.</p>
        </div>
      </div>
    </div>
  )
}

import { Header } from "@/components/header";
import { Copy, Plus, Trash } from "lucide-react";

export default function ApiKeysPage() {
  return (
    <div>
      <Header title="Key ID:" subtitle="sk_live_abc123" />

      <div className="p-3 sm:p-4 md:p-6">
        <div className="mb-6 rounded-xl bg-purple-600/20 p-4 md:p-6">
          <h2 className="mb-2 text-base font-bold md:text-lg">Quick Copy</h2>
          <p className="mb-4 text-xs text-gray-300 md:text-sm">
            Choose your frame work and paste the code into your environment
            file.
          </p>

          <div className="mb-4 flex items-center gap-2 rounded-lg bg-purple-600/30 px-3 py-2 md:px-4">
            <span className="text-xs md:text-sm">env_local</span>
            <button className="ml-auto rounded p-1 hover:bg-purple-600/50">
              <Copy className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="text-gray-400">1.</span>
              <span className="truncate text-gray-300">
                env_local
                yhfdvbjdalihgda5678484bbvuyy-377hjeybj5hkghjwurskidmdhf
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="text-gray-400">2.</span>
              <span className="truncate text-gray-300">
                env_local
                yhfdvbjdalihgda5678484bbvuyy-................................
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            *These are the same public and secrete keys as you see below
          </p>
        </div>

        <div className="mb-6 rounded-xl bg-gray-800/50 p-4 md:p-6">
          <h2 className="mb-2 text-base font-bold md:text-lg">
            Publishable Key
          </h2>
          <p className="mb-4 text-xs text-gray-400 md:text-sm">
            This key should be used in frontend code. It can be safely shared
            and does not need to be kept secrete.
          </p>

          <div className="mb-2 flex flex-col gap-2 rounded-lg bg-purple-600 px-3 py-2 sm:flex-row sm:items-center md:px-4">
            <span className="text-xs font-medium md:text-sm">Public Key</span>
            <div className="flex items-center gap-2 sm:ml-auto">
              <span className="max-w-[200px] truncate text-xs md:max-w-none md:text-sm">
                env_local/jdfjfue755ejdghhijfvhsdyyudhj.34
              </span>
              <button className="rounded p-1 hover:bg-purple-700">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-gray-800/50 p-4 md:p-6">
          <h2 className="mb-2 text-base font-bold md:text-lg">Secrete Key</h2>
          <p className="mb-4 text-xs text-gray-400 md:text-sm">
            Securely manage this sensitive keys. Do not share them with anyone,
            if you suspect that one of your secret keys has been compromised.
            You should create a new key, update your code, then delete the
            compromised key.
          </p>

          <div className="space-y-3">
            <div className="flex flex-col gap-2 rounded-lg bg-purple-600 px-3 py-2 sm:flex-row sm:items-center md:px-4">
              <span className="text-xs font-medium md:text-sm">
                Default Key
              </span>
              <div className="flex items-center gap-2 sm:ml-auto">
                <span className="max-w-[200px] truncate text-xs md:max-w-none md:text-sm">
                  env_local/jdfjfue755ejdghhijfvhsdyyudhj.34
                </span>
                <button className="rounded p-1 hover:bg-purple-700">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-lg bg-purple-600 px-3 py-2 sm:flex-row sm:items-center md:px-4">
              <span className="text-xs font-medium md:text-sm">Test</span>
              <div className="flex items-center gap-2 sm:ml-auto">
                <span className="max-w-[200px] truncate text-xs md:max-w-none md:text-sm">
                  env_local/jdfjfue755ejdghhijfvhsdyyudhj.34
                </span>
                <button className="rounded p-1 hover:bg-purple-700">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-lg bg-purple-600 px-3 py-2 sm:flex-row sm:items-center md:px-4">
              <span className="text-xs font-medium md:text-sm">
                Testing Token
              </span>
              <div className="flex items-center gap-2 sm:ml-auto">
                <span className="max-w-[200px] truncate text-xs md:max-w-none md:text-sm">
                  env_local/jdfjfue755ejdghhijfvhsdyyudhj.34
                </span>
                <button className="rounded p-1 hover:bg-purple-700">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="rounded p-1 hover:bg-purple-700">
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <button className="mt-4 flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-medium transition hover:bg-purple-700 md:px-4 md:py-2 md:text-sm">
            <Plus className="h-4 w-4" />
            Add new key
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 md:text-sm">
          <span className="h-2 w-2 rounded-full bg-gray-400"></span>
          <p>Our support will never ask you to share your secret keys.</p>
        </div>
      </div>
    </div>
  );
}

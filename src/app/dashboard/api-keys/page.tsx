import { Header } from "@/components/header";
import {
  Copy,
  Plus,
  Trash,
  Paperclip,
  Key,
  Settings,
  Calendar,
} from "lucide-react";

export default function ApiKeysPage() {
  return (
    <div>
      <Header title="Key ID:" subtitle="sk_live_abc123" />

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full p-3 sm:p-4 md:p-6 lg:w-[60%]">
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
              Securely manage this sensitive keys. Do not share them with
              anyone, if you suspect that one of your secret keys has been
              compromised. You should create a new key, update your code, then
              delete the compromised key.
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

        {/* Webhook URL Component */}
        <div className="flex w-full flex-col gap-4 lg:w-[40%]">
          <div className="p-3 sm:p-4 md:p-6">
            {/* Webhook URL Component */}
            <div className="rounded-lg border border-[#7D78FF] bg-black p-3 sm:p-4 md:p-6">
              <h3 className="mb-3 text-sm font-medium text-white sm:mb-4 sm:text-base md:text-lg">
                Add your webhook URL here
              </h3>

              <div className="mb-3 sm:mb-4">
                <input
                  type="url"
                  placeholder="e.g. https://yourapp.com/webhook"
                  className="w-full rounded-lg border border-[#7D78FF] bg-black px-2 py-2 text-xs text-white placeholder-gray-400 focus:border-[#7D78FF] focus:ring-1 focus:ring-[#7D78FF] focus:outline-none sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 md:text-base"
                />
              </div>

              <button className="w-full rounded-lg bg-[#7D78FF] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#6B66E5] sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4 md:text-base">
                Save Webhook
              </button>
            </div>
          </div>

          <div className="p-3 sm:p-4 md:p-6">
            {/* API Configuration Menu */}
            <div className="rounded-lg border border-[#7D78FF] bg-black p-3 sm:p-4 md:p-6">
              <div className="space-y-2 sm:space-y-3">
                {/* Show API URLs */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <Paperclip className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                  <span className="text-xs text-white sm:text-sm md:text-base">
                    Show API URLs
                  </span>
                </div>

                {/* Show JWT public Key */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <Key className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                  <span className="text-xs text-white sm:text-sm md:text-base">
                    Show JWT public Key
                  </span>
                </div>

                {/* Configure API version */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <Settings className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                  <span className="text-xs text-white sm:text-sm md:text-base">
                    Configure API version
                  </span>
                </div>

                {/* Configure API version 2025-03-23 */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <Calendar className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                  <span className="text-xs text-white sm:text-sm md:text-base">
                    Configure API version 2025-03-23
                  </span>
                </div>

                {/* Latest API version 2025-03-23 */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <Calendar className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                  <span className="text-xs text-white sm:text-sm md:text-base">
                    Latest API version 2025-03-23
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

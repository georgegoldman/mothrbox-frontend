import { Header } from "@/components/header";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ApiDocsPage() {
  return (
    <div>
      <Header title="API Documentation" />

      <div className="p-6">
        <div className="max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold">
            Getting Started with the API
          </h2>
          <p className="mb-6 text-gray-300">
            Our API provides secure encryption and decryption services for your
            applications. Use the navigation menu to explore different API
            endpoints and features.
          </p>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-gray-800 p-6">
              <h3 className="mb-2 text-lg font-medium">Authentication</h3>
              <p className="mb-4 text-gray-400">
                Learn how to authenticate your requests using API keys.
              </p>
              <Link
                href="/dashboard/api-docs/auth"
                className="flex items-center text-purple-400 hover:text-purple-300"
              >
                View Documentation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-xl bg-gray-800 p-6">
              <h3 className="mb-2 text-lg font-medium">Encryption</h3>
              <p className="mb-4 text-gray-400">
                Explore how to encrypt data using our API.
              </p>
              <Link
                href="/dashboard/api-docs/encrypt"
                className="flex items-center text-purple-400 hover:text-purple-300"
              >
                View Documentation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-xl bg-gray-800 p-6">
              <h3 className="mb-2 text-lg font-medium">Decryption</h3>
              <p className="mb-4 text-gray-400">
                Learn how to decrypt data using our API.
              </p>
              <Link
                href="/dashboard/api-docs/decrypt"
                className="flex items-center text-purple-400 hover:text-purple-300"
              >
                View Documentation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-xl bg-gray-800 p-6">
              <h3 className="mb-2 text-lg font-medium">Error Handling</h3>
              <p className="mb-4 text-gray-400">
                Understand common errors and how to handle them.
              </p>
              <Link
                href="/dashboard/api-docs/errors"
                className="flex items-center text-purple-400 hover:text-purple-300"
              >
                View Documentation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-xl bg-gray-800 p-6">
            <h3 className="mb-2 text-lg font-medium">Rate Limits</h3>
            <p className="mb-4 text-gray-400">
              Understand the rate limits for API requests and how to monitor
              your usage.
            </p>
            <Link
              href="/dashboard/api-docs/rate-limit"
              className="flex items-center text-purple-400 hover:text-purple-300"
            >
              View Documentation <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

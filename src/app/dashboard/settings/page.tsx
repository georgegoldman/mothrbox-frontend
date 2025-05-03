"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Pencil } from "lucide-react";
import { useUser } from "@/app/contexts/user-context";

export default function SettingsPage() {
  const [usageNotification, setUsageNotification] = useState(true);

  const { initials, user } = useUser();

  return (
    <div className="min-h-screen bg-black">
      <Header title="Settings" />

      <div className="p-6">
        {/* Profile Section */}
        <div className="mb-10">
          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8">
            {/* Profile Image */}
            <div className="relative mb-6 md:mb-0">
              <div className="relative flex size-[128px] items-center justify-center overflow-hidden rounded-full border bg-teal-700 text-6xl font-bold text-white">
                {initials}
              </div>
              <button
                className="absolute right-0 bottom-0 rounded-full bg-purple-600 p-2 text-white shadow-lg hover:bg-purple-700"
                aria-label="Edit profile picture"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left">
              <h2 className="mb-1 text-2xl font-bold text-white">
                {user?.username}
              </h2>
              <p className="mb-4 text-gray-400">{user?.email}</p>

              <button className="inline-flex items-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-purple-400 ring-1 ring-purple-500 hover:bg-purple-900/30">
                Reset Password
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-medium text-white">Notifications</h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={usageNotification}
                  onChange={() => setUsageNotification(!usageNotification)}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-700 peer-checked:bg-purple-600 peer-focus:ring-2 peer-focus:ring-purple-400 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
                <span className="ml-3 text-sm text-gray-300">
                  Email me when my usage exceeds 80% of quota
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button className="w-full rounded-md bg-purple-600 py-3 text-center font-medium text-white hover:bg-purple-700 md:max-w-md">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

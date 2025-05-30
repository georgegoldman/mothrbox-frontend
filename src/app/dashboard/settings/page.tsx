"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { useUser } from "@/app/contexts/user-context";
import { deleteAccount } from "@/app/actions/auth";
import { Modal } from "@/components/modal";
import { getCookieValue } from "@/lib/helpers";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function SettingsPage() {
  const [usageNotification, setUsageNotification] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { initials, user } = useUser();

  const handleDeleteAccount = async () => {
    if (!user?._id) return;

    const accessToken = getCookieValue("accessToken");
    if (!accessToken) return;

    if (confirmationText.trim().toLowerCase() !== "delete my account") {
      setError(true);
      return;
    }

    setLoading(true);

    try {
      toast.promise(
        deleteAccount({ accessToken }).then(() => {
          // Clear cookies
          document.cookie = "accessToken=; Max-Age=0; path=/;";
          document.cookie = "userId=; Max-Age=0; path=/;";

          // Remove from localStorage
          localStorage.removeItem("user");

          // Close modal + reset UI
          setIsModalOpen(false);
          setConfirmationText("");
          setError(false);

          // Redirect
          window.location.href = "/";

          return "Account successfully deleted";
        }),
        {
          loading: "Deleting your account...",
          success: (msg) => msg,
          error: (err: unknown) => {
            if (err && typeof err === "object" && "message" in err) {
              return (
                (err as { message?: string }).message ?? "Deletion failed!"
              );
            }
            return "Deletion failed!";
          },
        },
      );
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="Settings" />

      {/* Wrap the main content in a motion.div for a subtle entrance animation */}
      <div className="p-3 sm:p-4 md:p-6">
        {/* Profile Section */}
        <div className="mb-10">
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-8">
            {/* Profile Image */}
            <div className="relative md:mb-0">
              <div className="relative flex size-[128px] items-center justify-center overflow-hidden rounded-full border bg-teal-700 text-6xl font-bold text-white">
                {initials}
              </div>
              {/* <button
                className="absolute right-0 bottom-0 rounded-full bg-purple-600 p-2 text-white shadow-lg hover:bg-purple-700"
                aria-label="Edit profile picture"
              >
                <Pencil className="h-4 w-4" />
              </button> */}
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left">
              <h2 className="mb-1 text-2xl font-bold text-white">
                {user?.username}
              </h2>
              <p className="mb-4 text-gray-400">{user?.email}</p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/20"
              >
                Delete Account
              </button>

              {/* Delete Account Modal */}
              <Modal
                isOpen={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                  setConfirmationText("");
                  setError(false);
                }}
                title="Confirm Account Deletion"
                footer={
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setConfirmationText("");
                        setError(false);
                      }}
                      className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={loading}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                          </svg>
                          <span>Deleting...</span>
                        </div>
                      ) : (
                        "Delete Account"
                      )}
                    </button>
                  </div>
                }
              >
                <div className="space-y-4">
                  <p className="text-sm text-gray-300">
                    This action cannot be undone. Please type{" "}
                    <span className="font-medium text-red-400">
                      &quot;delete my account&quot;
                    </span>{" "}
                    to confirm.
                  </p>

                  <div>
                    <input
                      type="text"
                      className={`w-full rounded-lg border ${
                        error ? "border-red-500" : "border-gray-700"
                      } bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none`}
                      value={confirmationText}
                      onChange={(e) => {
                        setConfirmationText(e.target.value);
                        if (error) setError(false); // Reset error on change
                      }}
                      placeholder='Type "delete my account"'
                    />
                    {error && (
                      <p className="mt-2 text-xs text-red-400">
                        Please type the exact phrase to confirm deletion
                      </p>
                    )}
                  </div>
                </div>
              </Modal>
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
                <Switch className="data-[state=checked]:bg-purple-500 data-[state=unchecked]:bg-gray-500" />
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

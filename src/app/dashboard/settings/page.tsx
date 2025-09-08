"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { useUser } from "@/app/contexts/user-context";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Edit3 } from "lucide-react";
import EyeIcon from "public/images/eye-icon";
import Image from "next/image";

export default function SettingsPage() {
  const [usageNotification, setUsageNotification] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const { initials, user } = useUser();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        toast.success("Profile image updated successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    const fileInput = document.getElementById(
      "profile-image-upload",
    ) as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div>
      <Header title="Settings" />

      {/* Wrap the main content in a motion.div for a subtle entrance animation */}
      <div className="p-3 sm:p-4 md:p-6">
        {/* Profile Section */}
        <div className="mb-8">
          <div className="flex items-start gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-orange-500 text-2xl font-bold text-white sm:h-32 sm:w-32 sm:text-3xl">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  initials
                )}
              </div>
              <button
                onClick={handleEditClick}
                className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#7D78FF] text-white shadow-lg hover:bg-[#6B66E5] sm:h-10 sm:w-10"
                aria-label="Edit profile picture"
              >
                <Edit3 className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              {/* Hidden file input */}
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="mb-1 text-xl font-bold text-white sm:text-2xl">
                {user?.username ?? "Michael John"}
              </h2>
              <p className="text-sm text-white sm:text-base">
                {user?.email ?? "Michealjohn@gmail.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Reset Password Button */}
        <div className="mb-8">
          <button
            className="flex h-[20px] items-center justify-center gap-2 rounded-lg border border-[#7D78FFB2] px-6 py-2 text-sm font-medium text-[#7D78FF] transition hover:opacity-90 sm:px-8 sm:py-4 sm:text-base"
            style={{
              background:
                "linear-gradient(90deg, rgba(125, 120, 255, 0.1) 0%, rgba(210, 0, 253, 0.1) 100%)",
            }}
          >
            <EyeIcon />
            Reset Password
          </button>
        </div>

        {/* Email Notification Toggle */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={usageNotification}
                onChange={() => setUsageNotification(!usageNotification)}
              />
              <Switch className="data-[state=checked]:bg-[#7D78FF] data-[state=unchecked]:bg-gray-500" />
            </label>
            <span className="text-sm text-white sm:text-base">
              Email me when my usage exceeds 80% of quota
            </span>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button className="w-full rounded-lg bg-[#7D78FF] py-3 text-center font-medium text-white transition hover:bg-[#6B66E5] sm:py-4">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

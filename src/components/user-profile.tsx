"use client";

import React, { useEffect, useState } from "react";
import { getInitials } from "@/lib/helpers";
import { fetchUserProfile } from "@/app/actions/fetchUserProfile";

type UserDataResponse = {
  id: string;
  username: string;
  email: string;
  phone: string;
};

export default function UserProfile() {
  const [user, setUser] = useState<UserDataResponse | null>(null);

  useEffect(() => {
    fetchUserProfile()
      .then((fetchedUser) => {
        setUser(fetchedUser);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  const initials = getInitials(user?.username ?? "?");
  // const bgColor = getRandomBgColor();

  return (
    <div className="flex items-center gap-2">
      <div
        className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border bg-teal-700 font-bold text-white"
        // style={{ backgroundColor: bgColor }}
      >
        {initials}
      </div>
      <div className="hidden md:block">
        <p className="text-sm font-medium">{user?.username}</p>
        <p className="text-xs text-gray-400">{user?.email}</p>
      </div>
    </div>
  );
}

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { fetchUserProfile } from "@/app/actions/fetchUserProfile";
import { getInitials } from "@/lib/helpers";

type UserDataResponse = {
  _id: string;
  username: string;
  email: string;
  phone: string;
};

type UserContextType = {
  user: UserDataResponse | null;
  loading: boolean;
  error: string | null;
  initials: string;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initials = getInitials(user?.username ?? "?");

  useEffect(() => {
    fetchUserProfile()
      .then((fetchedUser) => {
        setUser(fetchedUser);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user");
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, initials }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier access
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

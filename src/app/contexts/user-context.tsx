"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDataResponse | null>(() => {
    // Load from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? (JSON.parse(storedUser) as UserDataResponse) : null;
  });
  const [loading, setLoading] = useState<boolean>(() => !user); // If user exists, no need to load
  const [error, setError] = useState<string | null>(null);

  const initials = getInitials(user?.username ?? "?");

  useEffect(() => {
    if (!user) {
      setLoading(true);
      fetchUserProfile()
        .then((fetchedUser) => {
          if (fetchedUser) {
            console.log("Fetched user:", fetchedUser);
            setUser(fetchedUser);
            localStorage.setItem("user", JSON.stringify(fetchedUser));
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user profile:", err);
          setError("Failed to load user");
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loading, error, initials }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

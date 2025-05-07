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
  const [user, setUser] = useState<UserDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const initials = getInitials(user?.username ?? "?");

  useEffect(() => {
    const loadUserFromLocalStorage = async () => {
      if (typeof window === "undefined") return;

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser) as UserDataResponse);
        setLoading(false);
      } else {
        try {
          const fetchedUser = await fetchUserProfile();
          if (fetchedUser) {
            setUser(fetchedUser);
            localStorage.setItem("user", JSON.stringify(fetchedUser));
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setError("Failed to load user");
        } finally {
          setLoading(false);
        }
      }
    };

    void loadUserFromLocalStorage();
  }, []);

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

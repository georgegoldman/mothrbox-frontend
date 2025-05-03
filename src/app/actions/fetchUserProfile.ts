"use server";

import { cookies } from "next/headers";
import { userProfile } from "./auth";

export async function fetchUserProfile() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;
  const userId = (await cookieStore).get("userId")?.value;

  if (!accessToken || !userId) {
    console.error("Missing token or user ID");
    return null;
  }

  try {
    // Correct parameter order: userProfile(userId, accessToken)
    const user = await userProfile(userId, accessToken);
    return user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

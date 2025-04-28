"use client"

import { usePathname } from "next/navigation"

export function useActivePath() {
  const pathname = usePathname()

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path
    }

    // Special case for dashboard root
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true
    }

    // For nested paths, ensure we don't match parent paths when on a child path
    if (path !== "/dashboard" && pathname.startsWith(path)) {
      // Get all path segments
      const pathnameSegments = pathname.split("/").filter(Boolean)
      const linkSegments = path.split("/").filter(Boolean)

      // If the link has fewer segments than the current path and all segments match,
      // then it's a parent path of the current path
      if (linkSegments.length < pathnameSegments.length) {
        for (let i = 0; i < linkSegments.length; i++) {
          if (linkSegments[i] !== pathnameSegments[i]) {
            return false
          }
        }
        return true
      }

      return pathname.startsWith(path)
    }

    return false
  }

  return { isActive, pathname }
}

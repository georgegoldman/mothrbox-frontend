"use client";

import { useState, useEffect } from "react";

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolled(window.scrollY > 50);
    };

    // this adds event listener for scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });

    // this calls the handler right away to update initial state
    handleScroll();

    // event listener on cleanup event
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollY, isScrolled };
}

"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Fade in animation
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  direction = null,
  distance = 50,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | null;
  distance?: number;
}) => {
  let initial: { opacity: number; x?: number; y?: number } = { opacity: 0 };

  // Add direction-based starting position if specified
  if (direction === "up") {
    initial = { ...initial, y: distance };
  } else if (direction === "down") {
    initial = { ...initial, y: -distance };
  } else if (direction === "left") {
    initial = { ...initial, x: distance };
  } else if (direction === "right") {
    initial = { ...initial, x: -distance };
  }

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation
export const StaggerContainer = ({
  children,
  delay = 0,
  staggerChildren = 0.1,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  staggerChildren?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Child item for staggered animations
export const StaggerItem = ({
  children,
  className = "",
  direction = null,
  distance = 50,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | null;
  distance?: number;
}) => {
  let hidden: { opacity: number; x?: number; y?: number } = { opacity: 0 };
  const visible = { opacity: 1, x: 0, y: 0 };

  // Add direction-based animations
  if (direction === "up") {
    hidden = { ...hidden, y: distance };
  } else if (direction === "down") {
    hidden = { ...hidden, y: -distance };
  } else if (direction === "left") {
    hidden = { ...hidden, x: distance };
  } else if (direction === "right") {
    hidden = { ...hidden, x: -distance };
  }

  return (
    <motion.div
      variants={{
        hidden,
        visible: {
          ...visible,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale animation on hover
export const ScaleOnHover = ({
  children,
  scale = 1.05,
  className = "",
}: {
  children: ReactNode;
  scale?: number;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scroll-triggered animation
export const ScrollReveal = ({
  children,
  threshold = 0.1,
  className = "",
  direction = "up",
  distance = 50,
}: {
  children: ReactNode;
  threshold?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}) => {
  let initial: { opacity: number; x?: number; y?: number } = { opacity: 0 };

  // Set direction-based starting position
  if (direction === "up") {
    initial = { ...initial, y: distance };
  } else if (direction === "down") {
    initial = { ...initial, y: -distance };
  } else if (direction === "left") {
    initial = { ...initial, x: distance };
  } else if (direction === "right") {
    initial = { ...initial, x: -distance };
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated button
export const AnimatedButton = ({
  children,
  className = "",
  onClick,
  type,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
};

// Animated counter
import { useEffect, useState } from "react";

export const AnimatedCounter = ({
  from = 0,
  to,
  duration = 2,
  className = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
}) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const start = from;
    const end = to;
    const range = end - start;
    const startTime = performance.now();
    let animationFrame: number;

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(start + range * progress));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      <span>{count}</span>
    </motion.span>
  );
};

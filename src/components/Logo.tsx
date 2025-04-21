'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Logo = ({ className = "" }: { className?: string }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Link href="/" className={`navbar-brand`}>
      <img
        src="/images/marine.png"
        alt="Logo"
        height="24"
        className="d-inline-block align-text-top"
      />      
      
    </Link>
  );
};

export default Logo;

"use client";

import React, { ReactNode, useEffect, useState } from "react";

/**
 * HydrationWrapper prevents hydration mismatches caused by browser extensions
 * that modify the DOM (like BitDefender, banking extensions, etc.)
 * 
 * This wrapper suppresses hydration warnings for its children after mount
 */
interface HydrationWrapperProps {
  children: ReactNode;
}

const HydrationWrapper: React.FC<HydrationWrapperProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
};

export default HydrationWrapper;

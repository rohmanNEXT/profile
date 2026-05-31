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
    // Remove browser extension attributes that cause hydration mismatches
    const removeExtensionAttributes = () => {
      const elements = document.querySelectorAll('[bis_skin_checked]');
      elements.forEach(el => {
        el.removeAttribute('bis_skin_checked');
      });
    };

    const timer = setTimeout(() => {
      setIsMounted(true);
      removeExtensionAttributes();
    }, 0);
    
    // Also run on interval to catch late injections
    const interval = setInterval(removeExtensionAttributes, 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
};

export default HydrationWrapper;

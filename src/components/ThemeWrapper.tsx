"use client";

import { useSettingsStore } from "@/store/settingsStore";
import { useEffect, useState } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useSettingsStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync theme to body class
  useEffect(() => {
    if (mounted) {
      if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#ffffff';
      } else {
        document.body.classList.remove('dark-theme');
        document.body.style.backgroundColor = '#f5f0e8';
        document.body.style.color = '#1a1a1a';
      }
    }
  }, [theme, mounted]);

  if (!mounted) return <>{children}</>;

  return <>{children}</>;
}

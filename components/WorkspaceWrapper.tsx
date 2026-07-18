"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function WorkspaceWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) {
    return <div className="bg-background min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background font-body flex flex-col w-full">
      <div className="flex-1 w-full relative">
        {children}
      </div>
    </div>
  );
}

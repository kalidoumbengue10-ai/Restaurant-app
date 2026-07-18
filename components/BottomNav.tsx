"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, ClipboardList, User } from "lucide-react";
import clsx from "clsx";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Accueil", href: "/", icon: Home },
    { name: "Explorer", href: "/explore", icon: Search },
    { name: "Favoris", href: "/favorites", icon: Heart },
    { name: "Commandes", href: "/orders", icon: ClipboardList },
    { name: "Compte", href: "/account", icon: User },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-surface-elevated border-t border-border pb-6 pt-2 px-6 flex justify-between items-center z-40 rounded-t-2xl shadow-[0_-8px_24px_rgba(64,38,20,0.08)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.name} href={item.href} className={clsx("flex flex-col items-center gap-1 p-2", isActive ? "text-primary" : "text-text-muted")}>
            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-semibold">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

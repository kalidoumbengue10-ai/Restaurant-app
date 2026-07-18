"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { Heart, Star, Bell, MapPin, Search, Utensils } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { SplashScreen } from "@/components/SplashScreen";
import { categories, suggestions } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredSuggestions = suggestions.filter((item) => {
    const matchesCategory = activeCategory === "Tout" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-28 relative overflow-x-hidden w-full h-full flex flex-col justify-between">
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      <div className="flex-1">
        {/* Header with Senegal location */}
        <header className="px-4 pt-8 pb-4 flex justify-between items-center bg-background z-10 sticky top-0 border-b border-border/20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <MapPin size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Livrer à</span>
              <span className="text-sm font-bold text-foreground">Dakar Plateau, Sénégal 🇸🇳</span>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-surface-elevated shadow-sm flex items-center justify-center border border-border text-foreground hover:text-primary transition-colors">
            <Bell size={20} />
          </button>
        </header>

        <main className="px-4 flex flex-col gap-6 mt-4">
          
          {/* Welcome Text */}
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground leading-tight">
              Bonjour, <span className="text-primary">Julie !</span>
            </h1>
            <p className="text-xs text-text-secondary mt-1">Prête pour le meilleur de la Teranga culinaire ?</p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher Thiéboudienne, Yassa, Pastels..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-surface-elevated text-sm font-medium text-foreground placeholder:font-normal placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
            />
          </div>

          {/* Promo Card - Dakar Style */}
          <div className="bg-secondary text-foreground rounded-2xl p-5 relative overflow-hidden flex items-center shadow-sm">
            <div className="z-10 w-3/5">
              <h2 className="text-4xl font-display font-extrabold tracking-tight mb-1">-40%</h2>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">Offre de bienvenue</p>
              <p className="text-sm font-bold mb-3">sur votre première commande locale !</p>
            </div>
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full overflow-hidden border-4 border-white/20">
               <Image src="https://picsum.photos/seed/promo-thieb/400/400" alt="Promo" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <h2 className="text-base font-bold font-display mb-3">Catégories gourmandes</h2>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-bold transition-colors shadow-sm ${
                    activeCategory === cat
                      ? "bg-primary text-white"
                      : "bg-surface-elevated text-foreground border border-border hover:bg-surface-subtle"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Suggestions - Dakar Food Grid */}
          <div className="pb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold font-display">Nos suggestions</h2>
              <span className="text-xs font-bold text-text-muted">{filteredSuggestions.length} plats trouvés</span>
            </div>

            {filteredSuggestions.length === 0 ? (
              <div className="text-center py-8 bg-surface-elevated rounded-2xl border border-border">
                <Utensils className="mx-auto text-text-muted mb-2 animate-pulse" size={32} />
                <p className="text-xs font-bold text-text-muted">Aucun plat ne correspond à votre recherche.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {filteredSuggestions.map((item) => (
                  <Link href={`/product/${item.id}`} key={item.id} className="bg-surface-elevated rounded-[18px] p-3 shadow-sm border border-border flex flex-col justify-between gap-3 relative hover:scale-[1.01] transition-transform">
                    <button className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-primary transition-colors shadow-sm">
                      <Heart size={16} />
                    </button>
                    <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-surface-strong">
                      <Image src={item.image} alt={item.name} fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[14px] text-foreground leading-snug mb-1 line-clamp-2 min-h-[40px]">{item.name}</h3>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/30">
                        <span className="font-bold text-xs text-primary">{formatPrice(item.price)} FCFA</span>
                        <div className="flex items-center gap-1 text-secondary">
                          <Star size={12} fill="currentColor" />
                          <span className="text-[11px] font-bold text-foreground">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, Heart, Star, Check, X, ArrowLeft } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { suggestions } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function Explore() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filters state
  const [selectedCuisine, setSelectedCuisine] = useState<string>("Sénégalais");
  const [selectedRating, setSelectedRating] = useState<number>(4.5);
  const [selectedBudget, setSelectedBudget] = useState<string>("all");

  // Filtering logic
  const filteredProducts = suggestions.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCuisine = !selectedCuisine || product.category === selectedCuisine;
    const matchesRating = product.rating >= selectedRating;
    
    let matchesBudget = true;
    if (selectedBudget === "low") matchesBudget = product.price < 2000;
    else if (selectedBudget === "mid") matchesBudget = product.price >= 2000 && product.price <= 4000;
    else if (selectedBudget === "high") matchesBudget = product.price > 4000;

    return matchesSearch && matchesCuisine && matchesRating && matchesBudget;
  });

  return (
    <div className="min-h-screen bg-background relative pb-28">
      
      {/* Header with Search and Filter Icon */}
      <header className="px-4 pt-12 pb-4 bg-background sticky top-0 z-10 border-b border-border/10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/')} className="w-8 h-8 flex items-center justify-center text-foreground -ml-1 hover:text-primary transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold font-display text-foreground">Explorer la carte</h1>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher des délices..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-border bg-surface-elevated text-xs font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:font-normal"
            />
          </div>
          <button 
            onClick={() => setShowFilters(true)}
            className={`w-11 h-11 rounded-xl border border-border bg-surface-elevated flex items-center justify-center text-foreground hover:text-primary transition-all shadow-sm ${
              showFilters ? "border-primary bg-primary-soft text-primary" : ""
            }`}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="px-4 py-4">
        
        {/* Results Info */}
        <div className="flex justify-between items-center mb-4 px-1">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
            {selectedCuisine ? `${selectedCuisine}` : "Tous les plats"} • {filteredProducts.length} trouvés
          </span>
          {(selectedCuisine || selectedRating > 0 || selectedBudget !== "all") && (
            <button 
              onClick={() => { setSelectedCuisine(""); setSelectedRating(0); setSelectedBudget("all"); }}
              className="text-[10px] font-bold text-primary hover:underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-surface-elevated rounded-2xl border border-border">
            <SlidersHorizontal className="mx-auto text-text-muted mb-3 animate-pulse" size={32} />
            <p className="text-xs font-bold text-text-muted">Aucun plat ne correspond à vos filtres.</p>
            <button 
              onClick={() => { setSelectedCuisine(""); setSelectedRating(0); setSelectedBudget("all"); setSearchQuery(""); }}
              className="mt-3 bg-primary text-white text-[10px] font-bold px-4 py-2 rounded-xl shadow-sm"
            >
              Effacer tout
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((item) => (
              <Link href={`/product/${item.id}`} key={item.id} className="bg-surface-elevated rounded-[18px] p-3 shadow-sm border border-border flex flex-col justify-between gap-3 relative hover:scale-[1.01] transition-transform">
                <button className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-primary transition-colors shadow-sm">
                  <Heart size={16} />
                </button>
                <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-surface-strong">
                  <Image src={item.image} alt={item.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-foreground leading-snug mb-1 line-clamp-2 min-h-[34px]">{item.name}</h3>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/30">
                    <span className="font-bold text-xs text-primary">{formatPrice(item.price)} FCFA</span>
                    <div className="flex items-center gap-1 text-secondary">
                      <Star size={11} fill="currentColor" />
                      <span className="text-[10px] font-bold text-foreground">{item.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </main>

      {/* Slide-Up Interactive Filters Drawer (Matches photo reference perfectly) */}
      {showFilters && (
        <div className="absolute inset-0 bg-[#201C19]/60 backdrop-blur-sm z-50 flex items-end">
          <div className="bg-background rounded-t-[32px] w-full p-6 pb-8 shadow-[0_-8px_24px_rgba(64,38,20,0.15)] relative border-t border-border animate-slide-up">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold font-display text-foreground">Filtres de recherche</h2>
              <button 
                onClick={() => setShowFilters(false)}
                className="w-8 h-8 rounded-full bg-surface-elevated border border-border flex items-center justify-center text-text-muted hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Filter 1: Cuisines */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Catégories de Cuisine</h3>
              <div className="flex flex-wrap gap-2">
                {["Sénégalais", "Grillades", "Jus & Boissons", "Pastries"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCuisine(cat === selectedCuisine ? "" : cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedCuisine === cat 
                        ? "bg-primary text-white border-primary shadow-sm" 
                        : "bg-surface-elevated border-border text-foreground hover:bg-surface-subtle"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Budget FCFA */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Budget (FCFA)</h3>
              <div className="flex flex-col gap-2">
                {[
                  { id: "all", label: "Tous les prix" },
                  { id: "low", label: "Moins de 2 000 FCFA (Économique)" },
                  { id: "mid", label: "2 000 FCFA - 4 000 FCFA (Standard)" },
                  { id: "high", label: "Plus de 4 000 FCFA (Plats à partager / Grillades)" }
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBudget(b.id)}
                    className={`text-left p-3 rounded-xl text-xs font-semibold border transition-all flex justify-between items-center ${
                      selectedBudget === b.id 
                        ? "border-primary bg-primary-soft/30 text-foreground" 
                        : "border-border bg-surface-elevated hover:bg-surface-subtle"
                    }`}
                  >
                    <span>{b.label}</span>
                    {selectedBudget === b.id && <Check size={14} className="text-primary" strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 3: Notes & Étoiles */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Note minimale</h3>
              <div className="flex gap-2">
                {[0, 4.0, 4.5, 4.8].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setSelectedRating(rate)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 ${
                      selectedRating === rate 
                        ? "bg-primary text-white border-primary shadow-sm" 
                        : "bg-surface-elevated border-border text-foreground hover:bg-surface-subtle"
                    }`}
                  >
                    <Star size={12} fill={rate > 0 ? "currentColor" : "none"} className={rate > 0 && selectedRating === rate ? "text-white" : "text-secondary"} />
                    <span>{rate === 0 ? "Toutes" : `${rate}+`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <button 
              onClick={() => setShowFilters(false)}
              className="w-full bg-primary hover:bg-primary-hover text-white rounded-[14px] py-4 font-bold text-sm shadow-md transition-all active:scale-[0.98]"
            >
              Voir les {filteredProducts.length} résultats
            </button>

          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

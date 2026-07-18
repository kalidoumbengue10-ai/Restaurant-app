"use client";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Heart, Minus, Plus, Star, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { suggestions, Product } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;
  
  const product = suggestions.find(s => s.id === productId) || suggestions[0];
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleOption = (optName: string) => {
    setSelectedOptions(prev => 
      prev.includes(optName) 
        ? prev.filter(o => o !== optName) 
        : [...prev, optName]
    );
  };

  // Calculate dynamic price
  const basePrice = product.price;
  const optionsPrice = product.options
    .filter(o => selectedOptions.includes(o.name))
    .reduce((acc, o) => acc + o.price, 0);
  const totalPrice = (basePrice + optionsPrice) * quantity;

  return (
    <div className="min-h-screen bg-background relative pb-32">
      {/* Top image and header */}
      <div className="relative h-72 w-full bg-surface-strong rounded-b-[32px] overflow-hidden shadow-sm">
        <Image src={product.image} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" />
        <div className="absolute top-0 w-full pt-12 px-4 flex justify-between items-center z-10">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-colors"
          >
            <Heart size={20} className={isFavorite ? "text-primary fill-primary" : "text-foreground"} />
          </button>
        </div>
      </div>

      <div className="px-5 pt-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-primary-soft text-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-secondary">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold text-foreground">{product.rating}</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold font-display text-foreground leading-tight mb-2">{product.name}</h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">{product.description}</p>
        
        <div className="text-3xl font-display font-extrabold text-primary mb-6">
          {formatPrice(product.price)} FCFA
        </div>

        <div className="h-px w-full bg-border mb-6"></div>

        {/* Dynamic options selector */}
        {product.options && product.options.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold font-display text-base mb-3">Options disponibles (Teranga)</h3>
            <div className="flex flex-col gap-3">
              {product.options.map((opt) => {
                const isSelected = selectedOptions.includes(opt.name);
                return (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => toggleOption(opt.name)}
                    className={`flex items-center justify-between p-4 border rounded-xl text-sm font-semibold transition-all shadow-sm ${
                      isSelected 
                        ? "border-primary bg-primary-soft/40 text-foreground" 
                        : "border-border bg-surface-elevated hover:bg-surface-subtle"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isSelected ? "bg-primary border-primary text-white" : "border-border"
                      }`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span>{opt.name}</span>
                    </div>
                    {opt.price > 0 && (
                      <span className="text-primary text-xs font-bold font-mono">+{formatPrice(opt.price)} FCFA</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <h3 className="font-bold font-display text-base mb-3">Quantité</h3>
        <div className="flex items-center gap-4 bg-surface-elevated border border-border rounded-[14px] w-fit p-1 shadow-sm">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-foreground transition-colors"
          >
            <Minus size={18} />
          </button>
          <span className="w-8 text-center font-bold text-lg font-mono">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-foreground transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-surface-elevated border-t border-border p-4 pb-8 z-40 rounded-t-2xl shadow-[0_-8px_24px_rgba(64,38,20,0.08)] flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Prix Total</span>
          <span className="text-lg font-display font-extrabold text-foreground">{formatPrice(totalPrice)} FCFA</span>
        </div>
        <button 
          onClick={() => router.push('/cart')}
          className="flex-1 bg-primary hover:bg-primary-hover text-white rounded-[14px] py-4 font-bold text-sm shadow-lg transition-transform active:scale-[0.98] text-center"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

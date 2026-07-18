"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Trash2, Minus, Plus, Landmark, MapPin, Check } from "lucide-react";
import { useState } from "react";
import { cartItems } from "@/lib/data";
import { motion, AnimatePresence } from "motion/react";
import { formatPrice } from "@/lib/utils";

export default function Cart() {
  const router = useRouter();
  const [items, setItems] = useState(cartItems);
  const [selectedAddress, setSelectedAddress] = useState("Mermoz Extension, Dakar");
  const [paymentMethod, setPaymentMethod] = useState<"Wave" | "Orange Money" | "Espèces">("Wave");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const adjustQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 1000 : 0; // 1000 FCFA Dakar Delivery
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate transaction
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const confirmAndTrack = () => {
    setShowSuccessModal(false);
    router.push('/orders/tracking');
  };

  return (
    <div className="min-h-screen bg-background relative pb-44">
      <header className="px-4 pt-12 pb-4 flex items-center gap-4 bg-background sticky top-0 z-10 border-b border-border/10">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center text-foreground -ml-2 hover:text-primary transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold font-display text-foreground">Mon panier</h1>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-sm font-bold text-text-muted">Votre panier Teranga est vide.</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Découvrir le menu
          </button>
        </div>
      ) : (
        <main className="px-4 pt-4 flex flex-col gap-6">
          
          {/* Cart Items List */}
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="bg-surface-elevated rounded-[18px] p-3 flex gap-4 shadow-sm border border-border">
                <div className="relative w-20 h-20 rounded-[12px] overflow-hidden flex-shrink-0 bg-surface-strong border border-border/25">
                  <Image src={item.image} alt={item.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col justify-between py-1 flex-grow">
                  <div>
                    <h3 className="font-bold text-[14px] text-foreground leading-tight line-clamp-1">{item.name}</h3>
                    <p className="text-[10px] text-text-secondary mt-0.5">{item.variant}</p>
                  </div>
                  <span className="font-bold text-xs text-primary font-mono">{formatPrice(item.price)} FCFA</span>
                </div>
                <div className="flex flex-col items-end justify-between py-1">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-text-muted hover:text-error transition-colors p-1 -mr-1"
                  >
                    <Trash2 size={15} />
                  </button>
                  <div className="flex items-center gap-2 bg-background rounded-full px-2.5 py-1 border border-border">
                    <button 
                      onClick={() => adjustQuantity(item.id, -1)}
                      className="text-text-secondary hover:text-foreground transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-bold w-4 text-center font-mono">{item.quantity}</span>
                    <button 
                      onClick={() => adjustQuantity(item.id, 1)}
                      className="text-text-secondary hover:text-foreground transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Location Section */}
          <div className="bg-surface-elevated rounded-[18px] p-4 border border-border shadow-sm">
            <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span>Adresse de Livraison (Sénégal)</span>
            </h3>
            <div className="flex flex-col gap-2">
              {["Mermoz Extension, Villa 42, Dakar", "Almadies, Face Clinique des Mamelles, Dakar", "Dakar Plateau, 12 Rue Carnot"].map((addr) => (
                <button
                  key={addr}
                  onClick={() => setSelectedAddress(addr)}
                  className={`text-left p-3 rounded-xl text-xs font-semibold border transition-all ${
                    selectedAddress === addr 
                      ? "border-primary bg-primary-soft/30 text-foreground" 
                      : "border-border hover:bg-surface-subtle"
                  }`}
                >
                  {addr}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Methods selector (matches screenshot beautifully) */}
          <div className="bg-surface-elevated rounded-[18px] p-4 border border-border shadow-sm">
            <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
              <Landmark size={16} className="text-primary" />
              <span>Mode de paiement</span>
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { id: "Wave", label: "Wave Sénégal (Sans frais)", desc: "Paiement direct 100% sécurisé", color: "bg-[#1AC1FF]" },
                { id: "Orange Money", label: "Orange Money", desc: "Clé marchand instantanée", color: "bg-secondary" },
                { id: "Espèces", label: "Espèces à la livraison", desc: "Règlement physique à Dakar", color: "bg-success" }
              ].map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id as any)}
                  className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    paymentMethod === pm.id 
                      ? "border-primary bg-primary-soft/30 text-foreground" 
                      : "border-border hover:bg-surface-subtle"
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs block">{pm.label}</span>
                    <span className="text-[10px] text-text-muted mt-0.5 block">{pm.desc}</span>
                  </div>
                  <div className={`w-3.5 h-3.5 rounded-full ${pm.color} shrink-0`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Checkout Invoice Totals */}
          <div className="bg-surface-elevated rounded-[18px] p-4 border border-border shadow-sm flex flex-col gap-3">
            <div className="flex justify-between text-xs text-text-secondary font-semibold">
              <span>Sous-total</span>
              <span className="font-mono">{formatPrice(subtotal)} FCFA</span>
            </div>
            <div className="flex justify-between text-xs text-text-secondary font-semibold">
              <span>Frais de livraison (Dakar Zone)</span>
              <span className="font-mono">{formatPrice(deliveryFee)} FCFA</span>
            </div>
            <div className="h-px bg-border my-1"></div>
            <div className="flex justify-between font-bold font-display text-base text-foreground">
              <span>Total</span>
              <span className="font-mono text-primary">{formatPrice(total)} FCFA</span>
            </div>
          </div>
        </main>
      )}

      {/* Sticky Bottom validation bar */}
      {items.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-surface-elevated border-t border-border p-4 pb-8 z-30 rounded-t-2xl shadow-[0_-8px_24px_rgba(64,38,20,0.08)]">
          <button 
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white rounded-[14px] py-4 font-bold text-sm shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isProcessing ? "Traitement Mobile Money..." : `Confirmer & Payer (${formatPrice(total)} FCFA)`}
          </button>
        </div>
      )}

      {/* Transaction Success Modal simulation */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-[#201C19]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface-elevated p-6 rounded-3xl border border-border w-full max-w-xs text-center shadow-2xl flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 bg-success-soft rounded-full flex items-center justify-center text-success border border-success/20">
                <Check size={32} strokeWidth={3} className="animate-bounce" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg text-foreground">Paiement Reçu !</h3>
                <p className="text-xs text-text-secondary mt-1">Votre paiement via <strong className="text-primary">{paymentMethod}</strong> a été validé avec succès côté serveur.</p>
              </div>
              <button 
                onClick={confirmAndTrack}
                className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl py-3 text-xs font-bold shadow-md transition-colors"
              >
                Suivre ma commande 🛵
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

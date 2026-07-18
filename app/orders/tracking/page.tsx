"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Check, ChefHat, Bike, Home, MapPin, Phone, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { cartItems } from "@/lib/data";
import { motion } from "motion/react";
import { formatPrice } from "@/lib/utils";

export default function OrderTracking() {
  const router = useRouter();
  const [step, setStep] = useState(2); // Start at "En préparation"

  // Automatically advance steps for demo purposes
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(3), 6000); // En livraison after 6s
    const timer2 = setTimeout(() => setStep(4), 14000); // Livrée after 14s
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 1000;

  return (
    <div className="min-h-screen bg-background relative pb-20">
      <header className="px-4 pt-12 pb-4 flex items-center gap-4 bg-background sticky top-0 z-10 border-b border-border/10">
        <button onClick={() => router.push('/')} className="w-10 h-10 flex items-center justify-center text-foreground -ml-2 hover:text-primary transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold font-display text-foreground">Suivi de commande</h1>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">ID: TRG-7822 • Payé par Wave</p>
        </div>
      </header>

      <main className="px-4 py-4 flex flex-col gap-6">
        
        {/* Status Tracker Card */}
        <div className="bg-surface-elevated rounded-[18px] p-5 shadow-sm border border-border">
          <div className="flex items-start gap-3 mb-6">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border ${
              step === 4 ? "bg-success-soft text-success border-success/20" : "bg-warning-soft text-warning border-warning/20"
            }`}>
              {step === 2 && <ChefHat size={20} />}
              {step === 3 && <Bike size={20} className="animate-bounce" />}
              {step === 4 && <Check size={20} strokeWidth={3} />}
            </div>
            <div>
              <h2 className="font-bold text-base text-foreground">
                {step === 2 && "En cuisine (Préparation)"}
                {step === 3 && "En cours de livraison 🛵"}
                {step === 4 && "Livré avec succès !"}
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                {step === 2 && "Le chef dresse votre Thiéboudienne rouge."}
                {step === 3 && "Moussa Diop se dirige vers votre domicile."}
                {step === 4 && "Commande déposée. Bon appétit (Ndogou) !"}
              </p>
            </div>
          </div>

          {/* Stepper progress dots */}
          <div className="flex items-center justify-between w-full px-2 mb-2 relative">
             <div className="absolute top-1/2 left-6 right-6 h-1 bg-border -translate-y-1/2 z-0"></div>
             <div 
               className="absolute top-1/2 left-6 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-1000"
               style={{ width: `${(step - 1) * 33.3}%` }}
             ></div>

             {/* Step 1: Reçue */}
             <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center z-10 relative border-4 border-surface-elevated shadow-sm">
               <Check size={16} strokeWidth={3} />
             </div>

             {/* Step 2: Préparation */}
             <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative border-4 border-surface-elevated shadow-sm transition-all ${
               step >= 2 ? "bg-primary text-white" : "bg-surface-strong text-text-muted"
             }`}>
               {step > 2 ? <Check size={16} strokeWidth={3} /> : <ChefHat size={16} />}
             </div>

             {/* Step 3: Livraison */}
             <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative border-4 border-surface-elevated shadow-sm transition-all ${
               step >= 3 ? "bg-primary text-white" : "bg-surface-strong text-text-muted"
             }`}>
               {step > 3 ? <Check size={16} strokeWidth={3} /> : <Bike size={16} />}
             </div>

             {/* Step 4: Livrée */}
             <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative border-4 border-surface-elevated shadow-sm transition-all ${
               step >= 4 ? "bg-primary text-white" : "bg-surface-strong text-text-muted"
             }`}>
               <Check size={16} strokeWidth={3} />
             </div>
          </div>

          <div className="flex justify-between text-[10px] text-text-muted font-bold uppercase tracking-wider px-1 mt-2">
            <span>Reçue</span>
            <span>Cuisine</span>
            <span>Route</span>
            <span>Livré</span>
          </div>
        </div>

        {/* Live Map simulation (Beautiful stylized CSS/SVG Map) */}
        <div className="bg-surface-elevated rounded-[18px] p-2 border border-border shadow-sm h-48 relative overflow-hidden flex items-center justify-center">
          {/* Mock Map background with paths */}
          <svg className="absolute inset-0 w-full h-full text-border/60" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#EFE5D8" opacity="0.3" />
            <path d="M 0 50 Q 150 120 400 90" stroke="currentColor" strokeWidth="8" fill="none" />
            <path d="M 80 0 Q 120 200 100 400" stroke="currentColor" strokeWidth="6" fill="none" />
            <path d="M 280 0 Q 220 200 320 400" stroke="currentColor" strokeWidth="4" fill="none" />
            <circle cx="250" cy="100" r="40" fill="#F5A900" opacity="0.15" />
          </svg>

          {/* Restaurant Location Pin */}
          <div className="absolute left-[80px] top-[140px] flex flex-col items-center">
            <div className="bg-primary text-white p-1 rounded-full shadow-md z-10">
              <MapPin size={14} />
            </div>
            <span className="text-[9px] font-bold bg-[#201C19] text-white px-1.5 py-0.5 rounded-md mt-1 shadow-sm uppercase whitespace-nowrap">Le Dakarois</span>
          </div>

          {/* Customer Location Pin */}
          <div className="absolute right-[80px] top-[70px] flex flex-col items-center">
            <div className="bg-success text-white p-1 rounded-full shadow-md z-10">
              <Home size={14} />
            </div>
            <span className="text-[9px] font-bold bg-[#201C19] text-white px-1.5 py-0.5 rounded-md mt-1 shadow-sm uppercase whitespace-nowrap">Mermoz</span>
          </div>

          {/* Delivery Rider on Route */}
          {step === 3 && (
            <motion.div 
              animate={{ x: [0, 80, 160], y: [0, -20, -50] }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute left-[100px] top-[130px] z-20 flex flex-col items-center"
            >
              <div className="bg-secondary text-foreground p-1.5 rounded-full shadow-lg border border-white">
                <Bike size={16} />
              </div>
              <span className="text-[8px] font-extrabold bg-secondary text-foreground px-1.5 py-0.5 rounded-full mt-1 uppercase whitespace-nowrap">Moussa (Rider)</span>
            </motion.div>
          )}

          <div className="absolute bottom-3 left-3 bg-[#201C19]/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-[10px] font-bold shadow-md">
            <span>Dakar Traffic: Fluide</span>
          </div>
        </div>

        {/* Delivery Rider Info */}
        <div className="bg-surface-elevated rounded-[18px] p-4 shadow-sm border border-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-surface-strong rounded-full overflow-hidden flex items-center justify-center border border-border">
              <span className="font-display font-bold text-lg text-text-muted">MD</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wider">Votre livreur Teranga</span>
              <h3 className="font-bold text-sm text-foreground">Moussa Diop</h3>
              <p className="text-xs text-text-secondary font-semibold mt-0.5">Moto Yamaha Dakar-Plateau</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
              <Phone size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
              <MessageSquare size={18} />
            </button>
          </div>
        </div>

        {/* Order Items Bill Summary */}
        <div className="bg-surface-elevated rounded-[18px] p-5 shadow-sm border border-border">
          <h3 className="font-bold font-display text-sm mb-4">Détails de la commande</h3>
          <div className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-primary w-5">{item.quantity}x</span>
                  <span className="font-semibold text-foreground">{item.name}</span>
                </div>
                <span className="font-mono font-bold">{formatPrice(item.price * item.quantity)} FCFA</span>
              </div>
            ))}
            <div className="h-px bg-border my-2"></div>
            <div className="flex justify-between items-center text-xs text-text-secondary">
              <span>Frais de livraison</span>
              <span className="font-mono">1 000 FCFA</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-foreground mt-1">
              <span>Montant payé (Wave)</span>
              <span className="font-mono text-primary">{formatPrice(totalAmount)} FCFA</span>
            </div>
          </div>
        </div>

        {/* Address and timing details */}
        <div className="bg-surface-elevated rounded-[18px] p-5 shadow-sm border border-border flex flex-col gap-4">
          <div>
            <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wider mb-1">Livraison à</span>
            <p className="font-semibold text-foreground text-xs leading-relaxed">Mermoz Extension, Villa 42, Dakar, Sénégal</p>
          </div>
          <div>
            <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wider mb-1">Temps estimé</span>
            <p className="font-bold font-display text-lg text-primary">25 - 35 min</p>
          </div>
        </div>

      </main>
    </div>
  );
}

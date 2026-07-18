"use client";
import { useRouter } from "next/navigation";
import { User, MapPin, CreditCard, ClipboardList, Tag, Settings, HelpCircle, Info, ChevronRight, Gift, Store } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export default function Account() {
  const router = useRouter();

  const menuItems = [
    { icon: Store, label: "Gérer mon restaurant (Commandes, Stocks, Ventes)", action: () => router.push('/cockpit') },
    { icon: User, label: "Informations personnelles", action: () => {} },
    { icon: MapPin, label: "Mes adresses (Dakar Plateau, Mermoz)", action: () => {} },
    { icon: CreditCard, label: "Moyens de paiement (Wave, Orange Money)", action: () => router.push('/cart') },
    { icon: ClipboardList, label: "Mes commandes récentes", action: () => router.push('/orders') },
    { icon: Gift, label: "Parrainer des proches (Gagnez 2 000 FCFA)", action: () => {} },
    { icon: Settings, label: "Paramètres de la Teranga", action: () => {} },
    { icon: HelpCircle, label: "Aide et support technique 24/7", action: () => {} },
    { icon: Info, label: "À propos de Teranga Resto", action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-background relative pb-32">
      <header className="px-4 pt-12 pb-4 bg-background sticky top-0 z-10 border-b border-border/10">
        <h1 className="text-xl font-bold font-display text-foreground">Mon compte</h1>
        <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-0.5">Julie Martin • Propriétaire Teranga</p>
      </header>

      <main className="px-4 py-4 flex flex-col gap-6">
        {/* Profile Card */}
        <div className="bg-surface-elevated rounded-[18px] p-4 flex items-center gap-4 shadow-sm border border-border">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
            <span className="font-display font-extrabold text-xl">JM</span>
          </div>
          <div>
            <h2 className="font-bold font-display text-base text-foreground">Julie Martin</h2>
            <p className="text-xs text-text-secondary">julie.martin@mail.fr</p>
            <span className="text-[9px] bg-secondary/20 text-foreground border border-secondary/30 px-2 py-0.5 rounded-full font-extrabold font-mono mt-1.5 inline-block uppercase tracking-wider">Gérant & Propriétaire</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-surface-elevated rounded-[18px] shadow-sm border border-border overflow-hidden">
          {menuItems.map((item, index) => (
            <div key={item.label}>
              <button 
                onClick={item.action}
                className="w-full flex items-center justify-between p-4 hover:bg-surface transition-colors active:bg-surface-strong text-left"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className="text-primary" />
                  <span className="font-bold text-xs text-foreground">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-text-muted" />
              </button>
              {index < menuItems.length - 1 && (
                <div className="h-px bg-border mx-4"></div>
              )}
            </div>
          ))}
        </div>

        <button 
          onClick={() => router.push('/login')}
          className="w-full bg-primary hover:bg-primary-hover text-white rounded-[14px] h-[52px] font-bold text-sm shadow-sm mt-2 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Se déconnecter de la session
        </button>
      </main>

      <BottomNav />
    </div>
  );
}

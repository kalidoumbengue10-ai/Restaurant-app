"use client";
import { BottomNav } from "@/components/BottomNav";
import { useRouter } from "next/navigation";
import { ClipboardList, ChevronRight, Clock, CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function Orders() {
  const router = useRouter();

  const pastOrders = [
    {
      id: "TRG-7822",
      date: "Aujourd'hui, 13:12",
      items: "1x Thiéboudienne Penda Mbaye, 2x Pastels, 2x Jus de Bissap",
      total: 9000,
      status: "En préparation",
      color: "text-warning bg-warning-soft border-warning/10"
    },
    {
      id: "TRG-7815",
      date: "Hier, 20:30",
      items: "1x Dibi Mouton Traditionnel, 1x Jus de Bouye à la Vanille",
      total: 7200,
      status: "Livrée",
      color: "text-success bg-success-soft border-success/10"
    },
    {
      id: "TRG-7798",
      date: "12 Juillet 2026",
      items: "2x Yassa Poulet au Feu de Bois",
      total: 6000,
      status: "Livrée",
      color: "text-success bg-success-soft border-success/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative pb-32 flex flex-col justify-between">
      <div>
        <header className="px-4 pt-12 pb-4 bg-background sticky top-0 z-10 flex-shrink-0 border-b border-border/10">
          <h1 className="text-xl font-bold font-display text-foreground">Mes commandes</h1>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-0.5">Historique Teranga Resto</p>
        </header>

        <main className="px-4 py-4 flex flex-col gap-4">
          {pastOrders.map((order) => (
            <div 
              key={order.id} 
              onClick={() => { if (order.status === "En préparation") router.push('/orders/tracking'); }}
              className={`bg-surface-elevated rounded-[18px] p-4 border border-border shadow-sm flex flex-col gap-3 transition-transform active:scale-[0.99] ${
                order.status === "En préparation" ? "cursor-pointer hover:border-primary" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-primary">{order.id}</span>
                  <span className="text-[10px] text-text-muted font-bold">• {order.date}</span>
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${order.color}`}>
                  {order.status}
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold text-foreground line-clamp-2 leading-relaxed">{order.items}</p>
              </div>

              <div className="h-px bg-border/50"></div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">Montant</span>
                  <span className="font-bold text-sm text-foreground">{formatPrice(order.total)} FCFA</span>
                </div>
                {order.status === "En préparation" ? (
                  <button className="text-xs font-bold text-primary flex items-center gap-1">
                    <span>Suivre en direct</span>
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <span className="text-xs font-bold text-text-muted flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>Détails</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}

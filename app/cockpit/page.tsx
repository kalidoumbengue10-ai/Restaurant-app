"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ClipboardList, ChefHat, Bike, Check, X, BarChart3, Package, CalendarDays, 
  Settings, Users, AlertTriangle, Bell, Plus, Minus, Landmark, RefreshCw, Smartphone
} from "lucide-react";
import { initialOrders, stockIngredients, initialReservations, Order } from "@/lib/data";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function Cockpit() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "stocks" | "reservations">("dashboard");
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [stocks, setStocks] = useState(stockIngredients);
  const [reservations, setReservations] = useState(initialReservations);
  
  // New reservation form state
  const [resName, setResName] = useState("");
  const [resGuests, setResGuests] = useState(2);
  const [resTime, setResTime] = useState("13:00");

  // Notifications simulation
  const [simulatedSMS, setSimulatedSMS] = useState<string | null>(null);

  // Auto-notification helper
  const triggerSMS = (message: string) => {
    setSimulatedSMS(message);
    setTimeout(() => setSimulatedSMS(null), 5000);
  };

  // Change order status
  const updateOrderStatus = (orderId: string, nextStatus: Order["status"]) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const updated = { ...o, status: nextStatus };
        // Trigger simulated SMS
        if (nextStatus === "Confirmée") {
          triggerSMS(`[Teranga Resto] Commande ${o.id} confirmée. Nous préparons votre délicieux repas !`);
        } else if (nextStatus === "En livraison") {
          triggerSMS(`[Teranga Resto] Votre ${o.items[0].name} est en route avec notre livreur Moussa (+221 77 888 11 22). Préparez vos ${o.total} FCFA !`);
        } else if (nextStatus === "Livrée") {
          triggerSMS(`[Teranga Resto] Commande ${o.id} livrée avec succès. Jërëjëf (Merci) pour votre confiance !`);
        }
        return updated;
      }
      return o;
    }));
  };

  // Quick stat calculations
  const totalSales = orders.reduce((acc, o) => o.paymentStatus === "paid" ? acc + o.total : acc, 0);
  const pendingOrdersCount = orders.filter(o => o.status !== "Livrée" && o.status !== "Annulée").length;
  const lowStockCount = stocks.filter(s => s.quantity <= s.threshold).length;

  const handleAddReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName) return;
    const newRes = {
      id: `R-${reservations.length + 1}`,
      customerName: resName,
      guests: resGuests,
      date: "Aujourd'hui",
      time: resTime,
      table: `Table ${Math.floor(Math.random() * 5) + 2}`,
      status: "Confirmé"
    };
    setReservations([newRes, ...reservations]);
    setResName("");
    triggerSMS(`[Teranga Resto] Table réservée avec succès pour ${resGuests} personnes à ${resTime}. À tout de suite !`);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-foreground flex flex-col md:flex-row font-body relative overflow-x-hidden">
      
      {/* Simulation Banner Overlay */}
      <AnimatePresence>
        {simulatedSMS && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 bg-foreground text-background py-3 px-5 rounded-2xl shadow-2xl z-50 flex items-center gap-3 border border-border max-w-sm w-[90%]"
          >
            <Smartphone className="text-secondary shrink-0 animate-bounce" size={24} />
            <div className="text-xs">
              <span className="font-bold block text-secondary">Notification SMS Client (+221)</span>
              <p className="font-mono mt-0.5">{simulatedSMS}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar - Pro Cockpit */}
      <aside className="w-full md:w-64 bg-[#201C19] text-white flex flex-col justify-between shrink-0 p-5 md:min-h-screen border-r border-border-dark">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-display font-extrabold text-lg shadow-md">TR</div>
              <div>
                <span className="font-display font-bold text-base tracking-tight block">Teranga Resto</span>
                <span className="text-[10px] text-text-muted block font-semibold uppercase tracking-wider">Gestion du Restaurant</span>
              </div>
            </Link>
          </div>

          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === "dashboard" ? "bg-primary text-white" : "text-text-secondary-dark hover:bg-surface-dark hover:text-white"}`}
            >
              <BarChart3 size={18} />
              <span>Vue d&apos;ensemble</span>
            </button>
            <button 
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap relative ${activeTab === "orders" ? "bg-primary text-white" : "text-text-secondary-dark hover:bg-surface-dark hover:text-white"}`}
            >
              <ClipboardList size={18} />
              <span>Suivi Commandes</span>
              {pendingOrdersCount > 0 && (
                <span className="absolute right-3 top-3 bg-secondary text-foreground text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                  {pendingOrdersCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab("stocks")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === "stocks" ? "bg-primary text-white" : "text-text-secondary-dark hover:bg-surface-dark hover:text-white"}`}
            >
              <Package size={18} />
              <span>Stocks & Ingrédients</span>
            </button>
            <button 
              onClick={() => setActiveTab("reservations")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === "reservations" ? "bg-primary text-white" : "text-text-secondary-dark hover:bg-surface-dark hover:text-white"}`}
            >
              <CalendarDays size={18} />
              <span>Réservations</span>
            </button>
          </nav>
        </div>

        <div className="mt-8 md:mt-0 flex flex-col gap-4 border-t border-border-dark/50 pt-4">
          <Link href="/" className="flex items-center justify-center gap-2 bg-surface-dark/50 border border-border-dark text-white rounded-xl py-2.5 text-xs font-bold hover:bg-surface-dark transition-colors">
            <Smartphone size={14} />
            <span>Aller à l&apos;app Client</span>
          </Link>
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <div className="w-2 h-2 rounded-full bg-success animate-ping"></div>
            <span>Dakar Plateau Hub • Connecté</span>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* Workspace Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Restaurant Le Dakarois</span>
            <h1 className="text-3xl font-display font-extrabold text-foreground tracking-tight">Gestion de mon Restaurant</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-surface-elevated border border-border px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-2">
              <Landmark size={14} className="text-primary" />
              <span>Caisse locale: <strong className="text-primary">Wave / Orange Money</strong></span>
            </div>
            <button className="w-10 h-10 rounded-xl bg-surface-elevated border border-border flex items-center justify-center shadow-sm text-text-secondary hover:text-primary transition-colors">
              <Bell size={20} className="animate-swing" />
            </button>
          </div>
        </header>

        {/* Tab Contents */}
        {activeTab === "dashboard" && (
          <div className="flex flex-col gap-8">
            
            {/* Senegal stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-surface-elevated p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">Chiffre du Jour</span>
                  <span className="text-2xl font-display font-extrabold text-foreground block mt-1">{formatPrice(totalSales + 142000)} FCFA</span>
                  <span className="text-xs text-success font-semibold mt-1 block">↑ +18% comparé à hier</span>
                </div>
                <div className="w-12 h-12 bg-success-soft rounded-2xl flex items-center justify-center text-success">
                  <Landmark size={24} />
                </div>
              </div>

              <div className="bg-surface-elevated p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">Commandes Actives</span>
                  <span className="text-2xl font-display font-extrabold text-primary block mt-1">{pendingOrdersCount} en cours</span>
                  <span className="text-xs text-text-secondary font-semibold mt-1 block">Délai moyen: 28 min</span>
                </div>
                <div className="w-12 h-12 bg-primary-soft rounded-2xl flex items-center justify-center text-primary">
                  <ClipboardList size={24} />
                </div>
              </div>

              <div className="bg-surface-elevated p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">Alertes Ingrédients</span>
                  <span className="text-2xl font-display font-extrabold text-warning block mt-1">{lowStockCount} à réapprovisionner</span>
                  <span className="text-xs text-text-secondary font-semibold mt-1 block">Oignons locaux en alerte</span>
                </div>
                <div className="w-12 h-12 bg-warning-soft rounded-2xl flex items-center justify-center text-warning">
                  <AlertTriangle size={24} />
                </div>
              </div>
            </div>

            {/* Live orders and active table reservations split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Order stream column */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold font-display">Flux des Commandes en Direct</h2>
                  <button onClick={() => setOrders(initialOrders)} className="text-xs font-bold text-primary flex items-center gap-1">
                    <RefreshCw size={12} /> Réinitialiser
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-surface-elevated p-5 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono font-bold text-primary text-sm">{order.id}</span>
                          <span className="text-xs bg-surface-subtle px-2 py-0.5 rounded-full font-bold text-text-secondary">{order.type}</span>
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            order.paymentStatus === "paid" ? "bg-success-soft text-success" : "bg-warning-soft text-warning"
                          }`}>
                            {order.paymentStatus === "paid" ? "Payé" : "À Encaisser"}
                          </span>
                        </div>
                        <h3 className="font-bold text-base">{order.customerName} • <span className="text-xs text-text-muted font-normal">{order.phone}</span></h3>
                        <p className="text-xs text-text-secondary font-semibold mt-1">{order.address}</p>
                        
                        {/* Order items line */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {order.items.map((it, idx) => (
                            <span key={idx} className="text-xs bg-surface-subtle px-2 py-1 rounded-lg font-bold text-foreground">
                              {it.quantity}x {it.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end justify-between gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                        <div className="text-right sm:block flex justify-between items-center w-full sm:w-auto">
                          <span className="text-xs text-text-muted block">Total</span>
                          <span className="font-display font-extrabold text-lg text-foreground">{formatPrice(order.total)} FCFA</span>
                        </div>

                        {/* Status advancement actions */}
                        <div className="flex items-center gap-2">
                          {order.status === "Nouvelle" && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, "Confirmée")}
                              className="px-4 py-2 rounded-xl bg-success text-white font-bold text-xs hover:bg-success/90 transition-colors shadow-sm"
                            >
                              Accepter
                            </button>
                          )}
                          {order.status === "Confirmée" && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, "En préparation")}
                              className="px-4 py-2 rounded-xl bg-warning text-white font-bold text-xs hover:bg-warning/90 transition-colors shadow-sm"
                            >
                              Préparer
                            </button>
                          )}
                          {order.status === "En préparation" && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, "En livraison")}
                              className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-hover transition-colors shadow-sm"
                            >
                              Assigner Livreur
                            </button>
                          )}
                          {order.status === "En livraison" && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, "Livrée")}
                              className="px-4 py-2 rounded-xl bg-success text-white font-bold text-xs hover:bg-success/90 transition-colors shadow-sm"
                            >
                              Marquer Livrée
                            </button>
                          )}
                          {order.status === "Livrée" && (
                            <span className="text-xs font-bold text-success flex items-center gap-1">
                              <Check size={14} /> Terminée
                            </span>
                          )}

                          {order.status !== "Livrée" && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, "Annulée")}
                              className="p-2 rounded-xl hover:bg-error-soft text-text-muted hover:text-error transition-colors"
                              title="Annuler"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar stats & booking widget */}
              <div className="flex flex-col gap-6">
                <div className="bg-surface-elevated p-5 rounded-2xl border border-border shadow-sm">
                  <h2 className="text-base font-bold font-display mb-4">Paiements Mobile Money Reçus</h2>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-text-secondary">Wave Sénégal</span>
                      <span className="font-bold">{formatPrice(totalSales * 0.6)} FCFA</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-[#1AC1FF]" style={{ width: "60%" }}></div>
                    </div>

                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="font-semibold text-text-secondary">Orange Money</span>
                      <span className="font-bold">{formatPrice(totalSales * 0.35)} FCFA</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-secondary" style={{ width: "35%" }}></div>
                    </div>

                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="font-semibold text-text-secondary">Espèces à la livraison</span>
                      <span className="font-bold">{formatPrice(totalSales * 0.05)} FCFA</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-success" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-elevated p-5 rounded-2xl border border-border shadow-sm">
                  <h2 className="text-base font-bold font-display mb-3">Dernières Réservations</h2>
                  <div className="flex flex-col gap-3">
                    {reservations.slice(0, 2).map(r => (
                      <div key={r.id} className="text-xs border-b border-border pb-2 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center mb-1">
                          <strong className="font-bold text-foreground text-sm">{r.customerName}</strong>
                          <span className="bg-success-soft text-success text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase">{r.status}</span>
                        </div>
                        <p className="text-text-secondary font-semibold">{r.guests} convives • {r.time} • {r.table}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-surface-elevated rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-display">Gestionnaires de Commandes</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-surface text-text-secondary border border-border text-xs font-bold">Toutes</button>
                <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold">Actives</button>
              </div>
            </div>

            {/* Kanban Columns Simulated */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Column 1: Nouvelles & Confirmées */}
              <div className="bg-background p-4 rounded-xl flex flex-col gap-3 border border-border/60">
                <h3 className="font-bold text-sm text-foreground uppercase tracking-wider flex items-center justify-between">
                  <span>À valider</span>
                  <span className="bg-primary/10 text-primary text-xs w-5 h-5 rounded-full flex items-center justify-center font-extrabold">
                    {orders.filter(o => o.status === "Nouvelle" || o.status === "Confirmée").length}
                  </span>
                </h3>
                {orders.filter(o => o.status === "Nouvelle" || o.status === "Confirmée").map(o => (
                  <div key={o.id} className="bg-surface-elevated p-4 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="font-mono text-primary text-xs">{o.id}</strong>
                      <span className="text-[10px] bg-[#EAF3FA] text-primary font-bold px-2 py-0.5 rounded-full">{o.status}</span>
                    </div>
                    <span className="font-bold text-sm block">{o.customerName}</span>
                    <p className="text-xs text-text-muted mt-1">{o.items.map(it => `${it.quantity}x ${it.name}`).join(', ')}</p>
                    <div className="mt-3 pt-2 border-t border-border/50 flex justify-between items-center">
                      <span className="font-bold text-sm">{formatPrice(o.total)} FCFA</span>
                      <button 
                        onClick={() => updateOrderStatus(o.id, o.status === "Nouvelle" ? "Confirmée" : "En préparation")}
                        className="bg-primary hover:bg-primary-hover text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Prêt
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2: Préparation */}
              <div className="bg-background p-4 rounded-xl flex flex-col gap-3 border border-border/60">
                <h3 className="font-bold text-sm text-foreground uppercase tracking-wider flex items-center justify-between">
                  <span>En cuisine</span>
                  <span className="bg-warning/10 text-warning text-xs w-5 h-5 rounded-full flex items-center justify-center font-extrabold">
                    {orders.filter(o => o.status === "En préparation").length}
                  </span>
                </h3>
                {orders.filter(o => o.status === "En préparation").map(o => (
                  <div key={o.id} className="bg-surface-elevated p-4 rounded-xl border border-border shadow-sm border-l-4 border-l-warning">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="font-mono text-primary text-xs">{o.id}</strong>
                      <span className="text-[10px] bg-warning-soft text-warning font-bold px-2 py-0.5 rounded-full">Préparation</span>
                    </div>
                    <span className="font-bold text-sm block">{o.customerName}</span>
                    <p className="text-xs text-text-muted mt-1">{o.items.map(it => `${it.quantity}x ${it.name}`).join(', ')}</p>
                    <div className="mt-3 pt-2 border-t border-border/50 flex justify-between items-center">
                      <span className="font-bold text-sm">{formatPrice(o.total)} FCFA</span>
                      <button 
                        onClick={() => updateOrderStatus(o.id, "En livraison")}
                        className="bg-warning hover:bg-warning/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Livrer
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 3: Livraison */}
              <div className="bg-background p-4 rounded-xl flex flex-col gap-3 border border-border/60">
                <h3 className="font-bold text-sm text-foreground uppercase tracking-wider flex items-center justify-between">
                  <span>Livreur en route</span>
                  <span className="bg-[#245C8A]/10 text-[#245C8A] text-xs w-5 h-5 rounded-full flex items-center justify-center font-extrabold">
                    {orders.filter(o => o.status === "En livraison").length}
                  </span>
                </h3>
                {orders.filter(o => o.status === "En livraison").map(o => (
                  <div key={o.id} className="bg-surface-elevated p-4 rounded-xl border border-border shadow-sm border-l-4 border-l-info">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="font-mono text-primary text-xs">{o.id}</strong>
                      <span className="text-[10px] bg-info-soft text-info font-bold px-2 py-0.5 rounded-full">En route</span>
                    </div>
                    <span className="font-bold text-sm block">{o.customerName}</span>
                    <p className="text-xs text-text-muted mt-1">{o.items.map(it => `${it.quantity}x ${it.name}`).join(', ')}</p>
                    <div className="mt-3 pt-2 border-t border-border/50 flex justify-between items-center">
                      <span className="font-bold text-sm">{formatPrice(o.total)} FCFA</span>
                      <button 
                        onClick={() => updateOrderStatus(o.id, "Livrée")}
                        className="bg-[#245C8A] hover:bg-[#245C8A]/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Terminé
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {activeTab === "stocks" && (
          <div className="bg-surface-elevated rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold font-display">Ingrédients & Suivi des Recettes</h2>
                <p className="text-xs text-text-secondary mt-1">Dernière décrémentation automatique il y a 2 minutes suite à une vente de Thiéboudienne.</p>
              </div>
              <button onClick={() => setStocks(stockIngredients)} className="text-xs font-bold text-primary">Réinitialiser Stocks</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-text-secondary">
                    <th className="py-3 px-4 font-bold">Ingrédient</th>
                    <th className="py-3 px-4 font-bold">Quantité Actuelle</th>
                    <th className="py-3 px-4 font-bold">Seuil Alerte</th>
                    <th className="py-3 px-4 font-bold">État</th>
                    <th className="py-3 px-4 font-bold text-right">Ajuster Manuel</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map(st => (
                    <tr key={st.id} className="border-b border-border last:border-0 hover:bg-surface/50">
                      <td className="py-3 px-4 font-bold text-foreground">{st.name}</td>
                      <td className="py-3 px-4 font-mono font-bold text-base">{st.quantity} {st.unit}</td>
                      <td className="py-3 px-4 text-text-secondary font-semibold">{st.threshold} {st.unit}</td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          st.quantity <= st.threshold ? "bg-error-soft text-error animate-pulse" : "bg-success-soft text-success"
                        }`}>
                          {st.quantity <= st.threshold ? "Seuil Bas" : "En Stock"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setStocks(prev => prev.map(s => s.id === st.id ? { ...s, quantity: Math.max(0, s.quantity - 5) } : s))}
                            className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-primary"
                          >
                            <Minus size={14} />
                          </button>
                          <button 
                            onClick={() => setStocks(prev => prev.map(s => s.id === st.id ? { ...s, quantity: s.quantity + 5 } : s))}
                            className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-primary"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "reservations" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Reservation List */}
            <div className="lg:col-span-2 bg-surface-elevated rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="text-xl font-bold font-display mb-6">Livre des Réservations</h2>
              
              <div className="flex flex-col gap-4">
                {reservations.map(res => (
                  <div key={res.id} className="p-4 rounded-xl border border-border bg-background flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-base text-foreground">{res.customerName}</h3>
                      <p className="text-xs text-text-secondary font-semibold mt-1">
                        {res.guests} convives • {res.date} à <strong>{res.time}</strong> • {res.table}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-success bg-success-soft px-3 py-1 rounded-full">{res.status}</span>
                      <button 
                        onClick={() => setReservations(prev => prev.filter(r => r.id !== res.id))}
                        className="p-1.5 rounded-lg hover:bg-error-soft text-text-muted hover:text-error transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick add booking */}
            <div className="bg-surface-elevated rounded-2xl border border-border p-6 shadow-sm flex flex-col gap-4">
              <h2 className="text-lg font-bold font-display">Nouvelle Réservation</h2>
              <form onSubmit={handleAddReservation} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">Nom du client</label>
                  <input 
                    type="text" 
                    value={resName}
                    onChange={e => setResName(e.target.value)}
                    placeholder="ex: Aminata Sow"
                    className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">Couverts</label>
                    <input 
                      type="number" 
                      min="1"
                      max="20"
                      value={resGuests}
                      onChange={e => setResGuests(Number(e.target.value))}
                      className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">Heure</label>
                    <input 
                      type="time" 
                      value={resTime}
                      onChange={e => setResTime(e.target.value)}
                      className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white rounded-lg h-11 font-bold text-xs shadow-sm transition-transform active:scale-[0.98]"
                >
                  Confirmer Réservation (Teranga)
                </button>
              </form>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}

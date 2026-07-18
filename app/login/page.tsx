"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Apple, Mail, Phone, Smartphone } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"phone" | "email">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-secondary relative flex flex-col justify-end overflow-hidden w-full h-full">
      {/* Background imagery / Top section */}
      <div className="absolute top-0 w-full h-1/2 overflow-hidden flex items-center justify-center">
         <Image src="https://picsum.photos/seed/saladbg/800/800" alt="Background" fill className="object-cover opacity-90" priority referrerPolicy="no-referrer" />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary"></div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-background rounded-t-[32px] w-full p-6 pt-8 z-10 relative shadow-[0_-8px_24px_rgba(64,38,20,0.08)] flex-shrink-0">
        <h1 className="text-2xl font-bold font-display text-foreground mb-1">Bienvenue chez Teranga !</h1>
        <p className="text-xs text-text-secondary mb-6">Le meilleur de la cuisine sénégalaise en un clic</p>

        {/* Auth selector toggle */}
        <div className="flex bg-surface-elevated border border-border p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setAuthMode("phone")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              authMode === "phone" ? "bg-primary text-white" : "text-text-secondary hover:text-foreground"
            }`}
          >
            <Smartphone size={14} />
            <span>Numéro (+221)</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("email")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              authMode === "email" ? "bg-primary text-white" : "text-text-secondary hover:text-foreground"
            }`}
          >
            <Mail size={14} />
            <span>E-mail</span>
          </button>
        </div>

        <form className="flex flex-col gap-4 mb-6" onSubmit={handleSubmit}>
          {authMode === "phone" ? (
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-foreground font-mono">+221</span>
              <input 
                type="tel" 
                placeholder="77 123 45 67" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full h-[52px] rounded-[14px] border border-border bg-surface pl-16 pr-4 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:font-normal"
                required
              />
            </div>
          ) : (
            <>
              <input 
                type="email" 
                placeholder="Adresse e-mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[52px] rounded-[14px] border border-border bg-surface px-4 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:font-normal"
                required
              />
              <input 
                type="password" 
                placeholder="Mot de passe" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[52px] rounded-[14px] border border-border bg-surface px-4 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:font-normal"
                required
              />
            </>
          )}
          
          <div className="flex justify-end">
            <button type="button" className="text-xs text-text-muted font-bold hover:text-primary transition-colors">Aide à la connexion ?</button>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white rounded-[14px] h-[52px] font-bold text-base shadow-sm mt-2 transition-transform active:scale-[0.98]"
          >
            Continuer
          </button>
        </form>

        <div className="relative flex items-center justify-center mb-6">
          <div className="h-px w-full bg-border absolute"></div>
          <span className="bg-background px-4 text-xs text-text-muted relative z-10 font-bold">ou se connecter via</span>
        </div>

        <div className="flex justify-center gap-4 mb-2">
          <button onClick={() => router.push('/')} className="w-16 h-12 rounded-[14px] border border-border bg-surface-elevated flex items-center justify-center shadow-sm hover:bg-surface transition-colors">
            <Apple fill="currentColor" size={20} className="text-foreground" />
          </button>
          <button onClick={() => router.push('/')} className="w-16 h-12 rounded-[14px] border border-border bg-surface-elevated flex items-center justify-center shadow-sm hover:bg-surface transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { motion } from "motion/react";
import { UtensilsCrossed } from "lucide-react";

export function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-primary flex flex-col items-center justify-center text-white"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
          <UtensilsCrossed size={48} className="text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-display font-extrabold tracking-tight leading-none">Bon</h1>
          <h1 className="text-4xl font-display font-extrabold tracking-tight leading-none">Appétit</h1>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export function FilterChip({ label, active, onClick, icon }: FilterChipProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
        active
          ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25"
          : "bg-surface-900/80 text-surface-400 border border-surface-800 hover:border-surface-600 hover:text-surface-200"
      )}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {label}
    </motion.button>
  );
}

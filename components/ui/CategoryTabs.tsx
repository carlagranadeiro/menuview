"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string | null;
  onSelect: (id: string | null) => void;
  lang: string;
}

export function CategoryTabs({ categories, activeCategory, onSelect, lang }: CategoryTabsProps) {
  const getCategoryName = (cat: Category) => {
    if (lang === "en") return cat.name_en;
    if (lang === "es") return cat.name_es;
    return cat.name;
  };

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(null)}
        className={cn(
          "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
          activeCategory === null
            ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25"
            : "bg-surface-900/80 text-surface-400 border border-surface-800 hover:border-surface-600"
        )}
      >
        Todos
      </motion.button>

      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(cat.id)}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            activeCategory === cat.id
              ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25"
              : "bg-surface-900/80 text-surface-400 border border-surface-800 hover:border-surface-600"
          )}
        >
          {getCategoryName(cat)}
        </motion.button>
      ))}
    </div>
  );
}

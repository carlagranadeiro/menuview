"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, SlidersHorizontal, Leaf, WheatOff, Star, X, Utensils } from "lucide-react";
import Link from "next/link";
import { DishCard } from "@/components/ui/DishCard";
import { CategoryTabs } from "@/components/ui/CategoryTabs";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterChip } from "@/components/ui/FilterChip";
import { Badge } from "@/components/ui/Badge";
import { getMockData } from "@/lib/data";
import { translations } from "@/lib/i18n";
import { FilterState } from "@/types";

export default function MenuPage() {
  const searchParams = useSearchParams();
  const urlLang = searchParams.get("lang") || "pt";

  const [lang, setLang] = useState(urlLang);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: null,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    popular: false,
  });

  const { restaurant, categories, dishes } = getMockData();
  const t = translations[lang as keyof typeof translations] || translations.pt;

  // Update URL when lang changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("menuview-lang", lang);
    }
  }, [lang]);

  // Filter dishes
  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      // Category filter
      if (activeCategory && dish.category_id !== activeCategory) return false;

      // Search filter
      const searchLower = search.toLowerCase();
      const nameMatch = 
        dish.name.toLowerCase().includes(searchLower) ||
        dish.name_en.toLowerCase().includes(searchLower) ||
        dish.name_es.toLowerCase().includes(searchLower);
      const descMatch = 
        dish.description.toLowerCase().includes(searchLower) ||
        dish.description_en.toLowerCase().includes(searchLower);
      if (search && !nameMatch && !descMatch) return false;

      // Dietary filters
      if (filters.vegetarian && !dish.is_vegetarian) return false;
      if (filters.vegan && !dish.is_vegan) return false;
      if (filters.glutenFree && !dish.is_gluten_free) return false;
      if (filters.popular && !dish.is_popular) return false;

      return true;
    });
  }, [dishes, activeCategory, search, filters]);

  // Group by category
  const groupedDishes = useMemo(() => {
    if (activeCategory) {
      return { [activeCategory]: filteredDishes };
    }

    const grouped: Record<string, typeof dishes> = {};
    categories.forEach((cat) => {
      grouped[cat.id] = filteredDishes.filter((d) => d.category_id === cat.id);
    });
    return grouped;
  }, [filteredDishes, activeCategory, categories]);

  const getCategoryName = (catId: string) => {
    const cat = categories.find((c) => c.id === catId);
    if (!cat) return "";
    if (lang === "en") return cat.name_en;
    if (lang === "es") return cat.name_es;
    return cat.name;
  };

  const activeFiltersCount = [
    filters.vegetarian,
    filters.vegan,
    filters.glutenFree,
    filters.popular,
  ].filter(Boolean).length;

  return (
    <main className="min-h-screen bg-surface-950">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-surface-800/50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 rounded-xl hover:bg-surface-800/50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-surface-400" />
          </Link>

          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <Utensils className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white text-sm leading-tight">{restaurant.name}</h1>
              <p className="text-[10px] text-surface-500">{t.menuDigital}</p>
            </div>
          </div>

          {/* Language selector */}
          <div className="flex gap-1">
            {["pt", "en", "es"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                  lang === l
                    ? "bg-primary-600 text-white"
                    : "text-surface-500 hover:text-surface-300"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Search */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={t.search}
        />

        {/* Categories */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
          lang={lang}
        />

        {/* Filters toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-900/80 border border-surface-800 text-surface-400 hover:text-white hover:border-surface-600 transition-all text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{t.filters}</span>
            {activeFiltersCount > 0 && (
              <Badge variant="primary" size="sm">{activeFiltersCount}</Badge>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  category: null,
                  vegetarian: false,
                  vegan: false,
                  glutenFree: false,
                  popular: false,
                })
              }
              className="text-xs text-surface-500 hover:text-primary-400 transition-colors"
            >
              {t.clearFilters}
            </button>
          )}
        </div>

        {/* Filter chips */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2"
            >
              <FilterChip
                label={t.vegetarian}
                active={filters.vegetarian}
                onClick={() => setFilters((f) => ({ ...f, vegetarian: !f.vegetarian }))}
                icon={<Leaf className="w-3.5 h-3.5" />}
              />
              <FilterChip
                label={t.vegan}
                active={filters.vegan}
                onClick={() => setFilters((f) => ({ ...f, vegan: !f.vegan }))}
                icon={<Leaf className="w-3.5 h-3.5" />}
              />
              <FilterChip
                label={t.glutenFree}
                active={filters.glutenFree}
                onClick={() => setFilters((f) => ({ ...f, glutenFree: !f.glutenFree }))}
                icon={<WheatOff className="w-3.5 h-3.5" />}
              />
              <FilterChip
                label={t.popular}
                active={filters.popular}
                onClick={() => setFilters((f) => ({ ...f, popular: !f.popular }))}
                icon={<Star className="w-3.5 h-3.5" />}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-xs text-surface-600">
          {filteredDishes.length} {filteredDishes.length === 1 ? "prato" : "pratos"}
        </p>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-900 flex items-center justify-center">
              <X className="w-8 h-8 text-surface-600" />
            </div>
            <p className="text-surface-400 font-medium">{t.noResults}</p>
            <p className="text-surface-600 text-sm mt-1">{t.tryFilters}</p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedDishes).map(([catId, catDishes]) => {
              if (catDishes.length === 0) return null;
              return (
                <section key={catId}>
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    {getCategoryName(catId)}
                    <span className="text-sm font-normal text-surface-600">
                      ({catDishes.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {catDishes.map((dish, i) => (
                      <DishCard
                        key={dish.id}
                        dish={dish}
                        lang={lang}
                        currency={restaurant.currency}
                        index={i}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-xs text-surface-700">{t.poweredBy}</p>
      </footer>
    </main>
  );
}

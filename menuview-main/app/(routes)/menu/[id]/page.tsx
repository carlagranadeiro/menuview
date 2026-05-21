"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Flame,
  Leaf,
  WheatOff,
  Star,
  AlertTriangle,
  ChevronRight,
  Share2,
  Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getMockData } from "@/lib/data";
import { translations } from "@/lib/i18n";
import { formatPrice, getLocalizedName, getLocalizedDescription } from "@/lib/utils";

export default function DishDetailPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "pt";
  const { dishes, restaurant } = getMockData();
  const [liked, setLiked] = useState(false);

  const dish = dishes.find((d) => d.id === params.id);
  const t = translations[lang as keyof typeof translations] || translations.pt;

  if (!dish) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-surface-400">Prato não encontrado</p>
          <Link
            href={`/menu?lang=${lang}`}
            className="mt-4 inline-flex items-center gap-2 text-primary-400 hover:text-primary-300"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>
        </div>
      </div>
    );
  }

  // Related dishes (same category, excluding current)
  const relatedDishes = dishes
    .filter((d) => d.category_id === dish.category_id && d.id !== dish.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-surface-950">
      {/* Hero Image */}
      <div className="relative h-[50vh] sm:h-[60vh]">
        <Image
          src={dish.image_url || "/placeholder-dish.jpg"}
          alt={getLocalizedName(dish, lang)}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/40 to-transparent" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <Link
            href={`/menu?lang=${lang}`}
            className="p-3 rounded-full glass text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-3 rounded-full glass transition-colors ${
                liked ? "text-red-400 bg-red-500/20" : "text-white hover:bg-white/20"
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
            </button>
            <button className="p-3 rounded-full glass text-white hover:bg-white/20 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {dish.is_popular && (
                <Badge variant="warning" size="md">
                  <Star className="w-3.5 h-3.5" /> Popular
                </Badge>
              )}
              {dish.is_spicy && (
                <Badge variant="danger" size="md">
                  <Flame className="w-3.5 h-3.5" /> {t.spicy}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {getLocalizedName(dish, lang)}
            </h1>

            <p className="text-2xl font-bold text-primary-400">
              {formatPrice(dish.price, restaurant.currency)}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <p className="text-surface-300 text-base leading-relaxed">
            {getLocalizedDescription(dish, lang)}
          </p>
        </motion.section>

        {/* Dietary info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {dish.is_vegetarian && (
            <Badge variant="success" size="md">
              <Leaf className="w-3.5 h-3.5" /> {t.vegetarian}
            </Badge>
          )}
          {dish.is_vegan && (
            <Badge variant="success" size="md">
              <Leaf className="w-3.5 h-3.5" /> {t.vegan}
            </Badge>
          )}
          {dish.is_gluten_free && (
            <Badge variant="primary" size="md">
              <WheatOff className="w-3.5 h-3.5" /> {t.glutenFree}
            </Badge>
          )}
        </motion.section>

        {/* Allergens */}
        {dish.allergens.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="p-4 rounded-2xl bg-amber-950/30 border border-amber-900/30"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-400 text-sm mb-1">
                  {t.allergens}
                </h3>
                <p className="text-amber-300/80 text-sm">
                  {t.contains}: {dish.allergens.join(", ")}
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Related dishes */}
        {relatedDishes.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-white mb-4">
              Também pode gostar
            </h2>
            <div className="space-y-3">
              {relatedDishes.map((related) => (
                <Link
                  key={related.id}
                  href={`/menu/${related.id}?lang=${lang}`}
                  className="flex items-center gap-4 p-3 rounded-xl bg-surface-900/50 border border-surface-800/50 hover:border-surface-700 transition-all group"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={related.image_url || "/placeholder-dish.jpg"}
                      alt={getLocalizedName(related, lang)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white group-hover:text-primary-400 transition-colors truncate">
                      {getLocalizedName(related, lang)}
                    </h3>
                    <p className="text-sm text-surface-500 line-clamp-1 mt-0.5">
                      {getLocalizedDescription(related, lang)}
                    </p>
                    <p className="text-primary-400 font-semibold mt-1">
                      {formatPrice(related.price, restaurant.currency)}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-surface-600 group-hover:text-primary-500 transition-colors" />
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Bottom spacing */}
      <div className="h-8" />
    </main>
  );
}

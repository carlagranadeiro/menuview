"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Flame, Leaf, WheatOff, Star, ChevronRight } from "lucide-react";
import { Badge } from "./Badge";
import { Dish } from "@/types";
import { formatPrice, getLocalizedName, getLocalizedDescription } from "@/lib/utils";

interface DishCardProps {
  dish: Dish;
  lang: string;
  currency: string;
  index?: number;
}

export function DishCard({ dish, lang, currency, index = 0 }: DishCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/menu/${dish.id}?lang=${lang}`}>
        <div className="group relative bg-surface-900/50 rounded-2xl overflow-hidden border border-surface-800/50 hover:border-surface-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/20">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={dish.image_url || "/placeholder-dish.jpg"}
              alt={getLocalizedName(dish, lang)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {dish.is_popular && (
                <Badge variant="warning" size="sm">
                  <Star className="w-3 h-3" /> Popular
                </Badge>
              )}
              {dish.is_spicy && (
                <Badge variant="danger" size="sm">
                  <Flame className="w-3 h-3" /> Picante
                </Badge>
              )}
            </div>

            {/* Price badge */}
            <div className="absolute bottom-3 right-3">
              <span className="px-3 py-1.5 bg-surface-950/80 backdrop-blur-sm rounded-full text-white font-bold text-sm">
                {formatPrice(dish.price, currency)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-white text-base leading-tight group-hover:text-primary-400 transition-colors">
                {getLocalizedName(dish, lang)}
              </h3>
              <ChevronRight className="w-5 h-5 text-surface-600 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
            </div>

            <p className="text-surface-500 text-sm line-clamp-2 mb-3">
              {getLocalizedDescription(dish, lang)}
            </p>

            {/* Dietary badges */}
            <div className="flex flex-wrap gap-1.5">
              {dish.is_vegetarian && (
                <Badge variant="success" size="sm">
                  <Leaf className="w-3 h-3" /> Veg
                </Badge>
              )}
              {dish.is_vegan && (
                <Badge variant="success" size="sm">
                  <Leaf className="w-3 h-3" /> Vegan
                </Badge>
              )}
              {dish.is_gluten_free && (
                <Badge variant="primary" size="sm">
                  <WheatOff className="w-3 h-3" /> GF
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

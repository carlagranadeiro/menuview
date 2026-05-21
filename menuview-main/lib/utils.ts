import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "EUR"): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}

export function getLocalizedName(
  dish: { name: string; name_en: string; name_es: string },
  lang: string
): string {
  if (lang === "en") return dish.name_en || dish.name;
  if (lang === "es") return dish.name_es || dish.name;
  return dish.name;
}

export function getLocalizedDescription(
  dish: { description: string; description_en: string; description_es: string },
  lang: string
): string {
  if (lang === "en") return dish.description_en || dish.description;
  if (lang === "es") return dish.description_es || dish.description;
  return dish.description;
}

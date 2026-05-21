export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string | null;
  cover_url: string | null;
  currency: string;
  languages: string[];
  created_at: string;
}

export interface Category {
  id: string;
  restaurant_id: string;
  name: string;
  name_en: string;
  name_es: string;
  sort_order: number;
  created_at: string;
}

export interface Dish {
  id: string;
  restaurant_id: string;
  category_id: string;
  name: string;
  name_en: string;
  name_es: string;
  description: string;
  description_en: string;
  description_es: string;
  price: number;
  image_url: string | null;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_popular: boolean;
  is_spicy: boolean;
  allergens: string[];
  sort_order: number;
  created_at: string;
}

export type Language = "pt" | "en" | "es";

export interface FilterState {
  search: string;
  category: string | null;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  popular: boolean;
}

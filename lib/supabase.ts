import { createClient } from "@supabase/supabase-js";
import { Restaurant, Category, Dish } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getRestaurantBySlug(slug: string): Promise<Restaurant | null> {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getCategories(restaurantId: string): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return data || [];
}

export async function getDishes(restaurantId: string): Promise<Dish[]> {
  const { data, error } = await supabase
    .from("dishes")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return data || [];
}

export async function getDishById(id: string): Promise<Dish | null> {
  const { data, error } = await supabase
    .from("dishes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

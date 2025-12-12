import fallbackProducts from "../../data/fallback-products.json";
import { Product } from "@/types";

type ProductSource = "api" | "fallback";

export type ProductFetchResult = {
  products: Product[];
  source: ProductSource;
  error?: string;
};

const API_BASE = "https://fakestoreapi.com";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed request: ${res.status}`);
  }
  return res.json();
}

export async function fetchProducts(): Promise<ProductFetchResult> {
  try {
    const products = await fetchJson<Product[]>(`${API_BASE}/products`);
    return { products, source: "api" };
  } catch (error) {
    console.error("Product fetch failed, using fallback", error);
    return {
      products: fallbackProducts,
      source: "fallback",
      error: "Live products unavailable, showing cached items.",
    };
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const product = await fetchJson<Product>(`${API_BASE}/products/${id}`);
    return product;
  } catch (error) {
    console.error("Product detail fetch failed, attempting fallback", error);
    const fallback = fallbackProducts.find(
      (product) => String(product.id) === id,
    );
    return fallback ?? null;
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const categories = await fetchJson<string[]>(`${API_BASE}/products/categories`);
    return categories;
  } catch (error) {
    console.error("Category fetch failed, deriving from fallback", error);
    const unique = new Set(fallbackProducts.map((product) => product.category));
    return Array.from(unique);
  }
}


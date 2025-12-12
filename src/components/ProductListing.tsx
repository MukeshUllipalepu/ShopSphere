"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";

type Props = {
  products: Product[];
  categories: string[];
  source: "api" | "fallback";
  error?: string;
};

type SortValue = "featured" | "price-asc" | "price-desc";

export function ProductListing({ products, categories, source, error }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortValue>("featured");
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") {
      list = list.filter(
        (product) => product.category.toLowerCase() === category,
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((product) => product.title.toLowerCase().includes(q));
    }
    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, category, query, sort]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const showLoadMore = filtered.length > visibleCount;

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setSort("featured");
    setVisibleCount(12);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-subtle sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">
            Curated for you
          </p>
          <h1 className="text-xl font-semibold">Product Listing</h1>
          <p className="text-sm text-brand-muted">
            {filtered.length} items • {source === "api" ? "Live data" : "Cached"}
          </p>
          {error ? (
            <p className="mt-2 text-xs text-danger">{error}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            placeholder="Search products..."
            value={query}
            aria-label="Search products"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full min-w-[220px] rounded-lg border border-border px-3 py-2 text-sm sm:w-48"
          />
          <select
            value={category}
            aria-label="Filter by category"
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-border px-3 py-2 text-sm"
          >
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={sort}
            aria-label="Sort products"
            onChange={(e) => setSort(e.target.value as SortValue)}
            className="rounded-lg border border-border px-3 py-2 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <button
            onClick={clearFilters}
            className="rounded-lg border border-border px-3 py-2 text-sm text-brand-muted hover:border-brand"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4 rounded-2xl border border-border bg-white p-4 shadow-subtle">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button className="text-xs text-brand-muted hover:text-brand" onClick={clearFilters}>
              Reset
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-brand">Search</p>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-brand">Category</p>
            <div className="space-y-2 text-sm text-brand-muted">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={category === "all"}
                  onChange={(e) => setCategory(e.target.value)}
                />
                All
              </label>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 capitalize">
                  <input
                    type="radio"
                    name="category"
                    value={cat.toLowerCase()}
                    checked={category === cat.toLowerCase()}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-brand">Sort by</p>
            <div className="space-y-2 text-sm text-brand-muted">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value="featured"
                  checked={sort === "featured"}
                  onChange={() => setSort("featured")}
                />
                Featured
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value="price-asc"
                  checked={sort === "price-asc"}
                  onChange={() => setSort("price-asc")}
                />
                Price: Low to High
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value="price-desc"
                  checked={sort === "price-desc"}
                  onChange={() => setSort("price-desc")}
                />
                Price: High to Low
              </label>
            </div>
          </div>
        </aside>

        <div className="rounded-2xl border border-border bg-white p-4 shadow-subtle">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="mt-4 text-sm text-brand-muted">
              No products matched your filters. Try resetting them.
            </p>
          ) : null}
          {showLoadMore ? (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 9)}
                className="rounded-full bg-accent px-4 py-2 font-semibold text-brand"
              >
                Load more
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}


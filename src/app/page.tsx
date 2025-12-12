import Link from "next/link";
import { ProductListing } from "@/components/ProductListing";
import { fetchCategories, fetchProducts } from "@/lib/products";

export default async function Home() {
  const [{ products, source, error }, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <div className="space-y-10">
      <section className="grid gap-6 rounded-2xl border border-border bg-white p-6 shadow-subtle lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">
            Summer 2025
          </p>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            Elevate your everyday wardrobe
          </h1>
          <p className="text-brand-muted">
            Discover curated picks across apparel, tech, and accessories.
            Filter by category, sort by price, or search for the perfect piece.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#products"
              className="rounded-full bg-accent px-4 py-2 font-semibold text-brand"
            >
              Shop now
            </Link>
            <Link
              href="/profile"
              className="rounded-full border border-border px-4 py-2 font-semibold text-brand hover:border-brand"
            >
              View profile
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface-muted p-4 shadow-inner">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-brand">Staff picks</p>
            <span className="rounded-full bg-white px-3 py-1 text-xs text-brand-muted">
              New arrivals
            </span>
          </div>
          <div className="mt-4 space-y-3 rounded-xl bg-white p-4 shadow-subtle">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {product.title}
                  </p>
                  <p className="text-xs text-brand-muted">{product.category}</p>
                </div>
                <p className="text-sm font-bold">${product.price.toFixed(2)}</p>
              </div>
            ))}
            <p className="text-xs text-brand-muted">
              Ships in 2-3 days • Free returns
            </p>
          </div>
        </div>
      </section>

      <div id="products">
        <ProductListing
          products={products}
          categories={categories}
          source={source}
          error={error}
        />
      </div>
    </div>
  );
}

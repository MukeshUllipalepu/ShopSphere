import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProductById, fetchProducts } from "@/lib/products";

type Params = {
  params: { id: string };
};

export default async function ProductPage({ params }: Params) {
  const product = await fetchProductById(params.id);
  if (!product) {
    notFound();
  }

  const related = (await fetchProducts()).products
    .filter(
      (item) =>
        item.category === product.category && String(item.id) !== params.id,
    )
    .slice(0, 3);

  return (
    <div className="space-y-10">
      <Link href="/" className="text-sm text-brand-muted hover:text-brand">
        ← Back to products
      </Link>

      <section className="grid gap-8 rounded-2xl border border-border bg-white p-6 shadow-subtle lg:grid-cols-2">
        <div className="relative h-80 rounded-xl bg-surface-muted">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">
            {product.category}
          </p>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          {product.rating ? (
            <p className="text-sm text-brand-muted">
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </p>
          ) : null}
          <p className="text-brand-muted">{product.description}</p>
          <div className="flex gap-3">
            <button className="rounded-full bg-accent px-4 py-2 font-semibold text-brand">
              Add to bag
            </button>
            <button className="rounded-full border border-border px-4 py-2 font-semibold hover:border-brand">
              Save for later
            </button>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">You may also like</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className="rounded-xl border border-border bg-white p-4 shadow-subtle hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative mb-3 h-36 rounded-lg bg-surface-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="200px"
                    className="object-contain"
                  />
                </div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-brand-muted">${item.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}


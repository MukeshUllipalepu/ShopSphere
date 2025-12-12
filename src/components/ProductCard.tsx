import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-white p-4 shadow-subtle transition hover:-translate-y-1 hover:shadow-card">
      <div className="relative mb-3 flex h-44 items-center justify-center overflow-hidden rounded-lg bg-surface-muted">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width:768px) 50vw, 240px"
          className="object-contain transition duration-300 group-hover:scale-105"
          priority={product.id < 4}
        />
      </div>
      <p className="text-xs uppercase tracking-wide text-brand-muted">
        {product.category}
      </p>
      <Link
        href={`/product/${product.id}`}
        className="mt-1 line-clamp-2 text-sm font-semibold text-brand hover:text-brand-muted"
      >
        {product.title}
      </Link>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        {product.rating ? (
          <span className="rounded-full bg-surface-muted px-2 py-1 text-xs text-brand-muted">
            ⭐ {product.rating.rate} ({product.rating.count})
          </span>
        ) : null}
      </div>
    </article>
  );
}


"use client";

import { useState } from "react";
import { useCart } from "@/components/frontend/CartContext";
import { effectivePriceCents } from "@/lib/utils/money";
import type { Product } from "@/generated/prisma/client";

export function AddToCartForm({ product, image }: { product: Product; image: string }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const price = effectivePriceCents(product);

  return (
    <div>
      <div className="product-btn">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="number"
            min={1}
            max={product.stock || 1}
            step={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          />
        </form>
        <div className="cart-btn-wrap-2">
          <a
            href="#"
            className="rr-primary-btn cart-btn"
            onClick={(e) => {
              e.preventDefault();
              if (product.stock <= 0) return;
              addItem(
                {
                  productId: product.id,
                  name: product.name,
                  slug: product.slug,
                  priceCents: price,
                  image,
                },
                qty
              );
              setAdded(true);
            }}
          >
            {product.stock <= 0 ? "Out of Stock" : "Add To Cart"}
          </a>
        </div>
      </div>
      {added && (
        <p className="mt-2">
          Added to cart. <a href="/cart">View cart</a>
        </p>
      )}
    </div>
  );
}

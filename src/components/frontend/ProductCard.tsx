"use client";

import type { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/frontend/CartContext";
import { centsToDisplay, effectivePriceCents, isOnSale, percentOff } from "@/lib/utils/money";
import type { Product } from "@/generated/prisma/client";

function firstImage(images: string): string {
  try {
    const arr = JSON.parse(images);
    return Array.isArray(arr) && arr[0] ? arr[0] : "/frontend/img/placeholder-square.svg";
  } catch {
    return "/frontend/img/placeholder-square.svg";
  }
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const image = firstImage(product.images);
  const stars = Math.round(product.rating);
  const price = effectivePriceCents(product);
  const onSale = isOnSale(product);

  function handleBuyNow(e: MouseEvent) {
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
      1
    );
    router.push("/checkout");
  }

  return (
    <div className="shop-item">
      <div className="shop-thumb">
        <div className="overlay" />
        <a href={`/shop/${product.slug}`}>
          <img src={image} alt={product.name} />
        </a>
        {product.stock <= 0 ? (
          <span className="sale">Sold Out</span>
        ) : (
          onSale && <span className="sale">-{percentOff(product)}%</span>
        )}
        <ul className="shop-list">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (product.stock > 0) {
                  addItem(
                    {
                      productId: product.id,
                      name: product.name,
                      slug: product.slug,
                      priceCents: price,
                      image,
                    },
                    1
                  );
                }
              }}
            >
              <i className="fa-regular fa-cart-shopping" />
            </a>
          </li>
          <li>
            <a href={`/shop/${product.slug}`}>
              <i className="fa-light fa-eye" />
            </a>
          </li>
        </ul>
      </div>
      <div className="shop-content">
        <span className="category">{product.category}</span>
        <h3 className="title">
          <a href={`/shop/${product.slug}`}>{product.name}</a>
        </h3>
        <div className="review-wrap">
          {product.reviewCount > 0 ? (
            <>
              <ul className="review">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i}>
                    <i className={i < stars ? "fa-solid fa-star" : "fa-light fa-star"} />
                  </li>
                ))}
              </ul>
              <span>
                ({product.rating.toFixed(1)}) · {product.reviewCount} review{product.reviewCount === 1 ? "" : "s"}
              </span>
            </>
          ) : (
            <span className="text-muted">No reviews yet</span>
          )}
        </div>
        <span className="price">
          {centsToDisplay(price)}
          {onSale && (
            <del className="ms-2 text-muted" style={{ fontSize: "0.85em", fontWeight: 400 }}>
              {centsToDisplay(product.priceCents)}
            </del>
          )}
        </span>
        <a
          href="#"
          className="rr-primary-btn buy-now-btn"
          onClick={handleBuyNow}
        >
          {product.stock <= 0 ? "Out of Stock" : "Buy Now"}
        </a>
      </div>
    </div>
  );
}

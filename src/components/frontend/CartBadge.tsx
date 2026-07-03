"use client";

import { useCart } from "@/components/frontend/CartContext";
import { centsToDisplay } from "@/lib/utils/money";

export function CartBadge() {
  const { totalCount, totalCents } = useCart();

  return (
    <a href="/cart" className="icon">
      <i className="fa-light fa-bag-shopping" />
      <span>{totalCount}</span>
      <div className="content">
        <span>Your cart,</span>
        <h5 className="number">{centsToDisplay(totalCents)}</h5>
      </div>
    </a>
  );
}

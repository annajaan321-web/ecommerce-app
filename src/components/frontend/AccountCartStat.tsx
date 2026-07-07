"use client";

import { useCart } from "@/components/frontend/CartContext";
import { centsToDisplay } from "@/lib/utils/money";

export function AccountCartStat() {
  const { totalCount, totalCents } = useCart();

  return (
    <div className="col-md-4">
      <a href="/cart" className="checkout-wrapper d-block" style={{ maxWidth: "100%" }}>
        <div className="checkout-total checkout-item" style={{ paddingLeft: 30, paddingRight: 30 }}>
          <h4 className="title">In Your Cart</h4>
          <span>
            {totalCount} item{totalCount === 1 ? "" : "s"} ({centsToDisplay(totalCents)})
          </span>
        </div>
      </a>
    </div>
  );
}

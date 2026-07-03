"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/frontend/CartContext";
import { createOrder } from "@/lib/actions/orders";
import { centsToDisplay } from "@/lib/utils/money";

export function CheckoutForm({ defaultName }: { defaultName: string }) {
  const { items, totalCents, clear } = useCart();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);

    const result = await createOrder({
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      shippingName: String(formData.get("name") || ""),
      shippingAddress: String(formData.get("address") || ""),
      shippingCity: String(formData.get("city") || ""),
      shippingPhone: String(formData.get("phone") || ""),
      deliveryType: (formData.get("deliveryType") as "COD" | "STANDARD" | "EXPRESS") || "COD",
    });

    setPending(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    if (result?.orderNumber) {
      clear();
      router.push(`/checkout/success?order=${result.orderNumber}`);
    }
  }

  return (
    <div className="row">
      <div className="col-lg-6 col-md-12">
        <div className="checkout-left">
          <h3 className="form-header">Shipping Details</h3>
          <form action={handleSubmit}>
            <div className="checkout-form-wrap">
              <div className="form-group row">
                <div className="col-md-12">
                  <div className="form-item">
                    <h4 className="form-title">Full Name*</h4>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      defaultValue={defaultName}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <div className="form-item">
                    <h4 className="form-title">Street Address*</h4>
                    <input type="text" name="address" className="form-control" required />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <div className="form-item">
                    <h4 className="form-title">Town / City*</h4>
                    <input type="text" name="city" className="form-control" required />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <div className="form-item">
                    <h4 className="form-title">Phone*</h4>
                    <input type="text" name="phone" className="form-control" required />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <div className="form-item">
                    <h4 className="form-title">Delivery Type*</h4>
                    <select name="deliveryType" className="form-control" defaultValue="COD">
                      <option value="COD">Cash on delivery</option>
                      <option value="STANDARD">Standard shipping</option>
                      <option value="EXPRESS">Express shipping</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <button
              type="submit"
              className="rr-primary-btn checkout-btn mt-3"
              disabled={pending || items.length === 0}
            >
              {pending ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
      <div className="col-lg-6 col-md-12">
        <div className="checkout-right">
          <h3 className="form-header">Your Order</h3>
          <div className="order-box">
            <div className="order-items">
              {items.map((item) => (
                <div className="order-item" key={item.productId}>
                  <div className="order-left">
                    <span className="product">
                      {item.name} × {item.quantity}
                    </span>
                  </div>
                  <div className="order-right">
                    <span className="product-amount">
                      {centsToDisplay(item.priceCents * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <div className="order-item">
                <div className="order-left">
                  <span className="total">Total</span>
                </div>
                <div className="order-right">
                  <span className="total-amount">{centsToDisplay(totalCents)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

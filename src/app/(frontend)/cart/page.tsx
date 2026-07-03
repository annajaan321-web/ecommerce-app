"use client";

import { useCart } from "@/components/frontend/CartContext";
import { PageHeader } from "@/components/frontend/PageHeader";
import { centsToDisplay } from "@/lib/utils/money";

export default function CartPage() {
  const { items, setQuantity, removeItem, totalCents } = useCart();

  return (
    <>
      <PageHeader title="Cart" />
      <section className="cart-section pt-130 pb-130">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="table-content cart-table">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th className="product-remove" />
                      <th className="cart-product-name text-center">Products</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          Your cart is empty. <a href="/shop">Continue shopping</a>
                        </td>
                      </tr>
                    )}
                    {items.map((item) => (
                      <tr key={item.productId}>
                        <td className="product-remove">
                          <button onClick={() => removeItem(item.productId)}>
                            <i className="fa-sharp fa-regular fa-xmark" />
                          </button>
                        </td>
                        <td className="product-thumbnail">
                          <a href={`/shop/${item.slug}`}>
                            <img src={item.image} alt={item.name} />
                          </a>
                          <div className="product-thumbnail">
                            <h4 className="title">{item.name}</h4>
                          </div>
                        </td>
                        <td className="product-price">
                          <span className="amount">{centsToDisplay(item.priceCents)}</span>
                        </td>
                        <td className="product-quantity">
                          <div className="quantity__group">
                            <input
                              type="number"
                              className="input-text qty text"
                              min={1}
                              max={100}
                              step={1}
                              value={item.quantity}
                              onChange={(e) =>
                                setQuantity(item.productId, Math.max(1, Number(e.target.value) || 1))
                              }
                            />
                          </div>
                        </td>
                        <td className="product-subtotal">
                          <span className="amount">
                            {centsToDisplay(item.priceCents * item.quantity)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="checkout-wrapper">
                <div className="checkout-top checkout-item item-1">
                  <h4 className="title">Cart Totals</h4>
                </div>
                <div className="checkout-total checkout-item">
                  <h4 className="title">Total</h4>
                  <span>{centsToDisplay(totalCents)}</span>
                </div>
                <div className="checkout-proceed">
                  <a
                    href={items.length > 0 ? "/checkout" : "#"}
                    className="rr-primary-btn checkout-btn"
                    aria-disabled={items.length === 0}
                  >
                    Proceed to Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

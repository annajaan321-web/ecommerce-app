import { requireUser } from "@/lib/auth/guards";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/frontend/PageHeader";
import { AccountCartStat } from "@/components/frontend/AccountCartStat";
import { centsToDisplay } from "@/lib/utils/money";

export default async function AccountPage() {
  const session = await requireUser();

  const orders = await prisma.order.findMany({
    where: { userId: session.sub },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  const totalOrders = orders.length;
  const totalSpentCents = orders.reduce((sum, o) => sum + o.totalCents, 0);

  return (
    <>
      <PageHeader title="My Account" />
      <section className="cart-section pt-100 pb-100">
        <div className="container">
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="checkout-wrapper" style={{ maxWidth: "100%" }}>
                <div className="checkout-item" style={{ paddingLeft: 30, paddingRight: 30 }}>
                  <h4 className="title">{session.name}</h4>
                  <span>{session.email}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="checkout-wrapper" style={{ maxWidth: "100%" }}>
                <div className="checkout-total checkout-item" style={{ paddingLeft: 30, paddingRight: 30 }}>
                  <h4 className="title">Total Orders</h4>
                  <span>{totalOrders}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="checkout-wrapper" style={{ maxWidth: "100%" }}>
                <div className="checkout-total checkout-item" style={{ paddingLeft: 30, paddingRight: 30 }}>
                  <h4 className="title">Total Spent</h4>
                  <span>{centsToDisplay(totalSpentCents)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-5">
            <AccountCartStat />
          </div>

          <h4 className="mb-3">Order History</h4>
          <div className="table-content cart-table">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No orders yet. <a href="/shop">Start shopping</a>
                    </td>
                  </tr>
                )}
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.orderNumber}</td>
                    <td>
                      {order.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td>{order.items.reduce((n, i) => n + i.quantity, 0)}</td>
                    <td>{centsToDisplay(order.totalCents)}</td>
                    <td>{order.fulfillmentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

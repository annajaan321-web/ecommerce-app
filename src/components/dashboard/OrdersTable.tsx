import { deleteOrder } from "@/lib/actions/orders";
import { centsToDisplay } from "@/lib/utils/money";
import type { Order, User } from "@/generated/prisma/client";

const paymentBadge: Record<string, { cls: string; icon: string }> = {
  COMPLETED: { cls: "bg-success-subtle text-success border-success-subtle", icon: "bi-check2" },
  PENDING: { cls: "bg-warning-subtle text-warning border-warning-subtle", icon: "bi-info-circle" },
  FAILED: { cls: "bg-danger-subtle text-danger border-danger-subtle", icon: "bi-x-lg" },
};

const fulfillmentBadge: Record<string, { cls: string; icon: string }> = {
  COMPLETED: { cls: "bg-primary-subtle text-primary border-primary-subtle", icon: "bi-check2-all" },
  PENDING: { cls: "bg-warning-subtle text-warning border-warning-subtle", icon: "bi-info-circle" },
};

const deliveryLabel: Record<string, string> = {
  COD: "Cash on delivery",
  STANDARD: "Standard shipping",
  EXPRESS: "Express shipping",
};

type OrderWithUser = Order & { user: User };

export function OrdersTable({ orders }: { orders: OrderWithUser[] }) {
  return (
    <div className="card mt-4">
      <div className="card-body">
        <div className="table-responsive white-space-nowrap">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Order Id</th>
                <th>Price</th>
                <th>Customer</th>
                <th>Payment Status</th>
                <th>Fulfillment</th>
                <th>Delivery Type</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-muted">
                    No orders yet.
                  </td>
                </tr>
              )}
              {orders.map((order) => {
                const payment = paymentBadge[order.paymentStatus];
                const fulfillment = fulfillmentBadge[order.fulfillmentStatus];
                return (
                  <tr key={order.id}>
                    <td>
                      <a href={`/dashboard/orders/${order.id}`}>#{order.orderNumber}</a>
                    </td>
                    <td>{centsToDisplay(order.totalCents)}</td>
                    <td>
                      <a
                        className="d-flex align-items-center gap-3"
                        href={`/dashboard/customers/${order.userId}`}
                      >
                        <p className="mb-0 customer-name fw-bold">{order.user.name}</p>
                      </a>
                    </td>
                    <td>
                      <span className={`lable-table rounded border font-text2 fw-bold ${payment.cls}`}>
                        {order.paymentStatus}
                        <i className={`bi ${payment.icon} ms-2`} />
                      </span>
                    </td>
                    <td>
                      <span className={`lable-table rounded border font-text2 fw-bold ${fulfillment.cls}`}>
                        {order.fulfillmentStatus}
                        <i className={`bi ${fulfillment.icon} ms-2`} />
                      </span>
                    </td>
                    <td>{deliveryLabel[order.deliveryType]}</td>
                    <td>
                      {order.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href={`/dashboard/orders/${order.id}`} className="btn btn-sm btn-filter">
                          <i className="bi bi-eye" />
                        </a>
                        <form action={deleteOrder}>
                          <input type="hidden" name="id" value={order.id} />
                          <button type="submit" className="btn btn-sm btn-filter text-danger">
                            <i className="bi bi-trash" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

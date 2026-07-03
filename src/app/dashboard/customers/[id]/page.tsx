import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageBreadcrumb } from "@/components/dashboard/PageBreadcrumb";
import { centsToDisplay } from "@/lib/utils/money";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await prisma.user.findUnique({
    where: { id },
    include: { orders: { orderBy: { createdAt: "desc" } } },
  });
  if (!customer) notFound();

  const totalSpent = customer.orders.reduce((sum, o) => sum + o.totalCents, 0);
  const initial = customer.name.trim().charAt(0).toUpperCase() || "U";

  return (
    <>
      <PageBreadcrumb title="Customer Details" />

      <div className="row g-4">
        <div className="col-12 col-xl-4">
          <div className="card">
            <div className="card-body text-center">
              <span
                className="rounded-circle mb-3 d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary fw-bold fs-2"
                style={{ width: 96, height: 96 }}
              >
                {initial}
              </span>
              <h5 className="mb-0">{customer.name}</h5>
              <p className="mb-0 text-muted">{customer.email}</p>
              <p className="mb-0 text-muted">{customer.location || "Location unknown"}</p>
              <hr />
              <div className="d-flex justify-content-around">
                <div>
                  <h5 className="mb-0">{customer.orders.length}</h5>
                  <p className="mb-0">Orders</p>
                </div>
                <div>
                  <h5 className="mb-0">{centsToDisplay(totalSpent)}</h5>
                  <p className="mb-0">Total Spent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-8">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">Order History</h5>
              <div className="table-responsive white-space-nowrap">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Order Id</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.orders.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-muted">
                          No orders yet.
                        </td>
                      </tr>
                    )}
                    {customer.orders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <a href={`/dashboard/orders/${order.id}`}>#{order.orderNumber}</a>
                        </td>
                        <td>{centsToDisplay(order.totalCents)}</td>
                        <td>{order.paymentStatus}</td>
                        <td>
                          {order.createdAt.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

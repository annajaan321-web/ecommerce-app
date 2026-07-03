import { centsToDisplay } from "@/lib/utils/money";
import type { Order, User } from "@/generated/prisma/client";

type CustomerWithOrders = User & { orders: Order[] };

export function CustomersTable({ customers }: { customers: CustomerWithOrders[] }) {
  return (
    <div className="card mt-4">
      <div className="card-body">
        <div className="customer-table">
          <div className="table-responsive white-space-nowrap">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Location</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted">
                      No customers yet.
                    </td>
                  </tr>
                )}
                {customers.map((customer) => {
                  const totalSpent = customer.orders.reduce((sum, o) => sum + o.totalCents, 0);
                  return (
                    <tr key={customer.id}>
                      <td>
                        <a
                          className="d-flex align-items-center gap-3"
                          href={`/dashboard/customers/${customer.id}`}
                        >
                          <p className="mb-0 customer-name fw-bold">{customer.name}</p>
                        </a>
                      </td>
                      <td>
                        <span className="font-text1">{customer.email}</span>
                      </td>
                      <td>{customer.orders.length}</td>
                      <td>{centsToDisplay(totalSpent)}</td>
                      <td>{customer.location || "-"}</td>
                      <td>
                        {customer.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

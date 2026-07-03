import { prisma } from "@/lib/db";
import { PageBreadcrumb } from "@/components/dashboard/PageBreadcrumb";
import { OrdersTable } from "@/components/dashboard/OrdersTable";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return (
    <>
      <PageBreadcrumb title="Orders" />
      <h4 className="mb-0">All Orders</h4>
      <OrdersTable orders={orders} />
    </>
  );
}

import { prisma } from "@/lib/db";
import { PageBreadcrumb } from "@/components/dashboard/PageBreadcrumb";
import { CustomersTable } from "@/components/dashboard/CustomersTable";

export default async function CustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "USER" },
    include: { orders: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageBreadcrumb title="Customers" />
      <h4 className="mb-0">All Customers</h4>
      <CustomersTable customers={customers} />
    </>
  );
}

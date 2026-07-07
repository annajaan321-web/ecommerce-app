import { prisma } from "@/lib/db";
import { PageBreadcrumb } from "@/components/dashboard/PageBreadcrumb";
import { ProductsTable } from "@/components/dashboard/ProductsTable";
import { NoticeToast } from "@/components/dashboard/NoticeToast";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string }>;
}) {
  const { notice } = await searchParams;
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <PageBreadcrumb title="Products" />
      <NoticeToast notice={notice} />

      <div className="row align-items-center">
        <div className="col">
          <h4 className="mb-0">All Products</h4>
        </div>
        <div className="col-auto">
          <a href="/dashboard/products/add" className="btn btn-primary px-4">
            <i className="bi bi-plus-lg me-2" />
            Add Product
          </a>
        </div>
      </div>

      <ProductsTable products={products} />
    </>
  );
}

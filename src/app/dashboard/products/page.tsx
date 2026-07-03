import { prisma } from "@/lib/db";
import { PageBreadcrumb } from "@/components/dashboard/PageBreadcrumb";
import { ProductsTable } from "@/components/dashboard/ProductsTable";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <PageBreadcrumb title="Products" />

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

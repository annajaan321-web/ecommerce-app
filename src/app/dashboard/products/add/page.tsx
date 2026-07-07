import { prisma } from "@/lib/db";
import { PageBreadcrumb } from "@/components/dashboard/PageBreadcrumb";
import { ProductForm } from "@/components/dashboard/ProductForm";
import { createProduct } from "@/lib/actions/products";

export default async function AddProductPage() {
  const [categoryRows, collectionRows] = await Promise.all([
    prisma.product.findMany({ distinct: ["category"], select: { category: true }, orderBy: { category: "asc" } }),
    prisma.product.findMany({
      distinct: ["collection"],
      select: { collection: true },
      where: { collection: { not: null } },
      orderBy: { collection: "asc" },
    }),
  ]);
  const categories = categoryRows.map((r) => r.category);
  const collections = collectionRows.map((r) => r.collection!).filter(Boolean);

  return (
    <>
      <PageBreadcrumb title="Add Product" />
      <ProductForm
        action={createProduct}
        submitLabel="Create Product"
        categories={categories}
        collections={collections}
      />
    </>
  );
}

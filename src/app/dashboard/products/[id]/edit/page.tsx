import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageBreadcrumb } from "@/components/dashboard/PageBreadcrumb";
import { ProductForm } from "@/components/dashboard/ProductForm";
import { updateProduct } from "@/lib/actions/products";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categoryRows, collectionRows] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.product.findMany({ distinct: ["category"], select: { category: true }, orderBy: { category: "asc" } }),
    prisma.product.findMany({
      distinct: ["collection"],
      select: { collection: true },
      where: { collection: { not: null } },
      orderBy: { collection: "asc" },
    }),
  ]);
  if (!product) notFound();

  const categories = categoryRows.map((r) => r.category);
  const collections = collectionRows.map((r) => r.collection!).filter(Boolean);
  const action = updateProduct.bind(null, product.id);

  return (
    <>
      <PageBreadcrumb title="Edit Product" />
      <ProductForm
        action={action}
        product={product}
        submitLabel="Save Changes"
        categories={categories}
        collections={collections}
      />
    </>
  );
}

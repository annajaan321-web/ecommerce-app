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
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const action = updateProduct.bind(null, product.id);

  return (
    <>
      <PageBreadcrumb title="Edit Product" />
      <ProductForm action={action} product={product} submitLabel="Save Changes" />
    </>
  );
}

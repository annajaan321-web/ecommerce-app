import { PageBreadcrumb } from "@/components/dashboard/PageBreadcrumb";
import { ProductForm } from "@/components/dashboard/ProductForm";
import { createProduct } from "@/lib/actions/products";

export default function AddProductPage() {
  return (
    <>
      <PageBreadcrumb title="Add Product" />
      <ProductForm action={createProduct} submitLabel="Create Product" />
    </>
  );
}

"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guards";
import { saveUploadedImage } from "@/lib/upload";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const ProductSchema = z.object({
  name: z.string().trim().min(2, "Product name is required."),
  description: z.string().trim().optional().default(""),
  price: z.coerce.number().positive("Price must be greater than 0."),
  category: z.string().trim().min(1, "Category is required."),
  collection: z.string().trim().optional().default(""),
  vendor: z.string().trim().optional().default(""),
  brand: z.string().trim().optional().default(""),
  color: z.string().trim().optional().default(""),
  size: z.string().trim().optional().default(""),
  tags: z.string().trim().optional().default(""),
  stock: z.coerce.number().int().min(0).default(0),
  image: z.string().trim().optional().default(""),
});

export type ProductFormState = { error?: string } | undefined;

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = ProductSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product data." };
  }

  const upload = await saveUploadedImage(formData.get("imageFile") as File | null, "products");
  if (upload.error) {
    return { error: upload.error };
  }

  const data = parsed.data;
  const image = upload.path || data.image;
  const baseSlug = slugify(data.name);
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }

  await prisma.product.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      priceCents: Math.round(data.price * 100),
      category: data.category,
      collection: data.collection,
      vendor: data.vendor,
      brand: data.brand,
      color: data.color,
      size: data.size,
      tags: data.tags,
      stock: data.stock,
      images: JSON.stringify(image ? [image] : []),
    },
  });

  revalidatePath("/dashboard/products");
  revalidatePath("/shop");
  redirect("/dashboard/products");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = ProductSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product data." };
  }

  const upload = await saveUploadedImage(formData.get("imageFile") as File | null, "products");
  if (upload.error) {
    return { error: upload.error };
  }

  const data = parsed.data;
  const image = upload.path || data.image;

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceCents: Math.round(data.price * 100),
      category: data.category,
      collection: data.collection,
      vendor: data.vendor,
      brand: data.brand,
      color: data.color,
      size: data.size,
      tags: data.tags,
      stock: data.stock,
      ...(image ? { images: JSON.stringify([image]) } : {}),
    },
  });

  revalidatePath("/dashboard/products");
  revalidatePath("/shop");
  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string") return;

  await prisma.product.delete({ where: { id } });

  revalidatePath("/dashboard/products");
  revalidatePath("/shop");
}

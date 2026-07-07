"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireUser, requireAdmin } from "@/lib/auth/guards";

export type ReviewFormState = { error?: string; success?: boolean } | undefined;

const ReviewSchema = z.object({
  productId: z.string().trim().min(1),
  productSlug: z.string().trim().min(1),
  rating: z.coerce.number().int().min(1, "Please select a rating.").max(5),
  comment: z.string().trim().min(3, "Please write a bit more in your review."),
});

export async function submitReview(
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const session = await requireUser();

  const parsed = ReviewSchema.safeParse({
    productId: formData.get("productId"),
    productSlug: formData.get("productSlug"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid review." };
  }

  const { productId, productSlug, rating, comment } = parsed.data;

  await prisma.review.upsert({
    where: { productId_userId: { productId, userId: session.sub } },
    create: { productId, userId: session.sub, rating, comment },
    update: { rating, comment },
  });

  revalidatePath(`/shop/${productSlug}`);
  return { success: true };
}

const AdminReviewSchema = z.object({
  id: z.string().trim().min(1),
  rating: z.coerce.number().int().min(1, "Please select a rating.").max(5),
  comment: z.string().trim().min(3, "Please write a bit more in the review."),
});

export async function adminUpdateReview(
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  await requireAdmin();

  const parsed = AdminReviewSchema.safeParse({
    id: formData.get("id"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid review." };
  }

  const review = await prisma.review.update({
    where: { id: parsed.data.id },
    data: { rating: parsed.data.rating, comment: parsed.data.comment },
    include: { product: { select: { slug: true } } },
  });

  revalidatePath(`/shop/${review.product.slug}`);
  revalidatePath("/dashboard/reviews");
  redirect("/dashboard/reviews?notice=updated");
}

export async function adminDeleteReview(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string") return;

  const review = await prisma.review.delete({
    where: { id },
    include: { product: { select: { slug: true } } },
  });

  revalidatePath(`/shop/${review.product.slug}`);
  revalidatePath("/dashboard/reviews");
  redirect("/dashboard/reviews?notice=deleted");
}

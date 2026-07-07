"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/guards";

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

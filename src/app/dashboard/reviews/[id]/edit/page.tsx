import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageBreadcrumb } from "@/components/dashboard/PageBreadcrumb";
import { ReviewEditForm } from "@/components/dashboard/ReviewEditForm";

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = await prisma.review.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      product: { select: { name: true } },
    },
  });
  if (!review) notFound();

  return (
    <>
      <PageBreadcrumb title="Edit Review" />
      <div className="card">
        <div className="card-body">
          <p className="mb-1">
            <strong>Customer:</strong> {review.user.name} ({review.user.email})
          </p>
          <p className="mb-3">
            <strong>Product:</strong> {review.product.name}
          </p>
          <ReviewEditForm review={review} />
        </div>
      </div>
    </>
  );
}

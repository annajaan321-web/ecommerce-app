import { prisma } from "@/lib/db";
import { PageBreadcrumb } from "@/components/dashboard/PageBreadcrumb";
import { NoticeToast } from "@/components/dashboard/NoticeToast";
import { ReviewsTable } from "@/components/dashboard/ReviewsTable";

const REVIEW_MESSAGES = {
  updated: { text: "Review updated successfully.", type: "success" as const },
  deleted: { text: "Review deleted successfully.", type: "danger" as const },
};

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; notice?: string }>;
}) {
  const { q, notice } = await searchParams;

  const reviews = await prisma.review.findMany({
    where: q ? { user: { name: { contains: q } } } : undefined,
    include: {
      user: { select: { name: true, email: true } },
      product: { select: { name: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageBreadcrumb title="Reviews" />
      <NoticeToast notice={notice} messages={REVIEW_MESSAGES} />

      <div className="row align-items-center mb-3">
        <div className="col">
          <h4 className="mb-0">All Reviews</h4>
        </div>
        <div className="col-auto">
          <form method="get" className="d-flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={q}
              className="form-control"
              placeholder="Search by username..."
            />
            <button type="submit" className="btn btn-primary px-4">
              Search
            </button>
          </form>
        </div>
      </div>

      <ReviewsTable reviews={reviews} />
    </>
  );
}

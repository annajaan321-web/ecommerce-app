import { adminDeleteReview } from "@/lib/actions/reviews";

export function ReviewsTable({
  reviews,
}: {
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    user: { name: string; email: string };
    product: { name: string; slug: string };
  }>;
}) {
  return (
    <div className="card mt-4">
      <div className="card-body">
        <div className="table-responsive white-space-nowrap">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-muted">
                    No reviews found.
                  </td>
                </tr>
              )}
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td>
                    <div className="fw-semibold">{review.user.name}</div>
                    <div className="text-muted small">{review.user.email}</div>
                  </td>
                  <td>
                    <a href={`/shop/${review.product.slug}`} target="_blank" rel="noreferrer">
                      {review.product.name}
                    </a>
                  </td>
                  <td>
                    <i className="bi bi-star-fill text-warning me-1" />
                    {review.rating}
                  </td>
                  <td style={{ maxWidth: 320, whiteSpace: "normal" }}>{review.comment}</td>
                  <td>
                    {review.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <a href={`/dashboard/reviews/${review.id}/edit`} className="btn btn-sm btn-filter">
                        <i className="bi bi-pencil" />
                      </a>
                      <form action={adminDeleteReview}>
                        <input type="hidden" name="id" value={review.id} />
                        <button type="submit" className="btn btn-sm btn-filter text-danger">
                          <i className="bi bi-trash" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

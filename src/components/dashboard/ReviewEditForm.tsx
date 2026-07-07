"use client";

import { useActionState, useState } from "react";
import { adminUpdateReview } from "@/lib/actions/reviews";

export function ReviewEditForm({ review }: { review: { id: string; rating: number; comment: string } }) {
  const [state, formAction, pending] = useActionState(adminUpdateReview, undefined);
  const [rating, setRating] = useState(review.rating);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={review.id} />
      <input type="hidden" name="rating" value={rating} />
      <div className="mb-3">
        <label className="form-label">Rating</label>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              style={{ background: "none", border: "none", padding: 2, cursor: "pointer" }}
              aria-label={`${star} star`}
            >
              <i className={star <= rating ? "bi bi-star-fill text-warning" : "bi bi-star text-muted"} />
            </button>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Comment</label>
        <textarea name="comment" className="form-control" rows={5} defaultValue={review.comment} required minLength={3} />
      </div>
      {state?.error && (
        <div className="alert alert-danger" role="alert">
          {state.error}
        </div>
      )}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

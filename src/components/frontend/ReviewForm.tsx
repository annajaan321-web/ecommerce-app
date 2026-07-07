"use client";

import { useActionState, useState } from "react";
import { submitReview } from "@/lib/actions/reviews";

export function ReviewForm({
  productId,
  productSlug,
  initialRating,
  initialComment,
}: {
  productId: string;
  productSlug: string;
  initialRating?: number;
  initialComment?: string;
}) {
  const [state, formAction, pending] = useActionState(submitReview, undefined);
  const [rating, setRating] = useState(initialRating ?? 0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="review-form-wrap">
      <h3 className="title">{initialComment ? "Update Your Review" : "Add a Review"}</h3>
      <span className="publish">Share your experience with this product.</span>
      <form action={formAction} className="review-form">
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="productSlug" value={productSlug} />
        <input type="hidden" name="rating" value={rating} />
        <div className="review-box">
          <span>Your rating *</span>
          <ul className="review">
            {[1, 2, 3, 4, 5].map((star) => (
              <li key={star}>
                <button
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                  aria-label={`${star} star`}
                >
                  <i className={star <= (hoverRating || rating) ? "fa-solid fa-star" : "fa-light fa-star"} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-3 mb-3">
          <textarea
            name="comment"
            className="form-control"
            rows={5}
            placeholder="Write your review"
            defaultValue={initialComment}
            required
            minLength={3}
          />
        </div>
        {state?.error && <p style={{ color: "#e04b4b" }}>{state.error}</p>}
        {state?.success && <p style={{ color: "#17c666" }}>Thanks! Your review has been posted.</p>}
        <div className="submit-btn">
          <button className="rr-primary-btn" type="submit" disabled={pending || rating === 0}>
            {pending ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
}

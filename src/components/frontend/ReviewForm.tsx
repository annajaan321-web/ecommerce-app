"use client";

import { useActionState, useEffect, useState } from "react";
import { submitReview } from "@/lib/actions/reviews";

export function ReviewForm({
  productId,
  productSlug,
  hasExistingReview,
}: {
  productId: string;
  productSlug: string;
  hasExistingReview?: boolean;
}) {
  const [state, formAction, pending] = useActionState(submitReview, undefined);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [ratingError, setRatingError] = useState(false);

  useEffect(() => {
    if (!state?.success) return;
    setShowToast(true);
    setRating(0);
    setComment("");
    const timer = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div className="review-form-wrap">
      <h3 className="title">Add a Review</h3>
      <span className="publish">
        {hasExistingReview
          ? "You've reviewed this product before — feel free to add another review."
          : "Share your experience with this product."}
      </span>
      <form
        action={formAction}
        className="review-form"
        onSubmit={(e) => {
          if (rating === 0) {
            e.preventDefault();
            setRatingError(true);
          }
        }}
      >
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
                  onClick={() => {
                    setRating(star);
                    setRatingError(false);
                  }}
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
        {ratingError && <p style={{ color: "#e04b4b" }}>Please select a star rating before submitting.</p>}
        <div className="mt-3 mb-3">
          <textarea
            name="comment"
            className="form-control"
            rows={5}
            placeholder="Write your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            minLength={3}
          />
        </div>
        {state?.error && <p style={{ color: "#e04b4b" }}>{state.error}</p>}
        <div className="submit-btn">
          <button className="rr-primary-btn" type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>

      {showToast && (
        <div
          className="alert alert-success d-flex align-items-center justify-content-between shadow"
          style={{ position: "fixed", top: 20, right: 20, zIndex: 2000, minWidth: 280 }}
          role="alert"
        >
          <span>Review added successfully!</span>
          <button
            type="button"
            className="btn-close ms-3"
            aria-label="Close"
            onClick={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
  );
}

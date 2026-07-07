import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { PageHeader } from "@/components/frontend/PageHeader";
import { AddToCartForm } from "@/components/frontend/AddToCartForm";
import { ProductImageZoom } from "@/components/frontend/ProductImageZoom";
import { ReviewForm } from "@/components/frontend/ReviewForm";
import { centsToDisplay, effectivePriceCents, isOnSale, percentOff } from "@/lib/utils/money";

function firstImage(images: string): string {
  try {
    const arr = JSON.parse(images);
    return Array.isArray(arr) && arr[0] ? arr[0] : "/frontend/img/placeholder-square.svg";
  } catch {
    return "/frontend/img/placeholder-square.svg";
  }
}

export default async function ShopDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, session] = await Promise.all([
    prisma.product.findUnique({ where: { slug } }),
    getSession(),
  ]);
  if (!product) notFound();

  const reviews = await prisma.review.findMany({
    where: { productId: product.id },
    include: { user: { select: { name: true, avatar: true } } },
    orderBy: { createdAt: "desc" },
  });
  const hasExistingReview = session ? reviews.some((r) => r.userId === session.sub) : false;

  const image = firstImage(product.images);
  const stars = Math.round(product.rating);
  const price = effectivePriceCents(product);
  const onSale = isOnSale(product);

  return (
    <>
      <PageHeader title={product.name} />
      <section className="shop-section single pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 product-details-wrap">
              <div className="product-slider-wrap">
                <div className="product-gallary" style={{ gridColumn: "1 / -1" }}>
                  <ProductImageZoom src={image} alt={product.name} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product-details">
                <div className="product-info">
                  <div className="product-inner">
                    <span className="category">{product.category}</span>
                    <h3 className="title">{product.name}</h3>
                    <div className="rating-wrap">
                      {product.reviewCount > 0 ? (
                        <>
                          <ul className="rating">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <li key={i}>
                                <i className={i < stars ? "fa-sharp fa-solid fa-star" : "fa-sharp fa-light fa-star"} />
                              </li>
                            ))}
                          </ul>
                          <span>
                            ({product.rating.toFixed(1)}) · {product.reviewCount} review
                            {product.reviewCount === 1 ? "" : "s"}
                          </span>
                        </>
                      ) : (
                        <span className="text-muted">No reviews yet</span>
                      )}
                    </div>
                    <h4 className="price">
                      {centsToDisplay(price)}
                      {onSale && (
                        <>
                          <del className="ms-2 text-muted" style={{ fontSize: "0.7em", fontWeight: 400 }}>
                            {centsToDisplay(product.priceCents)}
                          </del>
                          <span className="ms-2" style={{ fontSize: "0.5em", color: "var(--rr-color-theme-primary)" }}>
                            -{percentOff(product)}% OFF
                          </span>
                        </>
                      )}
                    </h4>
                    <div className="product-desc-wrap">
                      <p className="desc">{product.description || "No description available."}</p>
                    </div>
                    <div className="item-left-line">
                      <span>
                        {product.stock > 0 ? `Only ${product.stock} items left in stock!` : "Out of stock"}
                      </span>
                      <div className="line" />
                    </div>
                    <ul className="details-list">
                      <li>
                        <i className="fa-light fa-arrow-right-arrow-left" />
                        Free returns
                      </li>
                      <li>
                        <i className="fa-light fa-truck" />
                        Free shipping on orders over $65
                      </li>
                      {product.vendor && (
                        <li>
                          <i className="fa-light fa-circle-check" />
                          Sold by {product.vendor}
                        </li>
                      )}
                    </ul>
                  </div>
                  <AddToCartForm product={product} image={image} />
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5 pt-5" style={{ borderTop: "1px solid var(--rr-color-border-1)" }}>
            <div className="col-lg-7">
              <div className="reviewr-wrap">
                <h3 className="title mb-4">
                  Customer Reviews {reviews.length > 0 && <>({reviews.length})</>}
                </h3>
                {reviews.length === 0 && <p>No reviews yet. Be the first to review this product.</p>}
                <ul className="review-list" style={{ listStyle: "none", padding: 0 }}>
                  {reviews.map((review) => (
                    <li className="review-item" key={review.id}>
                      {review.user.avatar ? (
                        <img src={review.user.avatar} alt={review.user.name} />
                      ) : (
                        <img src="/frontend/img/placeholder-square.svg" alt={review.user.name} />
                      )}
                      <div className="content">
                        <div className="content-top">
                          <h4 className="name">
                            {review.user.name}
                            <span>
                              {review.createdAt.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </h4>
                          <ul>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <li key={i}>
                                <i className={i < review.rating ? "fa-solid fa-star" : "fa-light fa-star"} />
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-5">
              {session ? (
                <ReviewForm
                  productId={product.id}
                  productSlug={product.slug}
                  hasExistingReview={hasExistingReview}
                />
              ) : (
                <div className="review-form-wrap">
                  <h3 className="title">Add a Review</h3>
                  <span className="publish">
                    Please <a href="/login">log in</a> to write a review.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/frontend/PageHeader";
import { AddToCartForm } from "@/components/frontend/AddToCartForm";

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
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) notFound();

  const image = firstImage(product.images);
  const stars = Math.round(product.rating);

  return (
    <>
      <PageHeader title={product.name} />
      <section className="shop-section single pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 product-details-wrap">
              <div className="product-slider-wrap">
                <div className="product-gallary" style={{ gridColumn: "1 / -1" }}>
                  <div className="gallary-item">
                    <img src={image} alt={product.name} />
                  </div>
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
                      <ul className="rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <li key={i}>
                            <i className={i < stars ? "fa-sharp fa-solid fa-star" : "fa-sharp fa-light fa-star"} />
                          </li>
                        ))}
                      </ul>
                      <span>({product.rating.toFixed(1)})</span>
                    </div>
                    <h4 className="price">${(product.priceCents / 100).toFixed(2)}</h4>
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
        </div>
      </section>
    </>
  );
}

import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/frontend/ProductCard";

const CATEGORY_IMAGES = ["cate-1.png", "cate-2.png", "cate-3.png", "cate-4.png", "cate-5.png", "cate-6.png"];

export default async function HomePage() {
  const [products, categoryGroups] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.product.groupBy({
      by: ["category"],
      _count: { _all: true },
      orderBy: { category: "asc" },
    }),
  ]);

  const categories = categoryGroups.map((group, i) => ({
    img: CATEGORY_IMAGES[i % CATEGORY_IMAGES.length],
    name: group.category,
    count: group._count._all,
  }));

  return (
    <>
      <section className="hero-section">
        <div className="overlay" />
        <div className="hero-images">
          <div className="hero-people">
            <img src="/frontend/img/images/hero-peoples.png" alt="img" />
          </div>
          <div className="hero-shape">
            <img src="/frontend/img/shapes/hero-shape-1.png" alt="shape" />
          </div>
          <div className="hero-shape-2">
            <img src="/frontend/img/shapes/hero-shape-2.png" alt="shape" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-8" />
            <div className="col-xl-4 col-lg-12">
              <div className="hero-content">
                <h4 className="sub-title">Summer 22 women&apos;s collection</h4>
                <h2 className="title">
                  Super COLLECTION <br />
                  FOR EVERYONE
                </h2>
                <h5 className="price">
                  <span>From</span>$19.00
                </h5>
                <a href="/shop" className="rr-primary-btn">
                  View Collections
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="category-section pt-100 pb-100">
        <div className="container">
          <div className="category-top heading-space space-border">
            <div className="section-heading mb-0">
              <h2 className="section-title">Best for your categories</h2>
              <p>Explore our most popular product categories</p>
            </div>
            <div className="swiper-arrow">
              <div className="swiper-nav swiper-next">
                <i className="fa-regular fa-arrow-left" />
              </div>
              <div className="swiper-nav swiper-prev">
                <i className="fa-regular fa-arrow-right" />
              </div>
            </div>
          </div>
          <div className="category-carousel swiper">
            <div className="swiper-wrapper">
              {categories.map((cat) => (
                <div className="swiper-slide" key={cat.name}>
                  <div className="category-item">
                    <div className="category-img">
                      <img src={`/frontend/img/images/${cat.img}`} alt="category" />
                    </div>
                    <h3 className="title">
                      <a href={`/shop?category=${encodeURIComponent(cat.name)}`}>
                        {cat.name} ({cat.count})
                      </a>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination" />
          </div>
        </div>
      </section>

      <section className="fashion-section pt-0 pb-100">
        <div className="container">
          <div className="category-top heading-space space-border">
            <div className="section-heading mb-0">
              <h2 className="section-title">Featured Products</h2>
              <p>Fresh from the store, picked for you</p>
            </div>
            <div className="swiper-arrow">
              <div className="swiper-nav swiper-next">
                <i className="fa-regular fa-arrow-left" />
              </div>
              <div className="swiper-nav swiper-prev">
                <i className="fa-regular fa-arrow-right" />
              </div>
            </div>
          </div>
          <div className="shop-carousel swiper">
            <div className="swiper-wrapper">
              {products.map((product) => (
                <div className="swiper-slide" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className="swiper-pagination" />
          </div>
        </div>
      </section>

      <section className="pb-100">
        <div className="container">
          <div className="p-5 rounded-3 text-center" style={{ background: "#f6f4f1" }}>
            <h2 className="section-title mb-2">Get 30% Discount Now</h2>
            <p className="mb-4">Sign up and use code WELCOME30 at checkout.</p>
            <a href="/register" className="rr-primary-btn">
              Create an Account
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

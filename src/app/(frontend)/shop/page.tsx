import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/frontend/PageHeader";
import { ProductCard } from "@/components/frontend/ProductCard";
import { ShopSort } from "@/components/frontend/ShopSort";
import type { Prisma } from "@/generated/prisma/client";

const PRODUCTS_PER_PAGE = 10;

const SORT_MAP: Record<string, Prisma.ProductOrderByWithRelationInput> = {
  newest: { createdAt: "desc" },
  "price-asc": { priceCents: "asc" },
  "price-desc": { priceCents: "desc" },
  "name-asc": { name: "asc" },
  "name-desc": { name: "desc" },
};

function buildQuery(base: { q?: string; category?: string; sort?: string; page?: number }) {
  const params = new URLSearchParams();
  if (base.q) params.set("q", base.q);
  if (base.category) params.set("category", base.category);
  if (base.sort && base.sort !== "newest") params.set("sort", base.sort);
  if (base.page && base.page > 1) params.set("page", String(base.page));
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string; page?: string }>;
}) {
  const { q, category, sort: sortParam, page: pageParam } = await searchParams;
  const sort = sortParam && SORT_MAP[sortParam] ? sortParam : "newest";
  const page = Math.max(1, Number(pageParam) || 1);

  const where: Prisma.ProductWhereInput = {
    ...(category ? { category } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q } },
            { category: { contains: q } },
            { tags: { contains: q } },
          ],
        }
      : {}),
  };

  const [products, totalCount, categoryGroups] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: SORT_MAP[sort],
      skip: (page - 1) * PRODUCTS_PER_PAGE,
      take: PRODUCTS_PER_PAGE,
    }),
    prisma.product.count({ where }),
    prisma.product.groupBy({
      by: ["category"],
      _count: { _all: true },
      orderBy: { category: "asc" },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PRODUCTS_PER_PAGE));

  return (
    <>
      <PageHeader title="Shop" />
      <section className="shop-grid-2 pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 shop-sidebar-col">
              <div className="shop-sidebar">
                <h3 className="sidebar-header">Categories</h3>
                <ul className="sidebar-list list-2">
                  <li>
                    <a
                      className="left-item"
                      href={buildQuery({ q, sort })}
                      style={{ fontWeight: category ? 400 : 700 }}
                    >
                      <span>All</span>
                    </a>
                    <span className="number">{totalCount}</span>
                  </li>
                  {categoryGroups.map((group) => (
                    <li key={group.category}>
                      <a
                        className="left-item"
                        href={buildQuery({ q, sort, category: group.category })}
                        style={{ fontWeight: category === group.category ? 700 : 400 }}
                      >
                        <span>{group.category}</span>
                      </a>
                      <span className="number">{group._count._all}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shop-sidebar">
                <h3 className="sidebar-header">Sort By</h3>
                <ShopSort q={q} category={category} sort={sort} />
              </div>
            </div>

            <div className="col-lg-9 shop-products-col">
              {(q || category) && (
                <p className="mb-4">
                  {q && <>Search results for &quot;{q}&quot; </>}
                  {category && <>in &quot;{category}&quot; </>}({totalCount})
                </p>
              )}
              <div className="row gy-4">
                {products.length === 0 && <p>No products found.</p>}
                {products.map((product) => (
                  <div className="col-xl-4 col-lg-6 col-md-6" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <ul className="pagination-wrap mt-5">
                  {page > 1 && (
                    <li>
                      <a href={buildQuery({ q, category, sort, page: page - 1 })}>
                        <i className="fa-regular fa-arrow-left" />
                      </a>
                    </li>
                  )}
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <li key={pageNum}>
                        <a
                          href={buildQuery({ q, category, sort, page: pageNum })}
                          className={pageNum === page ? "active" : undefined}
                        >
                          {pageNum}
                        </a>
                      </li>
                    );
                  })}
                  {page < totalPages && (
                    <li>
                      <a href={buildQuery({ q, category, sort, page: page + 1 })}>
                        <i className="fa-regular fa-arrow-right" />
                      </a>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

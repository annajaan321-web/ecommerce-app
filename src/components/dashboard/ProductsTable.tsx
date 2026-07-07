import { deleteProduct } from "@/lib/actions/products";
import { centsToDisplay, effectivePriceCents, isOnSale } from "@/lib/utils/money";
import type { Product } from "@/generated/prisma/client";

function firstImage(images: string): string {
  try {
    const arr = JSON.parse(images);
    return Array.isArray(arr) && arr[0] ? arr[0] : "/frontend/img/placeholder-square.svg";
  } catch {
    return "/frontend/img/placeholder-square.svg";
  }
}

export function ProductsTable({ products }: { products: Product[] }) {
  return (
    <div className="card mt-4">
      <div className="card-body">
        <div className="product-table">
          <div className="table-responsive white-space-nowrap">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th>Vendor</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-muted">
                      No products yet.
                    </td>
                  </tr>
                )}
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div className="product-box">
                          <img src={firstImage(product.images)} width="70" className="rounded-3" alt="" />
                        </div>
                        <div className="product-info">
                          <a href={`/dashboard/products/${product.id}/edit`} className="product-title">
                            {product.name}
                          </a>
                          <p className="mb-0 product-category">Category : {product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      {isOnSale(product) ? (
                        <>
                          <span className="text-decoration-line-through text-muted me-1">
                            {centsToDisplay(product.priceCents)}
                          </span>
                          {centsToDisplay(effectivePriceCents(product))}
                        </>
                      ) : (
                        centsToDisplay(product.priceCents)
                      )}
                    </td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="product-rating">
                        <i className="bi bi-star-fill text-warning me-2" />
                        <span>{product.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td>{product.vendor || "-"}</td>
                    <td>
                      {product.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <a
                          href={`/dashboard/products/${product.id}/edit`}
                          className="btn btn-sm btn-filter"
                        >
                          <i className="bi bi-pencil" />
                        </a>
                        <form action={deleteProduct}>
                          <input type="hidden" name="id" value={product.id} />
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
    </div>
  );
}

"use client";

import { useActionState, useState } from "react";
import type { ProductFormState } from "@/lib/actions/products";
import type { Product } from "@/generated/prisma/client";

const COLOR_OPTIONS = ["Black", "White", "Red", "Blue", "Green", "Grey", "Beige"];
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
const COLLECTION_OPTIONS = [
  "New Arrivals",
  "Best Sellers",
  "Summer Collection",
  "Winter Collection",
  "Trending Now",
  "Limited Edition",
  "Sale",
  "Featured",
];
const CUSTOM_VALUE = "__custom__";

function SelectOrCustom({
  name,
  label,
  options,
  defaultValue,
  required,
}: {
  name: string;
  label: string;
  options: string[];
  defaultValue?: string | null;
  required?: boolean;
}) {
  const startsCustom = !!defaultValue && !options.includes(defaultValue);
  const [isCustom, setIsCustom] = useState(startsCustom);

  return (
    <div>
      <label className="form-label">{label}</label>
      <select
        className="form-control"
        value={isCustom ? CUSTOM_VALUE : (defaultValue ?? "")}
        onChange={(e) => setIsCustom(e.target.value === CUSTOM_VALUE)}
        {...(isCustom ? {} : { name, required })}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
        <option value={CUSTOM_VALUE}>Other (type your own)</option>
      </select>
      {isCustom && (
        <input
          type="text"
          name={name}
          className="form-control mt-2"
          placeholder={`Enter ${label.toLowerCase()}`}
          defaultValue={startsCustom ? (defaultValue ?? "") : ""}
          required={required}
          autoFocus
        />
      )}
    </div>
  );
}

export function ProductForm({
  action,
  product,
  submitLabel,
  categories = [],
  collections = [],
}: {
  action: (prevState: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  product?: Product;
  submitLabel: string;
  categories?: string[];
  collections?: string[];
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const currentImage = product ? (JSON.parse(product.images)[0] ?? "") : "";
  const collectionOptions = Array.from(new Set([...COLLECTION_OPTIONS, ...collections])).sort();

  return (
    <form action={formAction}>
      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">General Information</h5>
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  defaultValue={product?.name}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows={4}
                  defaultValue={product?.description}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Product Image</label>
                {currentImage && (
                  <div className="mb-2">
                    <img
                      src={currentImage}
                      alt="Current product"
                      style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }}
                    />
                  </div>
                )}
                <input type="file" name="imageFile" accept="image/*" className="form-control" />
                <div className="form-text">Upload an image, or paste a URL below instead. Uploading a file takes priority.</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL (optional)</label>
                <input
                  type="text"
                  name="image"
                  className="form-control"
                  placeholder="/frontend/img/placeholder-square.svg"
                  defaultValue={currentImage}
                />
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h5 className="mb-3">Pricing &amp; Inventory</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Price (USD)</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    className="form-control"
                    defaultValue={product ? (product.priceCents / 100).toFixed(2) : ""}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    min="0"
                    className="form-control"
                    defaultValue={product?.stock ?? 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">Organize</h5>
              <div className="mb-3">
                <SelectOrCustom
                  name="category"
                  label="Category"
                  options={categories}
                  defaultValue={product?.category}
                  required
                />
              </div>
              <div className="mb-3">
                <SelectOrCustom
                  name="collection"
                  label="Collection"
                  options={collectionOptions}
                  defaultValue={product?.collection}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Vendor</label>
                <input type="text" name="vendor" className="form-control" defaultValue={product?.vendor ?? ""} />
              </div>
              <div className="mb-3">
                <label className="form-label">Brand</label>
                <input type="text" name="brand" className="form-control" defaultValue={product?.brand ?? ""} />
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <SelectOrCustom name="color" label="Color" options={COLOR_OPTIONS} defaultValue={product?.color} />
                </div>
                <div className="col-6">
                  <SelectOrCustom name="size" label="Size" options={SIZE_OPTIONS} defaultValue={product?.size} />
                </div>
              </div>
              <div className="mb-3 mt-3">
                <label className="form-label">Tags (comma separated)</label>
                <input type="text" name="tags" className="form-control" defaultValue={product?.tags ?? ""} />
              </div>
            </div>
          </div>

          {state?.error && (
            <div className="alert alert-danger mt-4" role="alert">
              {state.error}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mt-4" disabled={pending}>
            {pending ? "Saving..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useEffect, useRef } from "react";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export function ShopSort({ q, category, sort }: { q?: string; category?: string; sort: string }) {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    function navigate(value: string) {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (category) params.set("category", category);
      params.set("sort", value);
      window.location.href = `/shop?${params.toString()}`;
    }

    let cancelled = false;
    let jq: { off: (event: string) => void } | undefined;

    // The "Sort By" select is re-skinned by the nice-select jQuery plugin,
    // which changes its value via jQuery's event system rather than a real
    // native DOM "change" event, so React's onChange never fires for it.
    function bindJquery() {
      if (cancelled) return;
      const $ = (window as unknown as { jQuery?: JQueryStatic }).jQuery;
      if (!$ || !selectRef.current) {
        setTimeout(bindJquery, 50);
        return;
      }
      const $select = $(selectRef.current);
      $select.on("change.shopSort", function (this: HTMLSelectElement) {
        navigate(this.value);
      });
      jq = $select;
    }
    bindJquery();

    return () => {
      cancelled = true;
      jq?.off("change.shopSort");
    };
  }, [q, category]);

  return (
    <select className="form-control" defaultValue={sort} ref={selectRef}>
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

type JQueryStatic = (selector: unknown) => {
  on: (event: string, handler: (this: HTMLSelectElement) => void) => void;
  off: (event: string) => void;
};

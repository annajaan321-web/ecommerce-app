export function centsToDisplay(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function effectivePriceCents(product: { priceCents: number; discountPercent: number }): number {
  if (!product.discountPercent) return product.priceCents;
  return Math.round(product.priceCents * (1 - product.discountPercent / 100));
}

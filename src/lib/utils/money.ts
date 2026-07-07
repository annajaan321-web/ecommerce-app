export function centsToDisplay(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function effectivePriceCents(product: {
  priceCents: number;
  salePriceCents?: number | null;
  discountPercent: number;
}): number {
  if (product.salePriceCents != null && product.salePriceCents < product.priceCents) {
    return product.salePriceCents;
  }
  if (product.discountPercent) {
    return Math.round(product.priceCents * (1 - product.discountPercent / 100));
  }
  return product.priceCents;
}

export function isOnSale(product: {
  priceCents: number;
  salePriceCents?: number | null;
  discountPercent: number;
}): boolean {
  return (product.salePriceCents != null && product.salePriceCents < product.priceCents) || product.discountPercent > 0;
}

export function percentOff(product: {
  priceCents: number;
  salePriceCents?: number | null;
  discountPercent: number;
}): number {
  if (!isOnSale(product)) return 0;
  const price = effectivePriceCents(product);
  return Math.round((1 - price / product.priceCents) * 100);
}

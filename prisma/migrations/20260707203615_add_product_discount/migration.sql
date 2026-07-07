-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "priceCents" INTEGER NOT NULL,
    "discountPercent" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "collection" TEXT,
    "vendor" TEXT,
    "brand" TEXT,
    "sku" TEXT,
    "color" TEXT,
    "size" TEXT,
    "tags" TEXT NOT NULL DEFAULT '',
    "rating" REAL NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "images" TEXT NOT NULL DEFAULT '[]',
    "shippingType" TEXT NOT NULL DEFAULT 'ADMIN',
    "isFragile" BOOLEAN NOT NULL DEFAULT false,
    "isBiodegradable" BOOLEAN NOT NULL DEFAULT false,
    "isFrozen" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("brand", "category", "collection", "color", "createdAt", "description", "id", "images", "isBiodegradable", "isFragile", "isFrozen", "name", "priceCents", "rating", "shippingType", "size", "sku", "slug", "stock", "tags", "updatedAt", "vendor") SELECT "brand", "category", "collection", "color", "createdAt", "description", "id", "images", "isBiodegradable", "isFragile", "isFrozen", "name", "priceCents", "rating", "shippingType", "size", "sku", "slug", "stock", "tags", "updatedAt", "vendor" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
CREATE INDEX "Product_category_idx" ON "Product"("category");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

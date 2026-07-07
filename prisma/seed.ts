import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const ADMIN_EMAIL = "annajaan321@gmail.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "Admin123!";

const PRODUCTS = [
  {
    name: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    description: "A timeless denim jacket, comfortable and durable for everyday wear.",
    priceCents: 7900,
    category: "Fashion",
    vendor: "Roiser",
    brand: "Roiser",
    sku: "SKU-1001",
    color: "Blue",
    size: "M",
    tags: "denim,jacket,fashion",
    rating: 0,
    stock: 24,
    images: JSON.stringify(["/frontend/img/placeholder-square.svg"]),
  },
  {
    name: "Leather Ankle Boots",
    slug: "leather-ankle-boots",
    description: "Premium leather ankle boots with a comfortable fit.",
    priceCents: 12900,
    category: "Fashion",
    vendor: "Roiser",
    brand: "Roiser",
    sku: "SKU-1002",
    color: "Brown",
    size: "42",
    tags: "boots,leather,shoes",
    rating: 0,
    stock: 15,
    images: JSON.stringify(["/frontend/img/placeholder-square.svg"]),
  },
  {
    name: "Cotton Graphic T-Shirt",
    slug: "cotton-graphic-tshirt",
    description: "Soft 100% cotton t-shirt with a modern graphic print.",
    priceCents: 2500,
    category: "Fashion",
    vendor: "Roiser",
    brand: "Roiser",
    sku: "SKU-1003",
    color: "Black",
    size: "L",
    tags: "t-shirt,cotton,casual",
    rating: 0,
    stock: 50,
    images: JSON.stringify(["/frontend/img/placeholder-square.svg"]),
  },
  {
    name: "Wool Blend Overcoat",
    slug: "wool-blend-overcoat",
    description: "Elegant wool blend overcoat, perfect for colder days.",
    priceCents: 18900,
    category: "Fashion",
    vendor: "Roiser",
    brand: "Roiser",
    sku: "SKU-1004",
    color: "Grey",
    size: "XL",
    tags: "coat,wool,winter",
    rating: 0,
    stock: 10,
    images: JSON.stringify(["/frontend/img/placeholder-square.svg"]),
  },
  {
    name: "Slim Fit Chino Pants",
    slug: "slim-fit-chino-pants",
    description: "Versatile slim fit chinos suitable for casual and formal looks.",
    priceCents: 5400,
    category: "Fashion",
    vendor: "Roiser",
    brand: "Roiser",
    sku: "SKU-1005",
    color: "Khaki",
    size: "32",
    tags: "pants,chino,casual",
    rating: 0,
    stock: 30,
    images: JSON.stringify(["/frontend/img/placeholder-square.svg"]),
  },
  {
    name: "Canvas Tote Bag",
    slug: "canvas-tote-bag",
    description: "Durable canvas tote bag, great for daily errands.",
    priceCents: 3200,
    category: "Accessories",
    vendor: "Roiser",
    brand: "Roiser",
    sku: "SKU-1006",
    color: "Beige",
    size: "One Size",
    tags: "bag,tote,canvas",
    rating: 0,
    stock: 40,
    images: JSON.stringify(["/frontend/img/placeholder-square.svg"]),
  },
  {
    name: "Aviator Sunglasses",
    slug: "aviator-sunglasses",
    description: "Classic aviator sunglasses with UV protection.",
    priceCents: 4600,
    category: "Accessories",
    vendor: "Roiser",
    brand: "Roiser",
    sku: "SKU-1007",
    color: "Gold",
    size: "One Size",
    tags: "sunglasses,accessories",
    rating: 0,
    stock: 22,
    images: JSON.stringify(["/frontend/img/placeholder-square.svg"]),
  },
  {
    name: "Merino Wool Beanie",
    slug: "merino-wool-beanie",
    description: "Warm merino wool beanie for cold weather.",
    priceCents: 1900,
    category: "Accessories",
    vendor: "Roiser",
    brand: "Roiser",
    sku: "SKU-1008",
    color: "Navy",
    size: "One Size",
    tags: "beanie,wool,winter",
    rating: 0,
    stock: 35,
    images: JSON.stringify(["/frontend/img/placeholder-square.svg"]),
  },
];

async function main() {
  const adminPasswordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: {
      name: "Admin",
      email: ADMIN_EMAIL,
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      location: "Head Office",
    },
  });

  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  const customerPasswordHash = await bcrypt.hash("Customer123!", 10);
  const customer = await prisma.user.upsert({
    where: { email: "sara.customer@example.com" },
    update: {},
    create: {
      name: "Sara Ahmed",
      email: "sara.customer@example.com",
      passwordHash: customerPasswordHash,
      role: "USER",
      location: "Karachi, Pakistan",
    },
  });

  const firstProduct = await prisma.product.findUnique({
    where: { slug: PRODUCTS[0].slug },
  });
  const secondProduct = await prisma.product.findUnique({
    where: { slug: PRODUCTS[1].slug },
  });

  if (firstProduct && secondProduct) {
    const existingOrder = await prisma.order.findUnique({
      where: { orderNumber: "ORD-000001" },
    });

    if (!existingOrder) {
      await prisma.order.create({
        data: {
          orderNumber: "ORD-000001",
          userId: customer.id,
          totalCents: firstProduct.priceCents + secondProduct.priceCents * 2,
          paymentStatus: "COMPLETED",
          fulfillmentStatus: "COMPLETED",
          deliveryType: "STANDARD",
          shippingName: customer.name,
          shippingAddress: "123 Main Street",
          shippingCity: "Karachi",
          shippingPhone: "+92 300 1234567",
          items: {
            create: [
              {
                productId: firstProduct.id,
                quantity: 1,
                unitPriceCents: firstProduct.priceCents,
              },
              {
                productId: secondProduct.id,
                quantity: 2,
                unitPriceCents: secondProduct.priceCents,
              },
            ],
          },
        },
      });
    }
  }

  console.log("Seed complete.");
  console.log(`Admin login -> email: ${ADMIN_EMAIL}  password: ${ADMIN_PASSWORD}`);
  console.log(`Sample customer login -> email: sara.customer@example.com  password: Customer123!`);
  console.log(`Admin user id: ${admin.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin, requireUser } from "@/lib/auth/guards";

const StatusSchema = z.object({
  orderId: z.string().min(1),
  paymentStatus: z.enum(["PENDING", "COMPLETED", "FAILED"]).optional(),
  fulfillmentStatus: z.enum(["PENDING", "COMPLETED"]).optional(),
});

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();

  const parsed = StatusSchema.safeParse({
    orderId: formData.get("orderId"),
    paymentStatus: formData.get("paymentStatus") || undefined,
    fulfillmentStatus: formData.get("fulfillmentStatus") || undefined,
  });
  if (!parsed.success) return;

  const { orderId, paymentStatus, fulfillmentStatus } = parsed.data;

  await prisma.order.update({
    where: { id: orderId },
    data: {
      ...(paymentStatus ? { paymentStatus } : {}),
      ...(fulfillmentStatus ? { fulfillmentStatus } : {}),
    },
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
  revalidatePath("/dashboard/orders");
}

export async function deleteOrder(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string") return;

  await prisma.order.delete({ where: { id } });

  revalidatePath("/dashboard/orders");
  redirect("/dashboard/orders");
}

const CheckoutItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
});

const CheckoutSchema = z.object({
  items: z.array(CheckoutItemSchema).min(1, "Your cart is empty."),
  shippingName: z.string().trim().min(1, "Name is required."),
  shippingAddress: z.string().trim().min(1, "Address is required."),
  shippingCity: z.string().trim().min(1, "City is required."),
  shippingPhone: z.string().trim().min(1, "Phone is required."),
  deliveryType: z.enum(["COD", "STANDARD", "EXPRESS"]).default("COD"),
});

export type CheckoutInput = z.infer<typeof CheckoutSchema>;
export type CheckoutState = { error?: string; orderNumber?: string } | undefined;

export async function createOrder(input: CheckoutInput): Promise<CheckoutState> {
  const session = await requireUser();

  const parsed = CheckoutSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid checkout data." };
  }

  const { items, shippingName, shippingAddress, shippingCity, shippingPhone, deliveryType } =
    parsed.data;

  try {
    const orderNumber = await prisma.$transaction(async (tx) => {
      let totalCents = 0;
      const orderItemsData: {
        productId: string;
        quantity: number;
        unitPriceCents: number;
      }[] = [];

      for (const item of items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        if (!product) throw new Error(`Product not found.`);
        if (product.stock < item.quantity) {
          throw new Error(`${product.name} is out of stock.`);
        }
        totalCents += product.priceCents * item.quantity;
        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          unitPriceCents: product.priceCents,
        });
        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: item.quantity } },
        });
      }

      const orderCount = await tx.order.count();
      const orderNumber = `ORD-${String(orderCount + 1).padStart(6, "0")}`;

      await tx.order.create({
        data: {
          orderNumber,
          userId: session.sub,
          totalCents,
          deliveryType,
          shippingName,
          shippingAddress,
          shippingCity,
          shippingPhone,
          items: { create: orderItemsData },
        },
      });

      return orderNumber;
    });

    revalidatePath("/dashboard/orders");
    revalidatePath("/dashboard/products");
    revalidatePath("/shop");

    return { orderNumber };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Checkout failed." };
  }
}

export async function createOrderAndRedirect(input: CheckoutInput) {
  const result = await createOrder(input);
  if (result?.orderNumber) {
    redirect(`/checkout/success?order=${result.orderNumber}`);
  }
  return result;
}

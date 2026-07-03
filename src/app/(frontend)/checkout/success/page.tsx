import { PageHeader } from "@/components/frontend/PageHeader";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <>
      <PageHeader title="Order Confirmed" />
      <section className="pt-100 pb-100">
        <div className="container text-center">
          <h2 className="mb-3">Thank you for your order!</h2>
          {order && (
            <p className="mb-4">
              Your order number is <strong>{order}</strong>. We&apos;ll contact you soon to confirm delivery.
            </p>
          )}
          <a href="/shop" className="rr-primary-btn">
            Continue Shopping
          </a>
        </div>
      </section>
    </>
  );
}

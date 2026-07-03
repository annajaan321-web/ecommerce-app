import { requireUser } from "@/lib/auth/guards";
import { PageHeader } from "@/components/frontend/PageHeader";
import { CheckoutForm } from "@/components/frontend/CheckoutForm";

export default async function CheckoutPage() {
  const session = await requireUser();

  return (
    <>
      <PageHeader title="Checkout" />
      <section className="checkout-section pt-100 pb-100">
        <div className="container">
          <CheckoutForm defaultName={session.name} />
        </div>
      </section>
    </>
  );
}

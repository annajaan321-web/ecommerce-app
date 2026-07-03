import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageBreadcrumb } from "@/components/dashboard/PageBreadcrumb";
import { PrintButton } from "@/components/dashboard/PrintButton";
import { OrderStatusForm } from "@/components/dashboard/OrderStatusForm";
import { deleteOrder } from "@/lib/actions/orders";
import { centsToDisplay } from "@/lib/utils/money";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { user: true, items: { include: { product: true } } },
  });
  if (!order) notFound();

  return (
    <>
      <PageBreadcrumb title="Invoice" />

      <div className="card radius-10">
        <div className="card-header py-3">
          <div className="row align-items-center g-3">
            <div className="col-12 col-lg-6">
              <h5 className="mb-0">Roiser Store</h5>
            </div>
            <div className="col-12 col-lg-6 text-md-end">
              <PrintButton />
              <form action={deleteOrder} className="d-inline-block ms-2">
                <input type="hidden" name="id" value={order.id} />
                <button type="submit" className="btn btn-danger">
                  <i className="bi bi-trash me-1" />
                  Delete Order
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="card-header py-2">
          <div className="row row-cols-1 row-cols-lg-3">
            <div className="col">
              <small>From</small>
              <address className="m-t-5 m-b-5">
                <strong>Roiser Store</strong>
                <br />
                123 Commerce Street
                <br />
                Karachi, Pakistan
              </address>
            </div>
            <div className="col">
              <small>To</small>
              <address className="m-t-5 m-b-5">
                <strong>{order.shippingName}</strong>
                <br />
                {order.shippingAddress}
                <br />
                {order.shippingCity}
                <br />
                Phone: {order.shippingPhone}
              </address>
            </div>
            <div className="col">
              <small>Invoice</small>
              <div>
                <b>{order.createdAt.toLocaleDateString("en-US", { dateStyle: "long" })}</b>
              </div>
              <div className="invoice-detail">
                #{order.orderNumber}
                <br />
                Customer: {order.user.name} ({order.user.email})
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-invoice">
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th className="text-center">PRICE</th>
                  <th className="text-center">QTY</th>
                  <th className="text-end">LINE TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product.name}</td>
                    <td className="text-center">{centsToDisplay(item.unitPriceCents)}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end">
                      {centsToDisplay(item.unitPriceCents * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row bg-light align-items-center m-0">
            <div className="col bg-primary col-auto p-4 ms-auto">
              <p className="mb-0 text-white">TOTAL</p>
              <h4 className="mb-0 text-white">{centsToDisplay(order.totalCents)}</h4>
            </div>
          </div>

          <hr />

          <OrderStatusForm
            orderId={order.id}
            paymentStatus={order.paymentStatus}
            fulfillmentStatus={order.fulfillmentStatus}
          />
        </div>
      </div>
    </>
  );
}

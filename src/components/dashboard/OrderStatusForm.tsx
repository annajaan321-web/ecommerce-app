"use client";

import { updateOrderStatus } from "@/lib/actions/orders";

export function OrderStatusForm({
  orderId,
  paymentStatus,
  fulfillmentStatus,
}: {
  orderId: string;
  paymentStatus: string;
  fulfillmentStatus: string;
}) {
  return (
    <div className="d-flex gap-3 flex-wrap">
      <form action={updateOrderStatus} className="d-flex align-items-center gap-2">
        <input type="hidden" name="orderId" value={orderId} />
        <label className="mb-0 small">Payment</label>
        <select name="paymentStatus" defaultValue={paymentStatus} className="form-select form-select-sm">
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
          <option value="FAILED">Failed</option>
        </select>
        <button type="submit" className="btn btn-sm btn-primary">
          Update
        </button>
      </form>
      <form action={updateOrderStatus} className="d-flex align-items-center gap-2">
        <input type="hidden" name="orderId" value={orderId} />
        <label className="mb-0 small">Fulfillment</label>
        <select
          name="fulfillmentStatus"
          defaultValue={fulfillmentStatus}
          className="form-select form-select-sm"
        >
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button type="submit" className="btn btn-sm btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

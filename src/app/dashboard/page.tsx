import { prisma } from "@/lib/db";
import { PageBreadcrumb } from "@/components/dashboard/PageBreadcrumb";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { SparklineChart } from "@/components/dashboard/SparklineChart";
import { RadialChart } from "@/components/dashboard/RadialChart";
import { centsToDisplay } from "@/lib/utils/money";

export default async function DashboardPage() {
  const [
    totalOrders,
    totalCustomers,
    totalProducts,
    inStockProducts,
    revenueAgg,
    recentOrders,
    allOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.product.count(),
    prisma.product.count({ where: { stock: { gt: 0 } } }),
    prisma.order.aggregate({ _sum: { totalCents: true } }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 6, include: { user: true } }),
    prisma.order.findMany({ select: { totalCents: true, createdAt: true } }),
  ]);

  const totalSalesCents = revenueAgg._sum.totalCents ?? 0;

  // last 7 days revenue, for the weekly sales sparkline
  const today = new Date();
  const dayKeys: string[] = [];
  const dayTotals = new Map<string, number>();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    dayKeys.push(key);
    dayTotals.set(key, 0);
  }
  for (const order of allOrders) {
    const key = order.createdAt.toISOString().slice(0, 10);
    if (dayTotals.has(key)) dayTotals.set(key, (dayTotals.get(key) ?? 0) + order.totalCents / 100);
  }
  const weeklySalesData = dayKeys.map((k) => dayTotals.get(k) ?? 0);
  const thisWeekTotal = weeklySalesData.reduce((a, b) => a + b, 0);
  const firstHalf = weeklySalesData.slice(0, 3).reduce((a, b) => a + b, 0);
  const secondHalf = weeklySalesData.slice(4).reduce((a, b) => a + b, 0);
  const trendUp = secondHalf >= firstHalf;

  // last 6 months revenue, for the big chart
  const monthly = new Map<string, number>();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    monthly.set(d.toLocaleString("en-US", { month: "short" }), 0);
  }
  for (const order of allOrders) {
    const key = order.createdAt.toLocaleString("en-US", { month: "short" });
    if (monthly.has(key)) monthly.set(key, (monthly.get(key) ?? 0) + order.totalCents / 100);
  }
  const categories = Array.from(monthly.keys());
  const monthlyData = Array.from(monthly.values());

  const stockHealthPct = totalProducts > 0 ? Math.round((inStockProducts / totalProducts) * 100) : 0;
  const newCustomersThisMonth = await prisma.user.count({
    where: {
      role: "USER",
      createdAt: { gte: new Date(today.getFullYear(), today.getMonth(), 1) },
    },
  });
  const customerGrowthPct =
    totalCustomers > 0 ? Math.round((newCustomersThisMonth / totalCustomers) * 100) : 0;

  const iconStats = [
    { icon: "shopping_cart", color: "primary", value: totalOrders, label: "Orders" },
    { icon: "payments", color: "success", value: centsToDisplay(totalSalesCents), label: "Income" },
    { icon: "groups", color: "info", value: totalCustomers, label: "Customers" },
    { icon: "inventory_2", color: "danger", value: totalProducts, label: "Products" },
  ];

  return (
    <>
      <PageBreadcrumb title="eCommerce" />

      <div className="row">
        <div className="col-12 col-xl-4 d-flex">
          <div className="card rounded-4 w-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-2">
                <h2 className="mb-0">{centsToDisplay(thisWeekTotal * 100)}</h2>
                <p
                  className={`dash-lable d-flex align-items-center gap-1 rounded mb-0 bg-opacity-10 ${
                    trendUp ? "bg-success text-success" : "bg-danger text-danger"
                  }`}
                >
                  <span className="material-icons-outlined fs-6">
                    {trendUp ? "arrow_upward" : "arrow_downward"}
                  </span>
                </p>
              </div>
              <p className="mb-0">This Week&apos;s Sales</p>
              <SparklineChart data={weeklySalesData} color="#5b73e8" />
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-8 d-flex">
          <div className="card rounded-4 w-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-around flex-wrap gap-4 p-4">
                {iconStats.map((stat, i) => (
                  <div key={stat.label} className="d-flex align-items-center gap-4">
                    <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                      <a
                        href="#"
                        className={`mb-2 wh-48 bg-${stat.color} bg-opacity-10 text-${stat.color} rounded-circle d-flex align-items-center justify-content-center`}
                      >
                        <i className="material-icons-outlined">{stat.icon}</i>
                      </a>
                      <h3 className="mb-0">{stat.value}</h3>
                      <p className="mb-0">{stat.label}</p>
                    </div>
                    {i < iconStats.length - 1 && <div className="vr" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-xl-5 col-xxl-4 d-flex">
          <div className="card rounded-4 w-100 shadow-none bg-transparent border-0">
            <div className="card-body p-0">
              <div className="row g-4">
                <div className="col-12 col-xl-6 d-flex">
                  <div className="card mb-0 rounded-4 w-100">
                    <div className="card-body">
                      <div className="d-flex align-items-start justify-content-between mb-3">
                        <div>
                          <h4 className="mb-0">{customerGrowthPct}%</h4>
                          <p className="mb-0">New Customers</p>
                        </div>
                      </div>
                      <div className="chart-container2">
                        <RadialChart value={customerGrowthPct} label="New" color="#5b73e8" />
                      </div>
                      <div className="text-center">
                        <p className="mb-0">{newCustomersThisMonth} this month</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6 d-flex">
                  <div className="card mb-0 rounded-4 w-100">
                    <div className="card-body">
                      <div className="d-flex align-items-start justify-content-between mb-1">
                        <div>
                          <h4 className="mb-0">{stockHealthPct}%</h4>
                          <p className="mb-0">Stock Health</p>
                        </div>
                      </div>
                      <div className="chart-container2">
                        <RadialChart value={stockHealthPct} label="In Stock" color="#17c666" />
                      </div>
                      <div className="text-center">
                        <p className="mb-0">
                          {inStockProducts} of {totalProducts} products in stock
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-12">
                  <div className="card rounded-4 mb-0">
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <h2 className="mb-0">{centsToDisplay(totalSalesCents)}</h2>
                      </div>
                      <p className="mb-0">Total Revenue (all time)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-7 col-xxl-8 d-flex">
          <div className="card rounded-4 w-100">
            <div className="card-body">
              <h5 className="mb-3">Revenue (last 6 months)</h5>
              <RevenueChart categories={categories} data={monthlyData} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card rounded-4 w-100">
            <div className="card-body">
              <h5 className="mb-3">Recent Orders</h5>
              <div className="table-responsive white-space-nowrap">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Order Id</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-muted">
                          No orders yet.
                        </td>
                      </tr>
                    )}
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <a href={`/dashboard/orders/${order.id}`}>#{order.orderNumber}</a>
                        </td>
                        <td>{order.user.name}</td>
                        <td>{centsToDisplay(order.totalCents)}</td>
                        <td>
                          {order.createdAt.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

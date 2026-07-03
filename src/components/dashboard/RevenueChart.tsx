"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function RevenueChart({
  categories,
  data,
}: {
  categories: string[];
  data: number[];
}) {
  const options: ApexOptions = {
    chart: { toolbar: { show: false }, sparkline: { enabled: false } },
    stroke: { curve: "smooth", width: 3 },
    xaxis: { categories },
    dataLabels: { enabled: false },
    colors: ["#5b73e8"],
    grid: { strokeDashArray: 4 },
  };

  return (
    <Chart
      options={options}
      series={[{ name: "Revenue", data }]}
      type="area"
      height={280}
    />
  );
}

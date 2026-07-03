"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function SparklineChart({
  data,
  color = "#5b73e8",
  type = "area",
  height = 60,
}: {
  data: number[];
  color?: string;
  type?: "area" | "bar" | "line";
  height?: number;
}) {
  const options: ApexOptions = {
    chart: { sparkline: { enabled: true } },
    stroke: { curve: "smooth", width: 2 },
    fill: { opacity: 0.3, type: type === "area" ? "gradient" : "solid" },
    colors: [color],
    tooltip: { enabled: false },
  };

  return <Chart options={options} series={[{ data }]} type={type} height={height} />;
}

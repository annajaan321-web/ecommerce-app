"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function RadialChart({
  value,
  label,
  color = "#5b73e8",
  height = 180,
}: {
  value: number;
  label: string;
  color?: string;
  height?: number;
}) {
  const options: ApexOptions = {
    chart: { sparkline: { enabled: true } },
    colors: [color],
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        dataLabels: {
          show: true,
          value: { fontSize: "16px", fontWeight: 700 },
          name: { show: false },
        },
      },
    },
    labels: [label],
  };

  return <Chart options={options} series={[value]} type="radialBar" height={height} />;
}

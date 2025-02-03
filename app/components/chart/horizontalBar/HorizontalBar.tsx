"use client";

import React from "react";
import scss from "./HorizontalBar.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/app/components/dataChart";
import { darkOptions } from "../../dataChart/theme";

const getRandomColors = (count: any) => {
  const colors = [];
  const step = Math.floor(360 / count); // ระยะห่างเฉดสีในวงล้อ
  for (let i = 0; i < count; i++) {
    const hue = (i * step) % 360; // กระจายเฉดสีในวงล้อ
    const saturation = 40 + Math.random() * 20; // ความอิ่มตัว (70-90%)
    const lightness = 50 + Math.random() * 10; // ความสว่าง (80-90%)
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`); // สร้างสีในรูปแบบ HSL
  }
  // สุ่มลำดับสีในอาร์เรย์
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]]; // สลับตำแหน่ง
  }
  return colors;
};

const chartOptions = {
  plugins: {
    legend: {
      display: false, // ซ่อน legend
    },
  },
  scales: {
    ...darkOptions!.scales,
    x: {
      ...darkOptions!.scales!.x,
      title: {
        color: "#ffffff",
        display: true, // แสดง title ของ x-axis
        text: "Number of Attacks", // กำหนด title ของ x-axis จาก props
      },
    },
  },
  responsive: true,
  indexAxis: "y" as "y", // กำหนดเป็น "y" เพื่อให้กราฟเป็นแนวนอน
};

export default function HorizontalBar({ top }: { top: any[] }) {
  const horizontalChartData = {
    labels: top.map((protocol) => protocol.name),
    datasets: [
      {
        label: "Attacks",
        data: top.map((protocol) => protocol._sum ? protocol._sum.count : protocol.count),
        fill: false,
        backgroundColor: getRandomColors(7),
        tension: 0.1,
      },
    ],
  };

  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className="block justify-center px-4 py-2 w-[calc(100%-0.1rem)] bg-[#171d28]  border-[2px] border-gray-900 md:flex">
        <div className={scss.chart}>
          <Typography>Honeypot Attacks Bar(Protocol)</Typography>
          <DataChart
            type={"bar"}
            data={horizontalChartData}
            options={chartOptions}
          />
        </div>
      </Paper>
    </Grid>
  );
}

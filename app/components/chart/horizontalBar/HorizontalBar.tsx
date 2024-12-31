"use client";

import React from "react";
import scss from "./HorizontalBar.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/app/components/dataChart";

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
    x: {
      title: {
        display: true, // แสดง label สำหรับแกน Y
        text: "Number of Attacks", // ข้อความกำกับแกน Y
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
        label: "Protocol",
        data: top.map((protocol) => protocol.count),
        fill: false,
        backgroundColor: getRandomColors(7),
        tension: 0.1,
      },
    ],
  };

  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className={scss.transactions}>
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

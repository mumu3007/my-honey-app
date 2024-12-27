"use client";

import React from "react";
// import scss from "./BarChart.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/app/components/dataChart";
// import { barChartData } from "@/app/components/mockData";
import scss from "./BarChart.module.scss";

export type BarChartProps = {
  cowrie_atk: number,
  dionaea_atk: number,
};

export type BarChart2Props = {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      backgroundColor: string[];
    }[];
  };
  header: string;
};

export default function BarChart({ chartData, header }: BarChart2Props) {

  const truncatedLabels = chartData.labels.map((label) =>
    label.length > 7 ? `${label.slice(0, 7)}..` : label
  );

  const chartOptions = {
    plugins: {
      legend: {
        display: false, // ซ่อน legend
      },
      tooltip: {
        callbacks: {
          // สำหรับ title ใน tooltip ให้แสดงชื่อเต็มๆ
          title: function (context: any) {
            // ใช้ข้อมูลจาก labels แบบเต็มๆ
            return chartData.labels[context[0].dataIndex];
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true, // แสดง label สำหรับแกน Y
          text: "Number of Attacks", // ข้อความกำกับแกน Y
        },
      },
    },
  };

  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className={scss.transactions}>
        <div className={scss.chart}>
          <Typography>{header}</Typography>
          <DataChart
            type={"bar"}
            data={{ ...chartData, labels: truncatedLabels }}
            options={chartOptions}
          />
        </div>
      </Paper>
    </Grid>
  );
}

"use client";

import React from "react";
// import scss from "./BarChart.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { display, useTheme } from "@mui/system";
import DataChart from "@/app/components/dataChart";
// import { barChartData } from "@/app/components/mockData";
import scss from "./BarChart.module.scss";
import { darkOptions } from "../../dataChart/theme";

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
    ...darkOptions,
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
      ...darkOptions!.scales,
      y: {
        ...darkOptions!.scales!.y,
        title: {
          color: "#ffffff",
          display: true, // แสดง title ของ x-axis
          text: "Number of Attacks", // กำหนด title ของ x-axis จาก props
        },
      },
    },
  };

  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className="block justify-center px-4 py-2 w-full gap-1 bg-[#171d28] border-[2px] border-gray-900 md:flex ">
        <div className="max-w-[100%] w-full">
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

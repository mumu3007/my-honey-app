import React from "react";
import scss from "./LineChart.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/app/components/dataChart";
import { months } from "@/app/helper/Util";
import { darkOptions } from "../../dataChart/theme";

export type LineChartProps = {
  cowrie: [];
  dionaea: [];
};

export default function LineChart({honeypot, cowrie, dionaea}: {honeypot: any[]; cowrie: any[]; dionaea: any[];}) {

  const latestHoneypots = honeypot.slice(-5);

  const lineChartData = {
    labels: latestHoneypots.map(
      (i) => i.createdAt.split("T")[1]?.split("Z")[0]
    ),
    datasets: [
      {
        label: "Cowrie",
        data: ["Low", "High","Medium", "Low", "Medium"], // ใช้ข้อมูลเป็นสตริง
        fill: false,
        borderColor: "#4c72b8",
        tension: 0.1,
      },
      {
        label: "Dionaea",
        data: ["High", "Low", "Medium", "High", "Low"], // ใช้ข้อมูลเป็นสตริง
        fill: false,
        borderColor: "#b04859",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      ...darkOptions!.scales,
      y: {
        ...darkOptions!.scales!.y,
        type: "category", // ใช้ category scale สำหรับแกน Y
        labels: ["High", "Medium", "Low"], // กำหนดหมวดหมู่ในแกน Y
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#ffffff",
          usePointStyle: true, // ใช้สัญลักษณ์แบบวงกลม
          pointStyle: "line", // ระบุให้เป็นวงกลม
          pointWidth: "2px",
        },
      },
    },
  };

  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className="block justify-center px-4 py-2 w-full bg-[#171d28]  border-[2px] border-gray-900 md:flex">
        <div className={scss.chart}>
          <Typography>Honeypot Attacks Histogram</Typography>
          <DataChart
            type={"line"}
            data={lineChartData}
            options={chartOptions}
          />
        </div>
      </Paper>
    </Grid>
  );
}

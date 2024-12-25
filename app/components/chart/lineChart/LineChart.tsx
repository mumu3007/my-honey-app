import React from "react";
import scss from "./LineChart.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/app/components/dataChart";
import { months } from "@/app/helper/Util";

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
      y: {
        type: "category", // ใช้ category scale สำหรับแกน Y
        labels: ["High", "Medium", "Low"], // กำหนดหมวดหมู่ในแกน Y
      },
    },
  };

  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className={scss.transactions}>
        <div className={scss.chart}>
          <Typography>Honeypot Attacks Histogram</Typography>
          <DataChart type={"line"} data={lineChartData} options={chartOptions} />
        </div>
      </Paper>
    </Grid>
  );
}

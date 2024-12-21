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

export default function BarChart(props: BarChartProps) {
  const { cowrie_atk, dionaea_atk } = props;

  const barChartData = {
    labels: ["cowrie", "dionaea"],
    datasets: [
      {
        label: "Attacks",
        data: [cowrie_atk, dionaea_atk],
        fill: false,
        backgroundColor: ["#5bc271", "#8062D6"],
      },
    ],
  };
  
  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className={scss.transactions}>
        <div className={scss.chart}>
          <Typography>Honeypot Attacks Bar</Typography>
          <DataChart type={"bar"} data={barChartData} />
        </div>
      </Paper>
    </Grid>
  );
}

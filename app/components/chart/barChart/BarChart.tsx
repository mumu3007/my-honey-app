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
  header: string
};

export default function BarChart({ chartData,header }: BarChart2Props) {

  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className={scss.transactions}>
        <div className={scss.chart}>
          <Typography>{header}</Typography>
          <DataChart type={"bar"} data={chartData} />
        </div>
      </Paper>
    </Grid>
  );
}

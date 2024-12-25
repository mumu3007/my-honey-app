"use client";

import React from "react";
import scss from "./HorizontalBar.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataCard from "@/app/components/chart/dataCard/DataCard";
import DataChart from "@/app/components/dataChart";
import {
  optionsHorizontal,
} from "@/app/components/mockData";


export type HorizontalBarProps = {
  prop: []
};

export default function HorizontalBar({ top }: { top: any[] }) {
  const horizontalChartData = {
    labels: top.map((protocol) => protocol.name),
    datasets: [
      {
        label: "Protocol",
        data: top.map((protocol) => protocol.count),
        fill: false,
        backgroundColor: [
          "#b18a56",
          "#b04859",
          "#9847b4",
          "#4c72b8",
          "#6cbc64",
        ],
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
            options={optionsHorizontal}
          />
        </div>
      </Paper>
    </Grid>
  );
}

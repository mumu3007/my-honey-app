"use client";

import React from "react";
import scss from "./HorizontalBar.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataCard from "@/app/components/chart/dataCard/DataCard";
import DataChart from "@/app/components/dataChart";
import {
  barChartData,
  horizontalChartData,
  optionsHorizontal,
} from "@/app/components/mockData";

export default function HorizontalBar() {
  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className={scss.transactions}>
        <div className={scss.chart}>
          <Typography>Honeypot Attacks Bar(Horizontal)</Typography>
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

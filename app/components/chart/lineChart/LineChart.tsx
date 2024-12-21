import React from "react";
import scss from "./LineChart.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/app/components/dataChart";
import { lineChartData } from "@/app/components/mockData";

export type TransactionCardType = {
  title: string;
  value: string;
  changeValue: string;
};

export default function LineChart() {
  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className={scss.transactions}>
        <div className={scss.chart}>
          <Typography>Honeypot Attacks Histogram</Typography>
          <DataChart type={"line"} data={lineChartData} />
        </div>
      </Paper>
    </Grid>
  );
}

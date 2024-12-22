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
        data: [74, 40, 90, 68, 62],
        fill: false,
        borderColor: "#4c72b8",
        tension: 0.1,
      },
      {
        label: "Dionaea",
        data: [66, 50, 75, 44, 90],
        fill: false,
        borderColor: "#b04859",
        tension: 0.1,
      },
    ],
  };

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

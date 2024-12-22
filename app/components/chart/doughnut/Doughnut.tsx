"use client";

import React from "react";
// import scss from "./BarChart.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/app/components/dataChart";
import {
  optionsDoughnut,
  doughnutChartData1,
  doughnutChartData2,
  doughnutChartData3,
  doughnutChartData4,
} from "@/app/components/mockData";
import scss from "./Doughnut.module.scss";

export type DoughnutProps = {
  cowrie_atk: number;
  dionaea_atk: number;
  country: string[];
  honeypot: any[];
};

export default function Doughnut(props: DoughnutProps) {

  const { cowrie_atk, dionaea_atk, country, honeypot } = props;

  const doughnutChartData1 = {
    labels: ["Cowrie", "Dioneae"],
    datasets: [
      {
        label: "Attacks",
        data: [cowrie_atk, dionaea_atk],
        backgroundColor: ["#55ad59", "#3f6296"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutChartData2 = {
    labels: country,
    datasets: [
      {
        label: "Attacks",
        data: [
          honeypot.filter((i) => i.ip_attacker == "25.48.0.1").length,
          honeypot.filter((i) => i.ip_attacker == "24.48.0.1").length,
          honeypot.filter((i) => i.ip_attacker == "26.48.0.1").length,
          honeypot.filter((i) => i.ip_attacker == "27.48.0.1").length,
          honeypot.filter((i) => i.ip_attacker == "49.48.0.1").length,
        ],
        backgroundColor: [
          "#b18a56",
          "#4c72b8",
          "#b04859",
          "#6cbc64",
          "#9847b4",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Grid container className={scss.bottomRow}>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Attacks By Honeypots</p>
          <DataChart
            type={"doughnut"}
            data={doughnutChartData1}
            options={optionsDoughnut}
          />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Attacks By Country</p>
          <DataChart
            type={"doughnut"}
            data={doughnutChartData2}
            options={optionsDoughnut}
          />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Attacks By Destination Port</p>
          <DataChart
            type={"doughnut"}
            data={doughnutChartData3}
            options={optionsDoughnut}
          />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Top Attacker's Username </p>
          <DataChart
            type={"doughnut"}
            data={doughnutChartData4}
            options={optionsDoughnut}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

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

export default function Doughnut() {
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

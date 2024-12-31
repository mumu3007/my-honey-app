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
  country: any[];
  honeypot: any[];
};

const getRandomColors = (count: any) => {
  const colors = [];
  const step = Math.floor(360 / count); // ระยะห่างเฉดสีในวงล้อ
  for (let i = 0; i < count; i++) {
    const hue = (i * step) % 360; // กระจายเฉดสีในวงล้อ
    const saturation = 40 + Math.random() * 20; // ความอิ่มตัว (70-90%)
    const lightness = 50 + Math.random() * 10; // ความสว่าง (80-90%)
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`); // สร้างสีในรูปแบบ HSL
  }
  // สุ่มลำดับสีในอาร์เรย์
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]]; // สลับตำแหน่ง
  }
  return colors;
};

export default function Doughnut(props: DoughnutProps) {

  const { cowrie_atk, dionaea_atk, country, honeypot } = props;

  const doughnutChartData1 = {
    labels: ["Cowrie", "Dioneae"],
    datasets: [
      {
        label: "Attacks",
        data: [cowrie_atk, dionaea_atk],
        backgroundColor: getRandomColors(7),
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutChartData2 = {
    labels: country.map((i) => i.country),
    datasets: [
      {
        label: "Attacks",
        data: country.map((i) => i.totalCount),
        backgroundColor: getRandomColors(6),
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

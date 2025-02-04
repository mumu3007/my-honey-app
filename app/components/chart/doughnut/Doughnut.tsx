"use client";

import React from "react";
// import scss from "./BarChart.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/app/components/dataChart";
import {
  optionsDoughnut,
  doughnutChartData3,
  doughnutChartData4,
} from "@/app/components/mockData";
import scss from "./Doughnut.module.scss";

export type DoughnutProps = {
  cowrie_atk: number;
  dionaea_atk: number;
  country: any[];
  username: any[];
  port: any[];
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

  const { cowrie_atk, dionaea_atk, country, username, port } = props;

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
    labels: country.map((i) =>
      i.country.length > 8 ? i.countryCode : i.country ),
    datasets: [
      {
        label: "Attacks",
        data: country.map((i) => i.totalCount),
        backgroundColor: getRandomColors(7),
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const optionsDoughnut2 = {
    responsive: true,
    cutout: "65%", // ปรับช่องตรงกลาง (ค่าคือเปอร์เซ็นต์ของเส้นผ่านศูนย์กลาง)
    plugins: {
      legend: {
        position: "right" as "right", // เปลี่ยนตำแหน่ง Labels ("top", "left", "right", "bottom")
        display: true,
        labels: {
          color: "#ffffff",
          usePointStyle: true, // ใช้สัญลักษณ์แบบวงกลม
          pointStyle: "circle", // ระบุให้เป็นวงกลม
          boxWidth: 7, // ขนาดของวงกลม (ค่าเริ่มต้นคือ 40)
          boxHeight: 7, // ความสูงของวงกลม
        },
      },
      tooltip: {
        callbacks: {
          // สำหรับ title ใน tooltip ให้แสดงชื่อเต็มๆ
          title: function (context: any) {
            // ใช้ข้อมูลจาก labels แบบเต็มๆ
            const dataIndex = context[0].dataIndex;
            return country[dataIndex].country;
          },
        },
      },
    },
  };

  const doughnutChartData3 = {
    labels: port.map((i) => i.destinationPort),
    datasets: [
      {
        label: "Attacks",
        data: port.map((i) => i.totalCount),
        backgroundColor: getRandomColors(7),
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };
  
  const doughnutChartData4 = {
    labels: username.map((i) => i.username),
    datasets: [
      {
        label: "Attacks",
        data: username.map((i) => i.totalCount),
        backgroundColor: getRandomColors(7),
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <Grid>
        <Paper className="relative top-0  w-[calc(100%-0.1rem)] p-2 pl-6  bg-[#171d28] border-[2px] border-gray-900">
          <p className="p-2 px-4 m-0">Attacks By Honeypots</p>
          <DataChart
            type={"doughnut"}
            data={doughnutChartData1}
            options={optionsDoughnut}
          />
        </Paper>
      </Grid>
      <Grid>
        <Paper className="relative top-0  w-[calc(100%-0.1rem)] p-2 pl-6 bg-[#171d28] border-[2px] border-gray-900">
          <p className="left-0 p-2 px-4 m-0">Attacks By Country</p>
          <DataChart
            type={"doughnut"}
            data={doughnutChartData2}
            options={optionsDoughnut2}
          />
        </Paper>
      </Grid>
      <Grid>
        <Paper className="relative top-0  w-[calc(100%-0.1rem)] p-2 pl-6 bg-[#171d28] border-[2px] border-gray-900">
          <p className="p-2 px-4 m-0">Attacks By Destination Port</p>
          <DataChart
            type={"doughnut"}
            data={doughnutChartData3}
            options={optionsDoughnut}
          />
        </Paper>
      </Grid>
      <Grid>
        <Paper className="relative top-0  w-[calc(100%-0.1rem)] p-2 pl-6 bg-[#171d28] border-[2px] border-gray-900">
          <p className="p-2 px-4 m-0">Top Attacker's Username </p>
          <DataChart
            type={"doughnut"}
            data={doughnutChartData4}
            options={optionsDoughnut}
          />
        </Paper>
      </Grid>
    </>
  );
}

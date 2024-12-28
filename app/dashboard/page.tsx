"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BarChart from "../components/chart/barChart/BarChart";
import { Box, Grid } from "@mui/material";
import HorizontalBar from "../components/chart/horizontalBar/HorizontalBar";
import LineChart from "../components/chart/lineChart/LineChart";
import scss from "./Dashboard.module.scss";
import DataCard from "../components/chart/dataCard/DataCard";
import Doughnut from "../components/chart/doughnut/Doughnut";
import { Username } from "../interfaces/username";
import { Password } from "../interfaces/password";
import { Country } from "../interfaces/country";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Dashboard = () => {
  const router = useRouter();
  const [honeypot, setHoneypot] = useState<any>([]);
  const [cowrie, setCowrie] = useState([]);
  const [dionaea, setDionaea] = useState([]);
  const [top, setTop] = useState([]);
  const [topCountry, setTopCountry] = useState<Country[]>([]);
  const [topUser, setTopUser] = useState<Username[]>([]);
  const [topPass, setTopPass] = useState<Password[]>([]);;
  const [country, setCountry] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPosts();
    };

    fetchData();
  }, []);

  const fetchPosts = async () => {
    try {
      const getHoneypot = await axios.get("/api/honeypots");
      const getCowrie = await axios.get("/api/honeypots/cowrie");
      const getDionaea = await axios.get("/api/honeypots/dionaea");
      const getTop = await axios.get("/api/honeypots/protocols/top");
      const getTopUser = await axios.get("/api/honeypots/username/top");
      const getTopPass = await axios.get("/api/honeypots/password/top");
      const getTopCountry = await axios.get("/api/honeypots/country/top");

      setHoneypot(getHoneypot.data);
      setCowrie(getCowrie.data);
      setDionaea(getDionaea.data);
      setTop(getTop.data);
      setTopUser(getTopUser.data);
      setTopPass(getTopPass.data);
      setTopCountry(getTopCountry.data);

      console.log(getTopCountry.data);
    } catch (error) {
      console.error(error);
    }
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
  // const fetchCountry = async () => {
  //   try {
  //     console.log(honeypot)
  //     // เรียกใช้ข้อมูล country สำหรับแต่ละ honeypot โดยใช้ ip_attacker
  //     // const country = await axios.get(`http://ip-api.com/json/$`);
  //     // return country.data; // คืนค่าผลลัพธ์จากแต่ละ ip
  //   } catch (error) {
  //     console.error("Error fetching country data:", error);
  //   }
  // };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="px-24 py-12">
        <Box>
          {/* <div>{country?.country}</div> */}
          <Grid container gap={2} marginTop={0}>
            <Grid container gap={5} className={scss.dataRibbon}>
              <Grid>
                <DataCard
                  title={"Cowrie-Attacks"}
                  value={cowrie.length}
                  description={"Number of Cowrie attack"}
                />
              </Grid>
              <Grid>
                <DataCard
                  title={"Dionaea-Attacks"}
                  value={dionaea.length}
                  description={"Number of Dionaea attack"}
                />
              </Grid>
            </Grid>

            <Grid container className={scss.forChart}>
              <HorizontalBar top={top} />
              <LineChart
                honeypot={honeypot}
                cowrie={cowrie}
                dionaea={dionaea}
              />
              <BarChart
                header="Honeypot Attacks Bar"
                chartData={{
                  labels: ["cowrie", "dionaea"], // กำหนด labels
                  datasets: [
                    {
                      label: "Attacks",
                      data: [cowrie.length, dionaea.length], // กรณีที่ใช้ข้อมูล cowrie
                      fill: false,
                      backgroundColor: ["#5bc271", "#8062D6"], // กำหนดสี
                    },
                  ],
                }}
              />
            </Grid>

            <Doughnut
              cowrie_atk={cowrie.length}
              dionaea_atk={dionaea.length}
              country={topCountry}
              honeypot={honeypot}
            />

            <Grid container className={scss.forChart2}>
              <Grid item xs={12}>
                <BarChart
                  header="Top Username"
                  chartData={{
                    labels: topUser.map((i) => i.username),
                    datasets: [
                      {
                        label: "Attacks",
                        data: topUser.map((i) => i.count), // ตัวอย่างกราฟที่ 1
                        fill: false,
                        backgroundColor: getRandomColors(8),
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <BarChart
                  header="Top Password"
                  chartData={{
                    labels: topPass.map((i) => i.password), // กรณีข้อมูล honeypot ที่ต่างกัน
                    datasets: [
                      {
                        label: "Attacks",
                        data: topPass.map((i) => i.count), // ตัวอย่างกราฟที่ 2
                        fill: false,
                        backgroundColor: getRandomColors(8),
                      },
                    ],
                  }}
                  />
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid container gap={2} className={scss.topCardsContainer}>
                    <Grid>
                        <Paper className={scss.dataCard}>xs=4</Paper>
                    </Grid>
                    <Grid>
                        <Paper className={scss.dataCard}>xs=4</Paper>
                    </Grid>
                    <Grid>
                        <Paper className={scss.dataCard}>xs=4</Paper>
                    </Grid>
                </Grid>
                <Grid xs={12} marginY={2}>
                    <Paper className={scss.dataCard}>xs=8</Paper>
                </Grid> */}
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;

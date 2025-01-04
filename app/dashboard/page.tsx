"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BarChart from "../components/chart/barChart/barChart";
import { Box, Grid, Paper } from "@mui/material";
import HorizontalBar from "../components/chart/horizontalBar/horizontalBar";
import LineChart from "../components/chart/lineChart/lineChart";
import scss from "./Dashboard.module.scss";
import DataCard from "../components/chart/dataCard/dataCard";
import Doughnut from "../components/chart/doughnut/doughnut";
import { Username } from "../interfaces/username";
import { Password } from "../interfaces/password";
import { Country } from "../interfaces/country";
import { Port } from "../interfaces/port";
import { useSession } from "next-auth/react";
import { Honeypots } from "../interfaces/honeypots";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Dashboard = () => {
  const { data: session, status } = useSession();
  // console.log("session", session);
  // console.log("status", status);
  const router = useRouter();
  const [attacks, setAttacks] = useState<any>([]);
  const [cowrie, setCowrie] = useState([]);
  const [dionaea, setDionaea] = useState([]);
  const [top, setTop] = useState([]);
  const [topCountry, setTopCountry] = useState<Country[]>([]);
  const [topUser, setTopUser] = useState<Username[]>([]);
  const [topUsername, setTopUsername] = useState<Username[]>([]);
  const [topPort, setTopPort] = useState<Port[]>([]);
  const [topPass, setTopPass] = useState<Password[]>([]);
  const [honeypots, setHoneypots] = useState<Honeypots[]>([]);


  useEffect(() => {
    console.log("UseEffect Worked!!!")
    if (status === "unauthenticated") {
      router.push("/");
    } else {
      fetchPosts();
    }
  }, [router, status]);

  const fetchPosts = async () => {
    try {
      const getAttacks = await axios.get("/api/attacks");
      const getCowrie = await axios.get("/api/attacks/cowrie");
      const getDionaea = await axios.get("/api/attacks/dionaea");
      const getTop = await axios.get("/api/attacks/protocols/top");
      const getTopUser = await axios.get("/api/attacks/username/top");
      const getTopUsername = await axios.get("/api/attacks/username/top5");
      const getTopPort = await axios.get("/api/attacks/port/top5");
      const getTopPass = await axios.get("/api/attacks/password/top");
      const getTopCountry = await axios.get("/api/attacks/country/top");
      const getHoneypots = await axios.get("/api/honeypots")

      setAttacks(getAttacks.data);
      setCowrie(getCowrie.data);
      setDionaea(getDionaea.data);
      setTop(getTop.data);
      setTopUser(getTopUser.data);
      setTopUsername(getTopUsername.data);
      setTopPort(getTopPort.data);
      setTopPass(getTopPass.data);
      setTopCountry(getTopCountry.data);
      setHoneypots(getHoneypots.data);

      console.log(getHoneypots.data);
       console.log("fetch Work!!!");
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

  return (
    status === "authenticated" &&
    session.user && (
      <ThemeProvider theme={darkTheme}>
        <div className="px-24 py-8">
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
                  attacks={attacks}
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
                        backgroundColor: getRandomColors(2), // กำหนดสี
                      },
                    ],
                  }}
                />
              </Grid>

              <Doughnut
                cowrie_atk={cowrie.length}
                dionaea_atk={dionaea.length}
                country={topCountry}
                attacks={attacks}
                port={topPort}
                username={topUsername}
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

            <Paper>{honeypots.map((i) => i.user.name)}</Paper>
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
    )
  );
};

export default Dashboard;

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
  const [topUser, setTopUser] = useState<Username[]>([]);
  const [topPass, setTopPass] = useState<Password[]>([]);;
  const [country, setCountry] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPosts(); // รอให้ fetchPosts เสร็จ
      //  fetchCountry(); // จากนั้นค่อยทำ fetchCountry
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


      setHoneypot(getHoneypot.data);
      setCowrie(getCowrie.data);
      setDionaea(getDionaea.data);
      setTop(getTop.data);
      setTopUser(getTopUser.data);
      setTopPass(getTopPass.data);
      console.log(getTopUser.data);

      // const uniqueCountries: string[] = []; // อาเรย์สำหรับเก็บประเทศที่ไม่ซ้ำกัน

      // const countryResults = await Promise.all(
      //   honeypot.data.map(async (i: any) => {
      //     const ip = i.ip_attacker;
      //     if (ip) {
      //       const countryResponse = await axios.get(
      //         `http://ip-api.com/json/${ip}`
      //       );
      //       const country = countryResponse.data.country;

      //       // ตรวจสอบว่าประเทศนี้มีอยู่ในอาเรย์หรือยัง
      //       if (!uniqueCountries.includes(country)) {
      //         uniqueCountries.push(country); // ถ้ายังไม่มี ให้เพิ่มเข้าไป
      //       }
      //       return country;
      //     } else {
      //       console.warn(`No IP address found for honeypot item:`, i);
      //       return null; // ถ้าไม่มี IP ให้คืนค่า null
      //     }
      //   })
      // );

      // setCountry(uniqueCountries); // เซ็ตประเทศที่ไม่ซ้ำกันใน state
      // console.log("Unique Country Array:", uniqueCountries);
    } catch (error) {
      console.error(error);
    }
  };

  const getRandomColors = (count: any) => {
     const colors = [];
     for (let i = 0; i < count; i++) {
       const hue = Math.floor(Math.random() * 360); // สุ่มเฉดสี (0-360 องศาในวงล้อสี)
       const saturation = 40 + Math.random() * 20; // ความอิ่มตัว (70-90%)
       const lightness = 50 + Math.random() * 10; // ความสว่าง (80-90%)
       colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
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
              country={country}
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

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BarChart from "../components/chart/barChart/barChart";
import { Box, Grid, Paper } from "@mui/material";
import HorizontalBar from "../components/chart/horizontalBar/horizontalBar";
import scss from "./dashboard.module.scss";
import DataCard from "../components/chart/dataCard/dataCard";
import Doughnut from "../components/chart/doughnut/doughnut";
import { Username } from "../interfaces/username";
import { Password } from "../interfaces/password";
import { Country } from "../interfaces/country";
import { Port } from "../interfaces/port";
import { useSession, getSession } from "next-auth/react";
import { Honeypots } from "../interfaces/honeypots";
import { Attacks } from "../interfaces/attacks";
import GeoChart from "../components/chart/geoChart/geoChart";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Dashboard() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [attacks, setAttacks] = useState<any>([]);
  const [cowrie, setCowrie] = useState<Attacks[]>([]);
  const [dionaea, setDionaea] = useState<Attacks[]>([]);
  const [top, setTop] = useState([]);
  const [topCountry, setTopCountry] = useState<Country[]>([]);
  const [topUser, setTopUser] = useState<Username[]>([]);
  const [topUsername, setTopUsername] = useState<Username[]>([]);
  const [topPort, setTopPort] = useState<Port[]>([]);
  const [topPass, setTopPass] = useState<Password[]>([]);
  const [honeypots, setHoneypots] = useState<Honeypots[]>([]);
  const [allCountry, setAllCountry] = useState<Country[]>([]);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    console.log("UseEffect Worked!!!");
    const fetchSession = async () => {
      const sessionData = await getSession();

      if (sessionData) {
        // ถ้า session มีการเข้าใช้งานแล้ว ให้โหลดข้อมูลจาก API
        fetchPosts(sessionData!.user.id);
      } else {
        if (status === "unauthenticated") {
          router.push("/");
        } // ถ้าไม่ได้ล็อกอินจะไปหน้า login
      }
    };

    fetchSession();
  }, [router, status]);

  const fetchPosts = async (userId: number) => {
    try {

      const [
        getAttacks,
        getCowrie,
        getDionaea,
        getTop,
        getTopUser,
        getTopUsername,
        getTopPort,
        getTopPass,
        getTopCountry,
        getAllCountry,
      ] = await Promise.all([
          axios.get("/api/attacks"),
          axios.get(`/api/attacks/cowrie/${userId}`),
          axios.get(`/api/attacks/dionaea/${userId}`),
          axios.get(`/api/attacks/protocols/top/${userId}`),
          axios.get(`/api/attacks/username/top/${userId}`),
          axios.get(`/api/attacks/username/top5/${userId}`),
          axios.get(`/api/attacks/port/top5/${userId}`),
          axios.get(`/api/attacks/password/top/${userId}`),
          axios.get(`/api/attacks/country/top/${userId}`),
          axios.get(`/api/attacks/country/${userId}`),
      ]);

      if(getCowrie.data.length == 0 && getDionaea.data.length == 0){
        setNoData(true)
      }

      setAttacks(getAttacks.data);
      setCowrie(getCowrie.data);
      setDionaea(getDionaea.data);
      setTop(getTop.data);
      setTopUser(getTopUser.data);
      setTopUsername(getTopUsername.data);
      setTopPort(getTopPort.data);
      setTopPass(getTopPass.data);
      setTopCountry(getTopCountry.data);
      setAllCountry(getAllCountry.data);

      console.log(getCowrie.data);
      console.log("fetch Work!!!");
    } catch (error) {
      console.log(error);
    } 
    finally {
      setLoading(false);
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
        {noData ? (
          <div className="flex h-[39rem] items-center justify-center">
            <div className="text-2xl font-light text-white">
              "You have not connected to any honeypots yet."
            </div>
          </div>
        ) : loading ? (
          <div className="flex h-[39rem] items-center justify-center">
            <div className="flex flex-col w-[95%] h-[90%] items-center justify-center">
              <div className="text-2xl font-light text-white">
                Just a Moment...
              </div>
              <div className="grid min-h-[40px] w-full place-items-center overflow-x-scroll rounded-lg p-4 lg:overflow-visible">
                <svg
                  className="w-10 h-10 animate-spin text-gray-900/50"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-24 py-8">
            <Box>
              {/* <div>{country?.country}</div> */}
              <Grid container gap={2} marginTop={0}>
                <Grid container gap={1} className={scss.dataRibbon}>
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

                <Grid container className={scss.formatChart}>
                  <Grid container className={scss.forChart}>
                    <HorizontalBar top={top} />
                    <BarChart
                      header="Risk Level Bar"
                      chartData={{
                        labels: ["cowrie", "dionaea"], // กำหนด labels
                        datasets: [
                          {
                            label: "Red",
                            data: [
                              cowrie.filter((i) => i.alert == "red").length,
                              dionaea.filter((i) => i.alert == "red").length,
                            ], // กรณีที่ใช้ข้อมูล cowrie
                            fill: false,
                            backgroundColor: ["#e57373"], // กำหนดสี
                          },
                          {
                            label: "Yellow",
                            data: [
                              cowrie.filter((i) => i.alert == "yellow").length,
                              dionaea.filter((i) => i.alert == "yellow").length,
                            ], // กรณีที่ใช้ข้อมูล cowrie
                            fill: false,
                            backgroundColor: ["#ffff8d"], // กำหนดสี
                          },
                        ],
                      }}
                      options={[true, "top"]}
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
                      options={[false, "top"]}
                    />
                  </Grid>
                  <Grid container className={scss.forChartDough}>
                    <Doughnut
                      cowrie_atk={cowrie.length}
                      dionaea_atk={dionaea.length}
                      country={topCountry}
                      attacks={attacks}
                      port={topPort}
                      username={topUsername}
                    />
                  </Grid>
                </Grid>

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
                      options={[false, "top"]}
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
                      options={[false, "top"]}
                    />
                  </Grid>
                </Grid>
                <GeoChart allCountry={allCountry} />
              </Grid>

              {/* <Paper>{honeypots.map((i) => i.user.name)}</Paper> */}
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
        )}
      </ThemeProvider>
    )
  );
}

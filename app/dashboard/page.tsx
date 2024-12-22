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
      const honeypot = await axios.get("/api/honeypots");
      const cowrie = await axios.get("/api/honeypots/cowrie");
      const dionaea = await axios.get("/api/honeypots/dionaea");
      const top = await axios.get("/api/honeypots/protocols/top");
      
      setHoneypot(honeypot.data);
      setCowrie(cowrie.data);
      setDionaea(dionaea.data);
      setTop(top.data);
      console.log(honeypot);
      

      const uniqueCountries: string[] = []; // อาเรย์สำหรับเก็บประเทศที่ไม่ซ้ำกัน

      const countryResults = await Promise.all(
        honeypot.data.map(async (i: any) => {
          const ip = i.ip_attacker;
          if (ip) {
            const countryResponse = await axios.get(
              `http://ip-api.com/json/${ip}`
            );
            const country = countryResponse.data.country;

            // ตรวจสอบว่าประเทศนี้มีอยู่ในอาเรย์หรือยัง
            if (!uniqueCountries.includes(country)) {
              uniqueCountries.push(country); // ถ้ายังไม่มี ให้เพิ่มเข้าไป
            }
            return country;
          } else {
            console.warn(`No IP address found for honeypot item:`, i);
            return null; // ถ้าไม่มี IP ให้คืนค่า null
          }
        })
      );

      setCountry(uniqueCountries); // เซ็ตประเทศที่ไม่ซ้ำกันใน state
      console.log("Unique Country Array:", uniqueCountries);
    } catch (error) {
      console.error(error);
    }
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
                cowrie_atk={cowrie.length}
                dionaea_atk={dionaea.length}
              />
            </Grid>

            <Doughnut cowrie_atk={cowrie.length} dionaea_atk={dionaea.length} country={country} honeypot={honeypot}/>

            <Grid container className={scss.forChart2}>
              <Grid item xs={12}>
                <BarChart
                  cowrie_atk={cowrie.length}
                  dionaea_atk={dionaea.length}
                />
              </Grid>
              <Grid item xs={12}>
                <BarChart
                  cowrie_atk={cowrie.length}
                  dionaea_atk={dionaea.length}
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

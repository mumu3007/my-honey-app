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

  const [cowrie, setCowrie] = useState([]);
  const [dionaea, setDionaea] = useState([]);
  const [top, setTop] = useState([]);
  const [country, setCountry] = useState<{
    country: string;
  } | null>(null);


  useEffect(() => {
    fetchPosts();
    fetchCountry();
  }, []);

  const fetchPosts = async () => {
    try {
      const cowrie = await axios.get("/api/honeypots/cowrie");
      const dionaea = await axios.get("/api/honeypots/dionaea");
      const top = await axios.get("/api/honeypots/protocols/top");
      console.log(top)
      setCowrie(cowrie.data);
      setDionaea(dionaea.data);
      setTop(top.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCountry = async () => {
    try{
      const country = await axios.get("http://ip-api.com/json/24.48.0.1");
      setCountry(country.data);
      console.log(country);
    }
    catch(error){
      console.error(error);
    }
  }

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
              <HorizontalBar top={top}/>
              <LineChart />
              <BarChart
                cowrie_atk={cowrie.length}
                dionaea_atk={dionaea.length}
              />
            </Grid>

            <Doughnut />

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

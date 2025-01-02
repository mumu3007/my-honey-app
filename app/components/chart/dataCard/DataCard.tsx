"use client"

import React from "react";
import { Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import scss from "./Datacard.module.scss";

export type DataCardProps = {
  title: string;
  value: number;
  description: string;
};

export default function DataCard(props: DataCardProps) {
  const { title, value, description } = props;
  const formattedValue = new Intl.NumberFormat("en-US").format(value);

  return (
    <Paper className="relative top-4 h-full w-[calc(100%-0.1rem)] p-2 bg-[#171d28] border-[2px] border-gray-900">
      <Typography
        className={`text-3xl font-semibold ${
          value >= 30
            ? "text-red-400"
            : value >= 20
            ? "text-yellow-300"
            : value >= 10
            ? "text-yellow-100"
            : ""
        }`}
      >
        {formattedValue}
      </Typography>
      <div className={scss.header}>
        <Typography fontSize={"1rem"} /*color={"lightslategrey"}*/>
          {title}
        </Typography>

        <Tooltip
          title={
            <Typography fontSize={"1rem"}>
              {`${description} which is ${value}`}
            </Typography>
          }
        >
          <IconButton>
            <InfoOutlinedIcon style={{ fontSize: "1.2rem" }} />
          </IconButton>
        </Tooltip>
      </div>
    </Paper>
  );
}




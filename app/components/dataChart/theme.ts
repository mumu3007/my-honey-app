import { ChartConfiguration } from "chart.js";

export const darkOptions: ChartConfiguration["options"] = {
  scales: {
      y: {
        title: {
          color: "#ffffff", // ตั้งสีของ Y-axis label เป็นสีขาว
        },
        ticks: {
          color: "#ffffff", // ตั้งสีของ Y-axis ticks เป็นสีขาว
        },
      },
      x: {
        title: {
          color: "#ffffff", // ตั้งสีของ Y-axis label เป็นสีขาว
        },
        ticks: {
          color: "#ffffff", // ตั้งสีของ X-axis ticks เป็นสีขาว
        },
      },
    },
  plugins: {
    legend: {
      labels: {
        color: "#fff",
      },
    },
  },
};
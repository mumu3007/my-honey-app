import { months } from "@/app/helper/Util";
import { honeypots } from "@/app/helper/Util";
import { BorderClear, BorderColor } from "@mui/icons-material";

export const lineChartData = {
  labels: months({ count: 12 }),
  datasets: [
    {
      label: "Attacks",
      data: [65, 59, 80, 81, 56, 55, 60, 49, 112, 72, 52, 43],
      fill: false,
      borderColor: "lightblue",
      tension: 0.1,
    },
  ],
};

export const barChartData = {
  labels: honeypots({ count: 2 }),
  datasets: [
    {
      label: "Attacks",
      data: [2025, 849],
      fill: false,
      backgroundColor: ["lightgreen", "#8062D6"],
      tension: 0.1,
    },
    // {
    //   label: "DEF",
    //   data: [5025, 849],
    //   fill: false,
    //   backgroundColor: ["rgb(255,137,168)", "rgb(178,3,106)"],
    //   tension: 0.1,
    // },
  ],
};

export const horizontalChartData = {
  labels: ['ftp','Blackhole','mirrord','mirrorc', 'pptpd'],
  datasets: [
    {
      label: "Protocol",
      data: [1600, 1580, 1320, 987, 543],
      fill: false,
      backgroundColor: ["#b18a56", "#b04859", "#9847b4", "#4c72b8", "#6cbc64"],
      tension: 0.1,
    },
    // {
    //   label: "DEF",
    //   data: [5025, 849],
    //   fill: false,
    //   backgroundColor: ["rgb(255,137,168)", "rgb(178,3,106)"],
    //   tension: 0.1,
    // },
  ],
};

export const optionsHorizontal = {
  responsive: true,
  indexAxis: "y" as "y", // กำหนดเป็น "y" เพื่อให้กราฟเป็นแนวนอน
  plugins: {
    legend: {
      position: "top" as "top", // กำหนดตำแหน่งของ legend
    },
  },
  scales: {
    x: {
      beginAtZero: true, // เริ่มจาก 0
    },
  },
};


export const optionsDoughnut = {
  responsive: true,
  cutout: "65%", // ปรับช่องตรงกลาง (ค่าคือเปอร์เซ็นต์ของเส้นผ่านศูนย์กลาง)
  plugins: {
    legend: {
      position: "right" as "right", // เปลี่ยนตำแหน่ง Labels ("top", "left", "right", "bottom")
      display: true,
      labels: {
        usePointStyle: true, // ใช้สัญลักษณ์แบบวงกลม
        pointStyle: "circle", // ระบุให้เป็นวงกลม
        boxWidth: 7, // ขนาดของวงกลม (ค่าเริ่มต้นคือ 40)
        boxHeight: 7, // ความสูงของวงกลม
      }
    }
  }
};

export const doughnutChartData1 = {
  labels: ["Cowrie", "Dioneae"],
  datasets: [
    {
      label: "Attacks",
      data: [2025, 849],
      backgroundColor: ["#55ad59", "#3f6296"],
      borderWidth: 1,
      hoverOffset: 4,
    },
    
  ],
};

export const doughnutChartData2 = {
  labels: ["China", "UK", "US", "Vietnam", "Russia"],
  datasets: [
    {
      label: "Transaction Dataset",
      data: [875, 460, 931, 308, 300],
      backgroundColor: ["#b18a56", "#b04859", "#9847b4", "#4c72b8", "#6cbc64"],
      borderWidth: 1,
      hoverOffset: 4,
    },
    
  ],
};

export const doughnutChartData3 = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "Transaction Dataset",
      data: [300, 50, 100],
      backgroundColor: ["#a68850", "#3c428d", "#833a3f"],
      borderWidth: 1,
      hoverOffset: 4,
    },
    
  ],
};
export const doughnutChartData4 = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "Transaction Dataset",
      data: [300, 50, 100],
      backgroundColor: ["rgb(255,137,168)", "rgb(178,3,106)", "rgb(165,7,42)"],
      borderWidth: 1,
      hoverOffset: 4,
    },
    
  ],
};
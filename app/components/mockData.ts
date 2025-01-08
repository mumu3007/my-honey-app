import { months } from "@/app/helper/Util";
import { honeypots } from "@/app/helper/Util";
import { BorderClear, BorderColor } from "@mui/icons-material";



export const optionsDoughnut = {
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
      }
    },
  },
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
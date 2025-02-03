"use client";

import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, createTheme, ThemeProvider, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Skeleton from "@mui/material/Skeleton";
import {
  Honeypots,
  Alert,
  IP_Attacker,
  Protocol,
  Username,
  Password,
  DestinationPort,
  HoneypotID
} from "./mockupData";


import axios from "axios";
import { honeypots } from "../helper/Util";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Realtime() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [attacks, setAttacks] = useState<any[]>([]);
  const [sortDown, setSortDown] = useState(true);
  const [sortColumn, setSortColumn] = useState<string>("Date"); // คอลัมน์เริ่มต้น
  const [currentPage, setCurrentPage] = useState(1);
  const [noData, setNoData] = useState(false);

  const router = useRouter();

  const TABLE_HEAD = [
    { label: "No.", key: "index" },
    { label: "Honeypot", key: "name" },
    { label: "Alert", key: "alert" },
    { label: "Date", key: "createdAt" },
    { label: "Time", key: "createdAtTime" },
    { label: "IP_Attacker", key: "ip_attacker" },
    { label: "Protocol", key: "protocol" },
    { label: "Username", key: "username" },
    { label: "Password", key: "password" },
    { label: "Dest.Port", key: "destinationPort" },
    { label: "Comment", key: "comment" },
  ];

  const generateRandomData = () => {

    const randomData = {
      name: Honeypots[Math.floor(Math.random() * Honeypots.length)],
      alert: Alert[Math.floor(Math.random() * Alert.length)],
      ip_attacker: IP_Attacker[Math.floor(Math.random() * IP_Attacker.length)],
      protocol: Protocol[Math.floor(Math.random() * Protocol.length)],
      comment:"",
      username: Username[Math.floor(Math.random() * Username.length)],
      password: Password[Math.floor(Math.random() * Password.length)],
      destinationPort: DestinationPort[Math.floor(Math.random() * DestinationPort.length)],
      honeypotId: HoneypotID[Math.floor(Math.random() * HoneypotID.length)]
    };

    console.log(randomData)
    return randomData
  };

  const sortData = (data: any, column: any, isDescending: any) => {
    return [...data].sort((a, b) => {
      if (column === "createdAt") {
        const dateA = new Date(a[column]).getTime();
        const dateB = new Date(b[column]).getTime();
        return isDescending ? dateB - dateA : dateA - dateB;
      }
      if (column === "destinationPort") {
        return isDescending ? b[column] - a[column] : a[column] - b[column];
      }
      const valA = a[column]?.toString().toLowerCase();
      const valB = b[column]?.toString().toLowerCase();
      if (valA < valB) return isDescending ? 1 : -1;
      if (valA > valB) return isDescending ? -1 : 1;
      return 0;
    });
  };


  const rowsPerPage = 6;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const visibleRows = sortData(attacks, sortColumn, sortDown).slice(
    startIndex,
    endIndex
  );

  const formatDate = (date: any) => {
    if (date && date.includes("T") && date.includes(".")) {
      const formatedDate = date.split("T")[0];
      const formatedTime = date.split("T")[1].split(".")[0];
      return [formatedDate, formatedTime];
    }
    return date;
  };

  const fetchAttacks = async (userId: number) => {
    try {
      const getAttacks = await axios.get(`/api/attacks/user/${userId}`);
      setAttacks(getAttacks.data);
      if(getAttacks.data.length == 0){
        setNoData(true)
      }
      console.log(getAttacks.data);
    } catch (error) {
      console.log(error);;
    } finally {
      setLoading(false);
    }
  };

  const createAttacks = async (data: {}) => {
    try {
      console.log("QWERTYUIOPLKMNBVSERTYU",data)
      const getAttacks = await axios.post(`/api/attacks`, data)
      console.log(getAttacks);
      return getAttacks
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    generateRandomData()
    let intervalIdCreate: NodeJS.Timeout | null = null;
    let intervalIdFetch: NodeJS.Timeout | null = null;
    
    const fetchSessionAndData = async () => {
      const sessionData = await getSession();
      if (sessionData) {
        fetchAttacks(sessionData!.user.id);

        // intervalIdCreate = setInterval(async () => {
        //   createAttacks(generateRandomData()); // ส่งข้อมูล userId
        // }, 5000); 
        // // ตั้งเวลา 5 วินาที

        // ดึงข้อมูลซ้ำทุก 5 วินาที
        intervalIdFetch = setInterval(() => {
          fetchAttacks(sessionData!.user.id);
        }, 1000);
      } else if (status === "unauthenticated") {
        router.push("/");
      }
    };

    fetchSessionAndData();

    return () => {
      if (intervalIdFetch) {
        clearInterval(intervalIdFetch); // Cleanup interval เมื่อ component ถูก unmount
      }
      if (intervalIdCreate) {
        clearInterval(intervalIdCreate); // Cleanup interval เมื่อ component ถูก unmount
      }
    };
  }, [router, status]);

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
          <div className="flex flex-col justify-center p-10 pt-8 pb-0">
            <div className="font-semibold text-center p-5 text-2xl text-white">
              Realtime Table
            </div>
            <div className="flex justify-center">
              <Card className="h-full w-[95%] overflow-x-scroll  scrollbar-thin scrollbar-thumb-white scrollbar-track-gray-800 bg-[#171d28]  border-[2px] border-gray-900">
                <table className="w-full min-w-max table-auto text-left ">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map(({ label, key }) => (
                        <th
                          key={key}
                          className="border-b-[2px] bg-gray-900 p-4 border-r border-gray-700"
                        >
                          <div className="flex items-center">
                            <Typography className="font-semibold">
                              {label}
                            </Typography>
                            {key !== "index" && (
                              <button
                                onClick={() => {
                                  if (sortColumn === key) {
                                    setSortDown(!sortDown);
                                  } else {
                                    setSortColumn(key);
                                    setSortDown(true); // Default sort direction
                                  }
                                }}
                                className="text-xs text-white px-1"
                              >
                                {sortColumn === key ? (
                                  key === "createdAtTime" ? (
                                    <></>
                                  ) : sortDown ? (
                                    <KeyboardArrowDownIcon />
                                  ) : (
                                    <KeyboardArrowUpIcon />
                                  )
                                ) : key === "createdAtTime" ? (
                                  <></>
                                ) : (
                                  <KeyboardArrowDownIcon className="opacity-50" />
                                )}
                              </button>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="w-full bg-[#232933]">
                    {visibleRows.map((row, index) => {
                      const { createdAt, createdAtTime, ...rest } = row;
                      return (
                        <tr key={row.id}>
                          {TABLE_HEAD.map(({ key }, i) => (
                            <td
                              key={i}
                              className={`p-4 ${
                                i < TABLE_HEAD.length - 1
                                  ? "border-r border-gray-700"
                                  : ""
                              }`}
                              style={{
                                whiteSpace:
                                  key === "comment" ? "nowrap" : "normal", // ไม่ให้ข้อมูลใน comment ขึ้นบรรทัดใหม่
                                overflow:
                                  key === "comment" ? "hidden" : "visible", // ซ่อนข้อมูลที่เกิน
                                textOverflow:
                                  key === "comment" ? "ellipsis" : "clip", // เพิ่ม "..." เมื่อข้อมูลเกิน
                                maxWidth: key === "comment" ? "400px" : "auto", // กำหนดความกว้างสูงสุด
                              }}
                            >
                              <Typography
                                title={
                                  key === "comment" ? rest[key] : undefined
                                } // แสดง tooltip เมื่อ hover
                              >
                                {key === "index"
                                  ? index + startIndex + 1
                                  : key === "createdAt"
                                  ? formatDate(createdAt)[0]
                                  : key === "createdAtTime"
                                  ? formatDate(createdAt)[1]
                                  : key === "comment"
                                  ? rest[key].length > 40
                                    ? `${rest[key].slice(0, 40)}...`
                                    : rest[key]
                                  : rest[key]}
                              </Typography>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
            </div>

            <div className="flex justify-center w-full pt-7 text-xl text-white">
              <div className="bg-[#232933] rounded py-1">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-12"
                >
                  <KeyboardArrowLeftIcon />
                </button>
                <span className="">{currentPage}</span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={endIndex >= attacks.length}
                  className="w-12"
                >
                  <KeyboardArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
        )}
      </ThemeProvider>
    )
  );
}

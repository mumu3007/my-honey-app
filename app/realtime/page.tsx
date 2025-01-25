"use client";

import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, createTheme, ThemeProvider, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import axios from "axios";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Realtime() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [attacks, setAttacks] = useState<any[]>([]);
   const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Cowrie",
      value: "cowrie",
    },
    {
      label: "Dionaea",
      value: "dionaea",
    },
  ];

  const TABLE_HEAD = ["No." ,"Honeypot", "Alert", "Date", "Time", "IP_Attacker", "Protocol", "Comment", "Username", "Password", "DestinationPort"];

  const rowsPerPage = 5;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleRows = attacks.slice(startIndex, endIndex);

  const formatDate = (date: any) => {
    console.log(date)
        if (date && date.includes('T') && date.includes('.')) {
            const formatedDate = date.split('T')[0];
            const formatedTime = date.split("T")[1].split(".")[0];

            const dateAndTime = [formatedDate, formatedTime];
            // รวมวันที่และเวลา
            return dateAndTime;
        }
        return date; // คืนค่าค่าว่างหาก date ไม่มีรูปแบบที่คาดหวัง
    };

  const fetchAttacks = async (userId: number) => {
    try {
      const getAttacks = await axios.get(`/api/attacks/user/${userId}`);
      // const getCowrie = await axios.get(`/api/attacks/cowrie/${userId}`);
      // const getDionaea = await axios.get(`/api/attacks/dionaea/${userId}`);

      setAttacks(getAttacks.data);
      // setCowrie(getCowrie.data);
      // setDionaea(getDionaea.data);
      console.log(getAttacks.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
     console.log("UseEffect Worked!!!");
     const fetchSession = async () => {
       const sessionData = await getSession();
       console.log("Session after refresh:", sessionData!.user);
 
       if (sessionData) {
         // ถ้า session มีการเข้าใช้งานแล้ว ให้โหลดข้อมูลจาก API
         fetchAttacks(sessionData!.user.id);
       } else {
         if (status === "unauthenticated") {
           router.push("/");
         }// ถ้าไม่ได้ล็อกอินจะไปหน้า login
       }
     }
 
     fetchSession();
   }, [router, status]);

  // When after loading success and have session, show profile
  return (
    status === "authenticated" &&
    session.user && (
      <ThemeProvider theme={darkTheme}>
        <div className="flex flex-col justify-center p-10">
          <div className="text-center p-5 text-xl text-white">
            Realtime Table
          </div>
          <div className="flex justify-center">
            <Card className="h-full w-[90%] overflow-hidden bg-[#171d28]  border-[2px] border-gray-900">
              <table className="w-full min-w-max table-auto text-left ">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b-[2px] border-gray-900 bg-gray-900 p-4 "
                      >
                        <div className="flex items-center">
                          <Typography className="font-semibold">
                            {head}
                          </Typography>
                          {head === "Date" && (
                            <button
                              onClick={() =>
                                console.log("Button clicked for Date")
                              }
                              className="text-xs text-white  px-1"
                            >
                              <KeyboardArrowDownIcon />
                            </button>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="w-full #232933">
                  {visibleRows.map(
                    (
                      {
                        id,
                        name,
                        alert,
                        createdAt,
                        ip_attacker,
                        protocol,
                        comment,
                        username,
                        password,
                        destinationPort,
                      },
                      index
                    ) => {
                      const isLast = index === attacks.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-gray-900";

                      return (
                        <tr key={id}>
                          <td className={classes}>
                            <Typography>{index + startIndex + 1}</Typography>
                          </td>
                          <td className={classes}>
                            <Typography>{name}</Typography>
                          </td>
                          <td className={classes}>
                            <Typography>{alert}</Typography>
                          </td>
                          <td className={classes}>
                            <Typography>{formatDate(createdAt)[0]}</Typography>
                          </td>
                          <td className={classes}>
                            <Typography>{formatDate(createdAt)[1]}</Typography>
                          </td>
                          <td className={classes}>
                            <Typography>{ip_attacker}</Typography>
                          </td>
                          <td className={classes}>
                            <Typography>{protocol}</Typography>
                          </td>
                          <td className={classes}>
                            <Typography>{comment}</Typography>
                          </td>
                          <td className={classes}>
                            <Typography>{username}</Typography>
                          </td>
                          <td className={classes}>
                            <Typography>{password}</Typography>
                          </td>
                          <td className={classes}>
                            <Typography>{destinationPort}</Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </Card>
          </div>

          <div className="flex justify-center w-full ">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10"
            >
              <KeyboardArrowLeftIcon />
            </button>
            <span className="">{currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={endIndex >= attacks.length}
              className="w-10"
            >
              <KeyboardArrowRightIcon />
            </button>
          </div>
        </div>
      </ThemeProvider>
    )
  );
  
}

"use client";

import React, { useState } from "react";
import scss from "./Navbar.module.scss";
import { createTheme, Paper, ThemeProvider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const stringAvatar = (name: string) => {
  console.log(name)
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0]?.[0] || ""}${name.split(" ")[1]?.[0] || ""}`,
  };
}

export default function Navbar() {
  const {data: session, status} = useSession()
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper className="flex h-20 justify-between items-center gap-2 px-10 lg:px-28 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="flex items-center text-lg font-bold gap-2">
          <img src="/logo.png" alt="" className="w-12 h-12" />
          MyHoney
        </div>
        {status == "authenticated" && session.user && (
          <div className="flex w-[40%] justify-between items-center lg:gap-20">
            <div className="flex justify-center w-1/3">
              <button
                onClick={() => router.push("/realtime")}
                className="transition hover:scale-110 hover:font-medium duration-200 text-sm lg:text-base"
              >
                Realtime-Table
              </button>
            </div>
            <div className="flex justify-center w-1/3">
              <button
                onClick={() => router.push("/public")}
                className="transition hover:scale-110 hover:font-medium duration-200 text-sm lg:text-base"
              >
                Public
              </button>
            </div>
            <div className="flex justify-center w-1/3">
              <button
                onClick={() => router.push("/dashboard")}
                className="transition hover:scale-110 hover:font-medium duration-200 text-sm lg:text-base"
              >
                Dashboard
              </button>
            </div>
          </div>
        )}
        <div className="flex gap-4 items-center">
          {status == "authenticated" && session.user ? (
            <div>
              Hi,<span className="ml-1">{session?.user.name}</span>
            </div>
          ) : (
            <div>Hi, Please Sign in</div>
          )}

          <div className="relative">
            {session?.user.image ? (
              <img
                // alt="tania andrew"
                src={session?.user.image!}
                className="relative inline-block h-10 w-10 cursor-pointer rounded-full object-cover object-center"
                onClick={toggleMenu} // เปิด/ปิดเมนู
              />
            ) : session?.user.name! ? (
              <Avatar
                {...stringAvatar(session?.user.name!)}
                onClick={toggleMenu}
              />
            ) : (
              <Avatar onClick={toggleMenu} />
            )}

            {/* Dropdown Menu */}
            {isOpen && (
              <ul
                role="menu"
                className="absolute right-0 z-10 min-w-[180px] max-w-[240px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm"
              >
                {status == "authenticated" && session.user ? (
                  <>
                    <li
                      role="menuitem"
                      className=" text-slate-800 flex w-full text-sm items-center rounded-md p-3 "
                    >
                      {session.user.email}
                    </li>
                    <li
                      onClick={() =>{closeMenu(); router.push("/connectHoneypot")}}
                      role="menuitem"
                      className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 hover:bg-slate-100"
                    >
                      Connect to Honeypot
                    </li>
                    <hr className="my-2 border-slate-200" />
                    <li
                      onClick={() => signOut({ callbackUrl: "/" })}
                      role="menuitem"
                      className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 hover:bg-slate-100"
                    >
                      Sign Out
                    </li>
                  </>
                ) : (
                  <li
                    onClick={() => {
                      closeMenu();
                      router.push("/signinForm");
                    }}
                    role="menuitem"
                    className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 hover:bg-slate-100"
                  >
                    Sign In
                  </li>
                )}
              </ul>
            )}

            {/* ปิดเมนูเมื่อคลิกด้านนอก */}
            {isOpen && (
              <div
                className="fixed inset-0 z-0"
                onClick={closeMenu} // คลิกที่อื่นเพื่อปิดเมนู
              />
            )}
          </div>
          {/* <div>{session?.user.email}</div> */}
          {/* <button onClick={() => signOut({ callbackUrl: "/" })}>LogOut</button> */}
        </div>
      </Paper>
    </ThemeProvider>
  );
}

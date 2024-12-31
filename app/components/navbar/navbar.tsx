"use client";

import React from "react";
import scss from "./Navbar.module.scss";
import { createTheme, Paper, ThemeProvider } from "@mui/material";
import { useSession, signOut } from "next-auth/react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Navbar() {
  const {data: session, status} = useSession()
  console.log('session', session)
  console.log('status', status)
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper className="flex h-16 justify-center items-center gap-2">
        <div>{session?.user.name}</div>
        <div>{session?.user.email}</div>
        <button onClick={() => signOut({callbackUrl: '/'})}>LogOut</button>
      </Paper>
    </ThemeProvider>
  );
}

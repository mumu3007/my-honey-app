"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Public from "./public/page";



export default function SignUp() {
  
  useEffect(() => {
    console.log("UseEffect Worked!!!");
  }, []);

  return (
   <Public/>
  );
}

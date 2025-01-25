"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Public from "./public/page";

export default function SignUp() {

  return (
   <Public/>
  );
}

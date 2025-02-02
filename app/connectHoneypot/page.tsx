"use client";

import { useEffect, useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignIn() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("cowrie");
  const [honeyStatus, setHoneyStatus] = useState("public");
  const [userId, setUserId] = useState(0)
  const router = useRouter();

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    try {

      const result = await axios.post("/api/honeypots", {
        name,
        status: honeyStatus,
        userId,
      });

     
      console.log(result);

      if (result!.statusText == "OK") {
        alert("Honeypot Connected");
      } else {
        alert("Error")
      }
    } catch (error) {
      alert("Something wrong! Try again");
    }
  };

  useEffect(() => {
      console.log("UseEffect Worked!!!");
      const fetchSession = async () => {
        const sessionData = await getSession();
  
        if (sessionData) {
          // ถ้า session มีการเข้าใช้งานแล้ว ให้โหลดข้อมูลจาก API
          setUserId(sessionData!.user.id);
          console.log(sessionData!.user.id);
        } else {
          if (status === "unauthenticated") {
            router.push("/");
          } // ถ้าไม่ได้ล็อกอินจะไปหน้า login
        }
      };
  
      fetchSession();
    }, [router,status]);

  return (
    <div className="flex h-[88.5vh] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/4 bg-white p-6 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label className="block font-semibold mb-2">Honeypot's Name</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="honeypotName"
                value="cowrie"
                checked={name === "cowrie"}
                onChange={(e) => setName(e.target.value)}
              />
              Cowrie
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="honeypotName"
                value="dionaea"
                checked={name === "dionaea"}
                onChange={(e) => setName(e.target.value)}
              />
              Dionaea
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="honeyStatus" className="block font-semibold mb-2">
            Status
          </label>
          <select
            id="honeyStatus"
            value={honeyStatus}
            onChange={(e) => setHoneyStatus(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        >
          Connect
        </button>
      </form>
    </div>
  );
}

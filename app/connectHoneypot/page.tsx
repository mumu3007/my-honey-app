"use client";

import { useEffect, useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, createTheme, ThemeProvider, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignIn() {
  const { data: session, status } = useSession();
  const [honeypot, setHoneypot] = useState<any[]>([]);
  const [name, setName] = useState("cowrie");
  const [honeyStatus, setHoneyStatus] = useState("public");
  const [ip, setIP] = useState("");
  const [userId, setUserId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deletedHoneypot, setDeletedHoneypot] = useState(0)
  const [selectedHoneypot, setSelectedHoneypot] = useState<{
    id: number;
    status: string;
  } | null>(null);

  const router = useRouter();

  const TABLE_HEAD = [
    { label: "No.", key: "index" },
    { label: "Name", key: "name" },
    { label: "IP_Honeypot", key: "ip_honeypot" },
    { label: "Status", key: "status" },
  ];

  const rowsPerPage = 6;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const visibleRows = honeypot.slice(startIndex, endIndex);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(ip);
    try {
      const result = await axios.post("/api/honeypots", {
        name,
        status: honeyStatus,
        ip_honeypot: ip,
        userId,
      });

      console.log(result);

      if (result!.statusText == "OK") {
        fetchHoneypot(userId)
        alert("Honeypot Connected");
      } else {
        alert("Error");
      }
    } catch (error) {
      alert("Something wrong! Try again");
    }
  };

  const fetchHoneypot = async (userId: number) => {
    try {
      const getHoneypot = await axios.get(`/api/honeypots/${userId}`);
      setHoneypot(getHoneypot.data);
      console.log(getHoneypot.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateHoneypot = async (id: number, status: string) => {
    if (!selectedHoneypot) return;
    try {
      const honeypot = await axios.put(`/api/honeypots`, {
        id: selectedHoneypot.id,
        status: selectedHoneypot.status === "private" ? "public" : "private",
      });
      fetchHoneypot(userId);
      setShowPopup(false);
      alert("Updated Successful");
      console.log(honeypot);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/honeypots/id/${id}`);
      fetchHoneypot(userId);
      setShowDeletePopup(false);
      alert("Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete");
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
        fetchHoneypot(sessionData!.user.id);
      } else {
        if (status === "unauthenticated") {
          router.push("/");
        } // ถ้าไม่ได้ล็อกอินจะไปหน้า login
      }
    };

    fetchSession();
  }, [router, status]);

  return (
    <ThemeProvider theme={darkTheme}>
      {honeypot.length > 0 ? (
        <div className="flex">
          <div className="flex flex-col w-[55%] p-10 pl-28 pt-8 pb-0">
            <div className="font-semibold p-5 text-2xl text-white">
              Your Honeypot
            </div>
            <div className="flex">
              <Card className="h-full w-full overflow-x-scroll scrollbar scrollbar-thumb-gray-600 scrollbar-track-gray-800 bg-[#171d28] border-[2px] border-gray-900">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      <th className="border-b-[2px] bg-gray-900 p-4 border-r border-gray-700">
                        No.
                      </th>
                      <th className="border-b-[2px] bg-gray-900 p-4 border-r border-gray-700">
                        Name
                      </th>
                      <th className="border-b-[2px] bg-gray-900 p-4 border-r border-gray-700">
                        IP_Honeypot
                      </th>
                      <th className="border-b-[2px] bg-gray-900 p-4 border-gray-700">
                        Status
                      </th>
                      <th className="border-b-[2px] bg-gray-900 p-4 border-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody className="w-full bg-[#232933]">
                    {visibleRows.map((row, index) => (
                      <tr key={row.id}>
                        <td className="p-4 border-r border-gray-700">
                          {index + startIndex + 1}
                        </td>
                        <td className="p-4 border-r border-gray-700">
                          {row.name}
                        </td>
                        <td className="p-4 border-r border-gray-700">
                          {row.ip_honeypot}
                        </td>
                        <td className="p-4 pr-0">
                          <div className="flex justify-between">
                            <span>{row.status}</span>
                            <button
                              className="bg-[#50515b] text-white px-2 py-1 rounded text-sm hover:bg-[#42434c]"
                              onClick={() => {
                                setSelectedHoneypot(row);
                                setShowPopup(true);
                              }}
                            >
                              Change
                            </button>
                          </div>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => {
                              setDeletedHoneypot(row.id);
                              setShowDeletePopup(true);
                            }}
                            className="text-gray-400 hover:text-red-500 transition"
                          >
                            <DeleteOutlineIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>

            <div className="flex pl-72 w-full pt-4 text-xl text-white">
              <div className="bg-[#232933] rounded py-1">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-12"
                >
                  <KeyboardArrowLeftIcon />
                </button>
                <span>{currentPage}</span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={endIndex >= honeypot.length}
                  className="w-12"
                >
                  <KeyboardArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="flex h-[88.5vh] w-[25%] ml-10 items-center text-white">
            <form
              onSubmit={handleSubmit}
              className="w-full bg-[#232933] p-6 rounded-md shadow-md"
            >
              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Honeypot's Name
                </label>
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
              <div className="mb-2">
                <label htmlFor="ip" className="mb-2">
                  IP_Honeypot
                </label>
                <input
                  id="ip"
                  type="ip"
                  value={ip}
                  onChange={(e) => setIP(e.target.value)}
                  required
                  className="w-full border border-gray-300 px-3 py-2  mt-2 rounded text-black" // Added border
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="honeyStatus"
                  className="block font-semibold mb-2"
                >
                  Status
                </label>
                <select
                  id="honeyStatus"
                  value={honeyStatus}
                  onChange={(e) => setHoneyStatus(e.target.value)}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded text-black"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-400 text-white py-2 rounded mb-4"
              >
                Connect
              </button>
            </form>
          </div>

          {/* Popup Confirmation */}
          {showPopup && selectedHoneypot && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-md text-black">
                <h2 className="text-lg font-semibold mb-4">
                  Confirm Status Change
                </h2>
                <p>
                  Are you sure you want to change the status of this Honeypot?
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-gray-300 text-black rounded-md mr-2"
                    onClick={() => setShowPopup(false)}
                  >
                    No
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-400 text-white rounded-md"
                    onClick={() =>
                      updateHoneypot(
                        selectedHoneypot.id,
                        selectedHoneypot.status
                      )
                    }
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {showDeletePopup && deletedHoneypot && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-md text-black">
                <h2 className="text-lg font-semibold mb-4">
                  Confirm Honeypot Deletion
                </h2>
                <p>Are you sure you want to delete this Honeypot?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded-md mr-2"
                    onClick={() => setShowDeletePopup(false)}
                  >
                    No
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-400 text-white rounded-md"
                    onClick={() => handleDelete(deletedHoneypot)}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex h-[88.5vh] w-[25%] ml-10 items-center text-white">
            <form
              onSubmit={handleSubmit}
              className="w-full bg-[#232933] p-6 rounded-md shadow-md"
            >
              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Honeypot's Name
                </label>
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
              <div className="mb-2">
                <label htmlFor="ip" className="mb-2">
                  IP_Honeypot
                </label>
                <input
                  id="ip"
                  type="ip"
                  value={ip}
                  onChange={(e) => setIP(e.target.value)}
                  required
                  className="w-full border border-gray-300 px-3 py-2  mt-2 rounded text-black" // Added border
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="honeyStatus"
                  className="block font-semibold mb-2"
                >
                  Status
                </label>
                <select
                  id="honeyStatus"
                  value={honeyStatus}
                  onChange={(e) => setHoneyStatus(e.target.value)}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded text-black"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-400 text-white py-2 rounded mb-4"
              >
                Connect
              </button>
            </form>
          </div>

          {/* Popup Confirmation */}
          {showPopup && selectedHoneypot && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-md text-black">
                <h2 className="text-lg font-semibold mb-4">
                  Confirm Status Change
                </h2>
                <p>
                  Are you sure you want to change the status of this Honeypot?
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-gray-300 text-black rounded-md mr-2"
                    onClick={() => setShowPopup(false)}
                  >
                    No
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-400 text-white rounded-md"
                    onClick={() =>
                      updateHoneypot(
                        selectedHoneypot.id,
                        selectedHoneypot.status
                      )
                    }
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {showDeletePopup && deletedHoneypot && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-md text-black">
                <h2 className="text-lg font-semibold mb-4">
                  Confirm Honeypot Deletion
                </h2>
                <p>Are you sure you want to delete this Honeypot?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded-md mr-2"
                    onClick={() => setShowDeletePopup(false)}
                  >
                    No
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-400 text-white rounded-md"
                    onClick={() => handleDelete(deletedHoneypot)}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </ThemeProvider>
  );
}

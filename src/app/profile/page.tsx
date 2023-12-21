"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const [data, setData] = useState("");
  const router = useRouter();
  const onLogout = async () => {
    try {
      const response = await axios.get("api/users/logout");
      console.log(response);
      alert("Logout Successful");
      router.push("/login");
    } catch (error) {
      alert("Something went wrong, Please try again!");
      console.log(error);
    }
  };

  const getUserDetails = async () => {
    let response = await axios.get("api/users/me");
    console.log(response.data);
    setData(response.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <h2>
        {data === "" ? "No Data" : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <button className={`p-1 px-5 border rounded my-2`} onClick={onLogout}>
        Logout
      </button>
      <button className={`p-1 px-5 border rounded my-2`} onClick={getUserDetails}>
        Get User Details
      </button>
    </div>
  );
}

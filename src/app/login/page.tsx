"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login response", response);
      if (response.data.success) {
        router.push("/profile");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Something went wrong, Please try again!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing..." : "Login"}</h1>

      <label htmlFor="email">Email</label>
      <input
        className="p-1 border rounded mb-4"
        type="email"
        id="email"
        placeholder="Enter email..,"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-1 border rounded mb-4 text-black"
        type="password"
        id="password"
        placeholder="Enter password..,"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />

      <button
        className={`p-1 px-5 border rounded my-2 ${
          buttonDisabled ? "hidden" : ""
        }`}
        onClick={onLogin}
      >
        Login
      </button>
      <Link href="/signUp">Don&rsquo;t have an account ? SignUp</Link>
    </div>
  );
}

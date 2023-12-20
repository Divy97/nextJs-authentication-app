"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login Form</h1>

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
        className="p-1 border rounded mb-4"
        type="password"
        id="password"
        placeholder="Enter password..,"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />


      <button className="p-1 px-5 border rounded my-2" onClick={onLogin}>
        Login
      </button>
      <Link href="/signUp">Don&rsquo;t have an account ? SignUp</Link>
    </div>
  );
}

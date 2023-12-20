"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const onSignUp = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup Form</h1>

      <hr />

      <label htmlFor="username">UserName</label>
      <input
        className="p-1 border rounded mb-4"
        type="text"
        id="username"
        placeholder="Enter userName..,"
        value={user.userName}
        onChange={(e) => {
          setUser({ ...user, userName: e.target.value });
        }}
      />

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


      <button className="p-1 px-5 border rounded my-2"
        onClick={onSignUp}
      >SignUp</button>
      <Link href='/login'>Already have an account ? Login</Link>
    </div>
  );
}

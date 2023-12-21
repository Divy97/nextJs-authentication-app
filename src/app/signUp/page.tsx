"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp response", response);
      router.push("/login");
    } catch (error) {
      alert("Something went wrong, Please try again!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.userName.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing..." : "SignUp"}</h1>

      <hr />

      <label htmlFor="username">UserName</label>
      <input
        className="p-1 border rounded mb-4 text-black"
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
        className="p-1 border rounded mb-4 text-black"
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
        onClick={onSignUp}
      >
        SignUp
      </button>
      <Link href="/login">Already have an account ? Login</Link>
    </div>
  );
}

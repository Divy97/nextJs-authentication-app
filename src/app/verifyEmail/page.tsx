"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const [error, setError] = useState(false);

  const verifyUser = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerifiedEmail(true);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUser();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-600 text-black">
        {token ? `${token}` : "No Token"}
      </h2>
      {verifiedEmail && (
        <>
          <h2 className="p-2 bg-orange-600 text-black">Verified</h2>
          <Link href="/login">Login</Link>
        </>
      )}

      {error && <h2 className="p-2 bg-red-600 text-black">Not Verified</h2>}
    </div>
  );
}

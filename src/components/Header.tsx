import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full p-4 bg-white shadow-md flex justify-between items-center">
      <Link
        href="/"
        className="flex items-center text-2xl font-bold text-gray-800"
      >
        TweetForge
      </Link>
    </header>
  );
}

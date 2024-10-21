import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full p-4 bg-white shadow-md flex justify-between items-center">
      <Image
        src="/logo.svg"
        alt="tweetforge"
        width={180}
        height={34}
        loading="lazy"
        quality={100}
      />
    </header>
  );
}

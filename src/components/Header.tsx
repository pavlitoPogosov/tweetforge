import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full p-4 bg-white shadow-md flex flex-col sm:flex-row justify-between items-center">
      <Image
        src="/logo.svg"
        alt="tweetforge"
        width={180}
        height={34}
        loading="lazy"
        quality={100}
        className="mb-4 sm:mb-0"
      />
      <nav className="flex flex-wrap justify-center sm:justify-end space-x-4">
        <a href="#pro-version" className="text-gray-700 hover:text-gray-900">
          Pro Version
        </a>
        <a href="#leave-opinion" className="text-gray-700 hover:text-gray-900">
          Leave Your Opinion
        </a>
      </nav>
    </header>
  );
}

import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full p-2 md:p-4 bg-white shadow-md">
      <div className="max-w-6xl flex flex-col sm:flex-row justify-between items-center mx-auto">
        <Image
          src="/logo.svg"
          alt="tweetforge"
          width={120} // Smaller width for mobile
          height={24} // Smaller height for mobile
          loading="lazy"
          quality={100}
          className="mb-4 sm:mb-0 sm:w-[180px] sm:h-[34px]" // Adjust size for larger screens
        />
        <nav className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-4">
          <a
            href="#pro-version"
            className="text-sm sm:text-base text-gray-700 hover:text-gray-900"
          >
            Pro Version
          </a>
          <a
            href="#leave-opinion"
            className="text-sm sm:text-base text-gray-700 hover:text-gray-900"
          >
            Leave Your Opinion
          </a>
        </nav>
      </div>
    </header>
  );
}

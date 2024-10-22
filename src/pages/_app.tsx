import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import posthog from "posthog-js";

import localFont from "next/font/local";
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const usePostHog = () => {
  useEffect(() => {
    // Check if running on localhost
    const isLocalhost = window.location.hostname === "localhost";

    if (!isLocalhost) {
      // Initialize PostHog only if not on localhost
      posthog.init("phc_HhC1hjatioyu9K9iLYAJy71PQk21cvfaiDoFOTxsrxw", {
        api_host: "https://eu.i.posthog.com",
        person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
      });
    }
  }, []);
};

export default function App({ Component, pageProps }: AppProps) {
  usePostHog();

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
    >
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}

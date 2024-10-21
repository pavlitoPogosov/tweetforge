import React from "react";
import Header from "@/components/Header";
import { TweetGenerator } from "@/widgets/TweetGenerator";
import { ProVersion } from "@/widgets/ProVersion";
import { FeedbackForm } from "@/widgets/Feedback";
import Head from "next/head";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          TweetForge - Instantly Generate High-Quality Tweets From Any URL
        </title>
        <meta
          name="description"
          content="Give a URL to the content you like, add your suggestions, and get
          free, ready-to-post tweets."
        />
      </Head>

      <Header />
      <main className="mt-8 md:mt-14">
        <TweetGenerator />
      </main>

      <section className="mt-12 md:mt-24 max-w-xl mx-auto">
        <ProVersion />
      </section>

      <section className="mt-12 md:mt-24 max-w-xl mx-auto">
        <FeedbackForm />
      </section>

      <Footer />
    </>
  );
}

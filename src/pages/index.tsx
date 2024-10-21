import React from "react";
import Header from "@/components/Header";
import { TweetGenerator } from "@/widgets/TweetGenerator";
import { ProVersion } from "@/widgets/ProVersion";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="max-w-xl mx-auto">
        <TweetGenerator />
      </main>

      <section className="mt-8 md:mt-4 max-w-xl mx-auto">
        <ProVersion />
      </section>
    </div>
  );
}

import React from "react";
import LotteryCard from "@/components/LotteryCard";

export default function Home() {
  return (
    <main className="flex flex-col items-center pt-10 gap-[1rem]">
      <h1 className="text-[1.3rem] font-[700]">Latest Results</h1>
      <LotteryCard lotteryType="cosmic" />
      <LotteryCard lotteryType="classic" />
      <LotteryCard lotteryType="atomic" />
    </main>
  );
}

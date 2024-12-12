"use client"

import { useState } from "react";
import { storyStarters } from "@/starters";
import DarkModeToggle from "./components/DarkModeToggle";

export default function Home() {
  const [ count, setCount ] = useState(0)
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  const todayKey = mm + '-' + dd + '-' + yyyy;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DarkModeToggle></DarkModeToggle>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p className="text-gray-400">{todayKey}</p>
        <label htmlFor="individual_daily_prompt">{storyStarters[todayKey]}</label>
        <textarea id="individual_daily_prompt" cols={40} rows={10} placeholder="What happened next?" maxLength={1000} className="dark:bg-[#03254E]" onChange={e => setCount(e.target.value.length)}></textarea>
        <div className="justify-items-end">
        { count > 499 ?
          <p className="text-green-500">{count}/500</p>
          :
          <p>{count}/500</p>
        }
        </div>
        <div className="flex flex-row gap-16">
          <button className="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded">save</button>
          { count > 499 ?
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded">share</button>
          :
          <button disabled className="bg-gray-400 text-white font-bold py-2 px-6 rounded">share</button>
          }
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}

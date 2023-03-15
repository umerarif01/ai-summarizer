import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import Header from "../components/Header";
import SumText from "../components/SumText";
import SumDocument from "../components/SumDocument";

const Home: NextPage = () => {
  const [mode, setMode] = useState<Boolean>(true);

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>AI Summarizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mb-[100px] sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
          Effortlessly Summarize Texts and Documents
        </h1>
        <p className="sm:text-xl text-lg max-w-md font-bold text-slate-900 mt-5">
          Powered by OpenAI's GPT-3 API
        </p>
        <div className="flex mt-5 mb-[-5px]">
          <button
            className={`px-4 py-2 font-semibold ${
              mode ? "bg-black text-white" : "bg-gray-300 text-black"
            }`}
            onClick={() => setMode(!mode)}
          >
            Summarize Document
          </button>
          <button
            className={`px-7 py-2 font-semibold ${
              !mode ? "bg-black text-white" : "bg-gray-300 text-black"
            }`}
            onClick={() => setMode(!mode)}
          >
            Summarize Text
          </button>
        </div>

        {mode ? <SumDocument /> : <SumText />}

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
      </main>
      <footer className="w-full ">
        <p className="border-t-2 flex justify-center font-semibold py-2">
          Made with ❤️ by UMERXA
        </p>
      </footer>
    </div>
  );
};

export default Home;

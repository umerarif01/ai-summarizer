import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "./LoadingDots";

const SumText = () => {
  const [summaryLength, setSummaryLength] = useState<string>("short");
  const [text, setText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const currentModel = "text-davinci-003";

  function handleSummaryLengthChange(event: ChangeEvent<HTMLSelectElement>) {
    setSummaryLength(event.target.value);
  }

  function countWords(text: string): number {
    // Remove leading and trailing white space
    text = text.trim();

    // Count the number of words using regular expressions
    const words = text.match(/\S+/g);

    // Return the count of words
    return words ? words.length : 0;
  }

  function checkWordCount(text: string, maxWords: number = 2000) {
    const count = countWords(text);
    if (count > maxWords) {
      return false;
    }
    return true;
  }

  const prompt = `Please provide a summary of the following text that is ${summaryLength}: ${text}`;

  const summarizeText = async () => {
    if (!checkWordCount(text)) {
      toast("Text must be 2000 words or fewer", {
        icon: "❌",
      });
    }

    setSummary("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        currentModel,
      }),
    });
    const data = await response.json();
    setSummary(data.data);

    setLoading(false);
  };

  return (
    <div className="max-w-xl w-full">
      <div className="flex mt-10 items-center space-x-3 ">
        <Image src="/1-black.png" width={30} height={30} alt="1 icon" />
        <p className="text-left font-medium ">
          Enter the text you want to summarize.
        </p>
      </div>
      <textarea
        className="block p-2.5 my-3 w-full h-[100px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-black focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
        placeholder="Write your text here..."
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      {text && (
        <p className="my-2 text-left text-sm text-gray-500 text-semibold">
          Words Count: {countWords(text)}
        </p>
      )}

      <div className="flex mb-5 items-center space-x-3">
        <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
        <p className="text-left font-medium">Choose Summary Length:</p>
      </div>

      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
        value={summaryLength}
        onChange={handleSummaryLengthChange}
      >
        <option value="short">Short</option>
        <option value="medium">Medium</option>
        <option value="long">Long</option>
        <option value="extra-long">Extra-Long</option>
      </select>

      {!loading && (
        <button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
          onClick={summarizeText}
        >
          Summarize &rarr;
        </button>
      )}
      {loading && (
        <button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
          disabled
        >
          <LoadingDots color="white" style="large" />
        </button>
      )}

      {summary && (
        <>
          <label className="block my-2 text-md text-left font-medium text-gray-900 dark:text-white">
            Translation:
          </label>
          <div
            className="p-2.5 w-full text-sm text-left text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(summary);
              toast("Translation copied to clipboard", {
                icon: "✂️",
              });
            }}
          >
            <p> {summary}</p>
          </div>
          <p className="my-1 text-sm text-gray-500 dark:text-gray-300">
            Click on translation to copy on clipboard
          </p>
          <p className="my-2 text-left text-sm text-gray-500 text-semibold">
            Words Count: {countWords(summary)}
          </p>
        </>
      )}
    </div>
  );
};

export default SumText;

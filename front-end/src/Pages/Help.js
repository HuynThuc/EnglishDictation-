import React from "react";
import support from "../Images/support.jpg";

const Help = ({ theme }) => {
  return (
    <div
      className={`w-full min-h-screen flex justify-center ${
        theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-white text-black"
      }`}
    >
      <div className="max-w-4xl w-full my-8">
        {/*----- TITLE -----*/}
        <h1 className="text-3xl font-semibold mb-5">
          Support dailydictation.com
        </h1>
        {/*----- CONTENT -----*/}
        <div className="h-max grid grid-cols-2 gap-5">
          <div
            className={`shadow-xl rounded-md p-4 space-y-3 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <p>
              Hello friends! I'm Huy from Vietnam. I am the founder of
              dailydictation.com 🤗
            </p>
            <p>
              As a person who has used many different methods to learn English,
              I realized that dictation is an amazing way to improve my English.
              That's why I created this website to help all English learners
              practice easily and effectively.
            </p>
            <p>
              Building and maintaining a website takes time, money and effort. I
              need your help to keep the site running and to add more useful
              features.
            </p>
            <p>
              If you can help me with money, awesome 🤩! You can send me a
              donation to my PayPal / Bank accounts (see below).
            </p>
            <p>
              Another great way to help me is to share this website with your
              friends. 😇
            </p>
            <p>
              I sincerely appreciate your support!
              <br />
              Thank you!!!!
            </p>
          </div>
          <div>
            <img src={support} alt="" />
          </div>
        </div>
        {/*----- DONATE INFORMATION -----*/}
        <div className="h-max grid grid-cols-2 gap-5 my-8">
          {/* Letf Side */}
          <div className="space-y-3">
            <div>------------------------</div>
            <p>
              If you want to send me a donation,{" "}
              <span className="font-bold">
                please mention your username or email
              </span>
              , I will disable ads for your account!
            </p>
            <p className="flex gap-2">
              PayPal or Credit/Debit card:
              <a
                href="https://ko-fi.com/khnguyen"
                target="_blank"
                rel="noreferrer"
                className="underline text-blue-600 hover:text-blue-700"
              >
                https://ko-fi.com/khnguyen
              </a>
            </p>
            <p className="flex gap-2 items-end">
              Vietcombank:
              <span className="text-pink-400 text-sm">
                9379900070 (Nguyen Khoa Huy)
              </span>
            </p>
            <p className="flex gap-2 items-end">
              MoMo:
              <span className="text-pink-400 text-sm">
                0379900070 (Nguyen Khoa Huy)
              </span>
            </p>
            <p className="flex gap-2 items-end">
              Bitcoin address:
              <span className="text-pink-400 text-sm">
                bc1q9msxqs8m9tzzh0efz7yl4dzlzkyumpdmduwjl6
              </span>
            </p>
            <p className="flex gap-2 items-end">
              USDT:
              <span className="text-pink-400 text-sm">
                TNFUfBoZWyjucUeVqvaZ2jPuW9Xu7mg4o9
              </span>
            </p>
            <p className="flex gap-2 items-end">
              USDC:
              <span className="text-pink-400 text-sm">
                0xdbba916eb8eed2631a3a66b91a15eb710716d465
              </span>
            </p>
          </div>
          {/* Right side */}
          <div className="space-y-3">
            <div>------------------------</div>
            <p>
              All the donations I have received are listed{" "}
              <a
                href="https://docs.google.com/spreadsheets/d/1-CsKil1Wf3rvESNLtuC-zPUAe7GrL9RXATIaI6GX9dg/edit?pli=1&gid=0#gid=0"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                HERE.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;

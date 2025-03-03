import React from "react";
import { BsTrophyFill } from "react-icons/bs";

const users = [
  { name: "Nguyen Van A", activeHours: 21 },
  { name: "Nguyen Thi B", activeHours: 20 },
  { name: "Tran Van C", activeHours: 19 },
  { name: "Le Van D", activeHours: 18 },
  { name: "Pham Thi E", activeHours: 17 },
];

const TopUsers = ({ theme }) => {
  return (
    <div
      className={`w-full min-h-screen flex justify-center mt-40 ${
        theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-white text-black"
      }`}
    >
      <div className="max-w-4xl w-full grid grid-cols-2 gap-5 mt-5">
        {/* LEFT BOX */}
        <div
          className={`shadow-xl border h-max rounded-md p-4 pb-8 ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          <h1 className="text-2xl font-semibold">Top 30 users (last 7 days)</h1>
          <div
            className={`grid grid-cols-[0.5fr_2fr_1fr] grid-flow-col border-b py-2 mt-10 font-bold ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            <p>#</p>
            <p>Username</p>
            <p>Active time</p>
          </div>
          {users.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-[0.5fr_2fr_1fr] grid-flow-col border-b py-3 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <p>{index + 1}</p>
              <p className="flex gap-3 items-center">
                <span className="text-blue-500 underline cursor-pointer">
                  {item.name}
                </span>
                {index === 0 && (
                  <BsTrophyFill size={24} className="text-yellow-400" />
                )}
              </p>
              <p>{item.activeHours}+ hours</p>
            </div>
          ))}
        </div>
        {/* RIGHT BOX */}
        <div
          className={`shadow-xl border h-max rounded-md p-4 pb-8 ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          <h1 className="text-2xl font-semibold">Top 30 users (last 7 days)</h1>
          <div
            className={`grid grid-cols-[0.5fr_2fr_1fr] grid-flow-col border-b py-2 mt-10 font-bold ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            <p>#</p>
            <p>Username</p>
            <p>Active time</p>
          </div>
          {users.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-[0.5fr_2fr_1fr] grid-flow-col border-b py-3 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <p>{index + 1}</p>
              <p className="flex gap-3">
                <span className="text-blue-500 underline cursor-pointer">
                  {item.name}
                </span>
                {index === 0 && (
                  <BsTrophyFill size={24} className="text-yellow-400" />
                )}
              </p>
              <p>{item.activeHours}+ hours</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopUsers;

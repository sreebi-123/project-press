import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const KpiCard = ({ title, icon: Icon, todayValue, monthValue, growth }) => {
  const [mode, setMode] = useState("today");

  const displayTitle = `${title} / ${mode === "today" ? "Today" : "Month"}`;
  const value = mode === "today" ? todayValue : monthValue;
  const currentGrowth = growth?.[mode] ?? 0;
  const isPositive = currentGrowth >= 0;

  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between h-40 relative group transition min-w-[200px]">
      {/* 3 Dots Menu */}
      <div className="absolute top-3 right-3 z-10">
        <div className="relative">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <FiMoreVertical size={18} />
          </button>
          <div className="absolute right-0 mt-2 w-24 bg-white rounded shadow text-sm hidden group-hover:block">
            <button
              onClick={() => setMode("today")}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                mode === "today" ? "font-semibold" : ""
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setMode("month")}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                mode === "month" ? "font-semibold" : ""
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-gray-600 text-sm font-semibold mb-2">
        {displayTitle}
      </h4>

      {/* Value + Icon + Growth */}
      <div className="flex mt-auto">
        <div className="p-4 bg-indigo-100/40 rounded-full">
          <Icon className="text-indigo-400" size={35} />
        </div>

        <div className="text-left pl-5">
          <div className="text-2xl font-medium text-gray-800 ">{value}</div>
          <div
            className={`flex items-center text-xs mt-1 justify-end ${
              isPositive ? "text-green-600" : "text-red-500"
            }`}
          >
            {isPositive ? (
              <>
                <FaArrowUp size={12} className="mr-1" />
                {Math.abs(currentGrowth).toFixed(1)}% increase
              </>
            ) : (
              <>
                <FaArrowDown size={12} className="mr-1" />
                {Math.abs(currentGrowth).toFixed(1)}% decrease
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;

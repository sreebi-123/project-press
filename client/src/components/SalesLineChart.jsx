import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const dataToday = [
  { time: "9 ", sales: 200, revenue: 500, customers: 150 },
  { time: "10 ", sales: 400, revenue: 800, customers: 500 },
  { time: "11 ", sales: 200, revenue: 650, customers: 200 },
  { time: "12 ", sales: 100, revenue: 720, customers: 280 },
  { time: "1 ", sales: 300, revenue: 900, customers: 500 },
  { time: "2 ", sales: 150, revenue: 610, customers: 400 },
  { time: "3 ", sales: 500, revenue: 850, customers: 300 },
  { time: "4 ", sales: 250, revenue: 1000, customers: 200 },
  { time: "5 ", sales: 200, revenue: 720, customers: 250 },
];

const dataMonth = [
  { time: "Jun 1", sales: 50, revenue: 5000, customers: 35 },
  { time: "Jun 2", sales: 65, revenue: 6200, customers: 42 },
  { time: "Jun 3", sales: 58, revenue: 5800, customers: 38 },
  { time: "Jun 4", sales: 70, revenue: 7100, customers: 46 },
  { time: "Jun 5", sales: 62, revenue: 6400, customers: 40 },
  { time: "Jun 6", sales: 74, revenue: 7500, customers: 48 },
];

const SalesLineChart = () => {
  const [view, setView] = useState("today");

  const toggleView = () => {
    setView((prev) => (prev === "today" ? "month" : "today"));
  };

  const chartData = view === "today" ? dataToday : dataMonth;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-gray-800">
          Reports
          {/* 
          <span className="text-indigo-600 capitalize">
            {view === "today" ? "Today" : "This Month"}
          </span>
              */}
        </h3>
        <button
          onClick={toggleView}
          className="flex items-center cursor-pointer gap-2 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition"
        >
          {view === "today" ? "Today" : "This Month"}{" "}
          <FaChevronDown size={12} />
        </button>
      </div>

      <div className="w-full mt-2 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="time" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#059669"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="customers"
              stroke="#D97706"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesLineChart;

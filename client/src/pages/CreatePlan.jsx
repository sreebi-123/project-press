import { useState } from "react";
import { useCreatePlanMutation } from "../slices/paymentApiSlice";

export default function CreatePlan() {
  const [formData, setFormData] = useState({
    item_name: "",
    amount: "",
    currency: "INR",
    description: "",
    period: "monthly",
    interval: "",
    notes_key_1: "",
    notes_key_2: "",
  });

  const [createPlan] = useCreatePlanMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plan = await createPlan({
      period: formData.period,
      interval: parseInt(formData.interval),
      item: {
        name: formData.item_name,
        amount: parseInt(formData.amount),
        currency: formData.currency,
        description: formData.description,
      },
      notes: {
        notes_key_1: formData.notes_key_1,
        notes_key_2: formData.notes_key_2,
      },
    });
    console.log(plan);
    setFormData({
      item_name: "",
      amount: "",
      currency: "INR",
      description: "",
      period: "monthly",
      interval: "",
      notes_key_1: "",
      notes_key_2: "",
    });
  };

  return (
    <div className="flex items-center justify-center mt-20 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-700 w-full max-w-3xl mx-4 md:p-8 p-4 py-8 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-600">
          Create Plan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="item_name"
            placeholder="Plan Name"
            value={formData.item_name}
            onChange={handleChange}
            className="border border-gray-300 outline-none rounded py-2.5 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-200 transition w-full"
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="border border-gray-300 outline-none rounded py-2.5 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-200 transition w-full"
            required
          />

          {/* <input
            type="text"
            name="currency"
            placeholder="Currency (e.g., INR)"
            value={formData.currency}
            onChange={handleChange}
            className="border bg-indigo-50 border-gray-300 outline-none rounded py-2.5 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-200 transition w-full"
            required
          /> */}
          <select
            name="period"
            value={formData.period}
            onChange={handleChange}
            className="border cursor-pointer border-gray-300 outline-none rounded py-2.5 px-3 w-full"
            required
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <input
            type="number"
            name="interval"
            placeholder="Interval"
            value={formData.interval}
            onChange={handleChange}
            className="border  border-gray-300 outline-none rounded py-2.5 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-200 transition w-full"
            required
          />
          <input
            type="text"
            name="notes_key_1"
            placeholder="Notes key 1"
            value={formData.notes_key_1}
            onChange={handleChange}
            className="border border-gray-300 outline-none rounded py-2.5 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-200 transition w-full"
          />
          <input
            type="text"
            name="notes_key_2"
            placeholder="Notes key 2"
            value={formData.notes_key_2}
            onChange={handleChange}
            className="border border-gray-300 outline-none rounded py-2.5 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-200 transition w-full"
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 outline-none rounded py-3 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-200 transition w-full mt-4 resize-none h-28"
        />

        <button
          type="submit"
          disabled={true}
          className="py-3 disable mx-auto flex px-20 mt-6 cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95  rounded text-white font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Create Plan
        </button>
      </form>
    </div>
  );
}

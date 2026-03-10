import {
    useGetAllPlansQuery,
    useSetVisiblePlanMutation,
  } from "../slices/paymentApiSlice";
  
  export default function AdminPlan() {
    const { data: plans, isLoading } = useGetAllPlansQuery();
    const [setVisiblePlan] = useSetVisiblePlanMutation();
  
    if (isLoading) return <p>Loading...</p>;
  
    return (
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="overflow-hidden rounded-lg shadow transition hover:scale-[1.02]"
          >
            <div
              className={`p-6 text-white bg-gradient-to-r ${
                plan.isVisible
                  ? "from-green-500 to-emerald-600"
                  : "from-purple-500 to-indigo-600"
              }`}
            >
              <h3 className="text-xl font-bold">{plan.item_name}</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-3xl font-bold">₹{plan.amount}</span>
                <span className="ml-1 text-sm">/{plan.period}</span>
              </div>
              <p className="mt-2 text-sm italic">
                {plan.isVisible ? "Currently active" : "Not active"}
              </p>
            </div>
            <div className="bg-white p-6">
              <ul className="mb-6 space-y-2 text-sm text-gray-600">
                <li>
                  <strong>Razorpay ID:</strong>{" "}
                  {plan.razorpayPlanId || "Not specified"}
                </li>
                <li>
                  <strong>Currency:</strong> {plan.currency}
                </li>
                <li>
                  <strong>Interval:</strong> {plan.interval}
                </li>
                <li>
                  <strong>Description:</strong>{" "}
                  {plan.description || "Not specified"}
                </li>
                <li>
                  <strong>Notes Key 1:</strong>{" "}
                  {plan.notes_key_1 || "Not specified"}
                </li>
                <li>
                  <strong>Notes Key 2:</strong>{" "}
                  {plan.notes_key_2 || "Not specified"}
                </li>
  
                {/* <li>
                  <strong>Visible:</strong>{" "}
                  {plan.isVisible ? (
                    <span className="text-green-600 font-medium">Active</span>
                  ) : (
                    <span className="text-red-500 font-medium">Inactive</span>
                  )}
                </li> */}
              </ul>
              <button
                onClick={() => setVisiblePlan(plan._id)}
                className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-white text-sm font-medium transition-opacity hover:opacity-90"
              >
                Show this plan
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
import { useSelector } from "react-redux";
import { loadRazorpayScript } from "../../utils/loadRazorpay";
import {
  useCreateSubscriptionMutation,
  useGetVisiblePlanQuery,
} from "../slices/paymentApiSlice";

export default function SubscriptionCard() {
  const { data: plan, isLoading } = useGetVisiblePlanQuery();
  const [createSubscription] = useCreateSubscriptionMutation();
  const { name, email, phone } = useSelector((state) => state?.auth?.userInfo);

  if (isLoading) return <p>Loading...</p>;
  const planId = plan?.razorpayPlanId;

  // console.log(planId);

  // Collect notes only if present
  const notes = [];
  if (plan.notes_key_1) notes.push(plan.notes_key_1);
  if (plan.notes_key_2) notes.push(plan.notes_key_2);

  const handleSubscribe = async () => {
    try {
      console.log(name, email, phone);
      const data = await createSubscription({
        planId,
        name,
        email,
        phone,
      }).unwrap();

      console.log(data);
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        return console.log("Razorpay SDK failed to load. Are you online?");
      }

      const options = {
        key: import.meta.env.VITE_RZP_KEY_ID,
        subscription_id: data.subscriptionId,
        name: "PrintPress",
        description: "Subscription Payment",
        image: "/logo.png",
        handler: function () {
          console.log("Successfull");
        },
        prefill: {
          email,
          contact: phone,
          name,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Subscription error", error);
      // alert("Error creating subscription");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-sm mx-auto overflow-hidden rounded-lg shadow transition hover:scale-[1.02]">
        {/* Gradient header only for title */}
        <div className="p-4 text-white bg-gradient-to-r from-purple-500 to-indigo-600">
          <h3 className="text-xl font-bold text-center">Subscription</h3>
        </div>

        <div className="bg-white p-6">
          <div className="flex items-baseline justify-center">
            <span className="text-3xl font-bold">₹{plan.amount}</span>
            <span className="ml-1 text-sm">/{plan.period}</span>
          </div>
          <p className="mt-5 text-center text-sm italic text-gray-600">
            {plan.description || "No description provided"}
          </p>

          {/* Show notes list only if there are notes */}
          {notes.length > 0 && (
            <ul className="mt-6 mb-6 space-y-2 text-sm text-gray-600">
              {notes.map((note, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="mt-0.5 mr-2 h-5 w-5 text-purple-500 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={handleSubscribe}
            className="w-full mt-10 cursor-pointer rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-white text-sm font-medium transition-opacity hover:opacity-90"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

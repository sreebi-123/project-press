// import React from "react";
// import { useCreateOrderMutation } from "../slices/paymentApiSlice.js";
// import { useEffect } from "react";

// export default function PrintingPressPaymentCard() {
//   const [createOrder] = useCreateOrderMutation();

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handleSubscribe = async () => {
//     const amount = 19900; // ₹199 in paise

//     try {
//       const order = await createOrder(amount).unwrap();

//       const options = {
//         key: "YOUR_KEY_ID", // From .env or Razorpay dashboard
//         amount: order.amount,
//         currency: order.currency,
//         name: "PrintPress",
//         description: "Premium Plan",
//         order_id: order.id,
//         handler: function (response) {
//           alert("Payment Success: " + response.razorpay_payment_id);
//           // You can call backend verification here
//         },
//         prefill: {
//           name: "Customer Name",
//           email: "test@example.com",
//           contact: "9000000000",
//         },
//         theme: {
//           color: "#6366f1",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Payment initiation failed", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 flex items-center justify-center p-4">
//       <div className="bg-black bg-opacity-70 max-w-md w-full text-white rounded-2xl p-6 space-y-6 shadow-xl">

//         <div className="text-center space-y-2">
//           <div className="flex justify-center items-center space-x-2">
//             <div className="bg-indigo-500 rounded-sm px-2 py-1 font-bold">
//               PrintPress
//             </div>
//             <span className="text-xl font-semibold">Premium Plan</span>
//           </div>
//           <h1 className="text-2xl font-bold">
//             Professional Printing,<br />
//             Seamless Experience.
//           </h1>
//         </div>

//         <p className="text-sm text-gray-300 text-center">
//           Get high-quality prints, priority support, and unlimited order uploads.
//         </p>
//         <p className="text-sm text-gray-300 text-center">
//           Flexible monthly and prepaid plans starting at ₹199.00/month.
//         </p>

//         <button
//           onClick={handleSubscribe}
//           className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-full font-semibold transition duration-300"
//         >
//           Subscribe to PrintPress Premium
//         </button>

//         <p className="text-center text-sm text-gray-400">
//           Or choose a <span className="text-blue-400 underline">business</span> or <span className="text-blue-400 underline">enterprise</span> plan
//         </p>

//         <p className="text-xs text-gray-500 text-center">
//           By subscribing, you agree to our <span className="text-blue-400 underline">terms & conditions</span>. No refunds for partial billing periods. <span className="text-blue-400 underline">Policies apply</span>.
//         </p>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect } from "react";
// import { useCreateOrderMutation } from "../slices/paymentApiSlice.js";

// export default function PrintingPressPaymentPage() {
//   const [createOrder] = useCreateOrderMutation();

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handleSubscribe = async () => {
//     const amount = 19900; // ₹199 in paise

//     try {
//       const order = await createOrder(amount).unwrap();

//       const options = {
//         key: "YOUR_KEY_ID", // Replace with Razorpay Key ID
//         amount: order.amount,
//         currency: order.currency,
//         name: "PrintPress",
//         description: "Premium Plan Subscription",
//         order_id: order.id,
//         handler: function (response) {
//           alert("Payment Success: " + response.razorpay_payment_id);
//           // Optionally verify payment on backend
//         },
//         prefill: {
//           name: "Customer Name",
//           email: "test@example.com",
//           contact: "9000000000",
//         },
//         theme: {
//           color: "#4F46E5",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Payment initiation failed", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 to-blue-950 text-white flex flex-col items-center justify-center px-6 py-10">
//       {/* Header Section */}
//       <div className="max-w-xl w-full">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold tracking-tight mb-2">
//             Upgrade to <span className="text-indigo-400">Premium</span>
//           </h1>
//           <p className="text-gray-400">
//             Unlock professional tools for seamless high-quality printing with PrintPress Premium.
//           </p>
//         </div>

//         {/* Card UI */}
//         <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-6">
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xl font-semibold">PrintPress Premium</h2>
//               <span className="bg-indigo-600 text-xs px-3 py-1 rounded-full font-medium">
//                 ₹199/month
//               </span>
//             </div>
//             <p className="text-sm text-gray-400">
//               Includes high-priority support, unlimited order uploads, and exclusive print templates.
//             </p>
//           </div>

//           {/* Features */}
//           <ul className="text-sm space-y-2 text-gray-300">
//             <li> Unlimited Print Uploads</li>
//             <li>24/7 Priority Support</li>
//             <li> Access to Premium Templates</li>
//             <li> Discounted Bulk Orders</li>
//           </ul>

//           {/* Subscribe Button */}
//           <button
//             onClick={handleSubscribe}
//             className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition duration-300"
//           >
//             Pay Now
//           </button>

//           {/* Footer Links */}
//           {/* <div className="text-xs text-center text-gray-500 mt-4">
//             By subscribing, you agree to our{" "}
//             <a href="/terms" className="underline text-blue-400">Terms</a> &{" "}
//             <a href="/policies" className="underline text-blue-400">Policies</a>.
//             No refunds for partial billing periods.
//           </div> */}

//           <div className="text-sm text-center text-gray-400 mt-2">
//             Looking for more? Check out our{" "}
//             <a href="/business" className="text-blue-400 underline">Business</a> and{" "}
//             <a href="/enterprise" className="text-blue-400 underline">Enterprise</a> plans.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useSelector } from "react-redux";
import { useRazorpay } from "../components/razorpayCheckout";
import { useNavigate } from "react-router-dom";

export default function PrintingPressPaymentPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const ShopId = userInfo?._id;
  const checkout = useRazorpay();
  const navigate = useNavigate();

  const handleSubscription = () => {
    checkout({
      path: "shop",
      payload: { amount: 4000 * 100, ShopId, userInfo }, // ₹4000 converted to paise
      onSuccess: () => navigate("/admin"),
      onError: (err) => console.log(err),
    });
  };

  return (
    <div className="flex-1 pb-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4 flex justify-center">
        <div className="max-w-xl w-full bg-white rounded-lg shadow border border-gray-200 p-6 md:p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Start Your{" "}
              <span className="text-indigo-600 font-bold">Journey</span>
            </h2>
            <p className="text-gray-500 text-sm">
              Unlock the full potential of our PrintPress platform with tools
              designed specifically for growing printing press businesses.
            </p>
          </div>

          <div className="bg-gray-50 rounded-md p-5 border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-700">
                PrintPress Plan
              </h3>
              <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                ₹4000/month
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Essential for running your printing press business efficiently
              with full staff control, order workflow, and client management.
            </p>

            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Employee & Role Management</li>
              <li>Full Order Workflow (Design → Print → Production)</li>
              <li>Online Client Order Tracking & Payment</li>
              <li>Monthly Activity Logs & Reporting</li>
            </ul>
          </div>

          <button
            onClick={handleSubscription}
            className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg text-sm transition"
          >
            Pay ₹4000 & Subscribe
          </button>

          <div className="text-xs text-center text-gray-400 mt-2">
            Need more customization or features?{" "}
            <a href="/contact" className="text-blue-500 underline">
              Contact our support
            </a>{" "}
            to discuss business-specific plans.
          </div>
        </div>
      </div>
    </div>
  );
}

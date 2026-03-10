// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   useGetOrderByIdQuery,
//   useUpdateBillingMutation,
//   useMarkOrderAsPaidMutation,
// } from "../slices/orderSlice";
// import { useSelector } from "react-redux";
// import { FaPlus, FaRupeeSign } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const BillingDetailsPage = () => {
//   const { id: orderId } = useParams();
//   const navigate = useNavigate();

//   console.log("Billing Page Order ID:", orderId);
//   const { data: order, isLoading } = useGetOrderByIdQuery(orderId);
//   const [updateBilling] = useUpdateBillingMutation();
//   const [markAsPaid] = useMarkOrderAsPaidMutation();

//   const user = useSelector((state) => state.auth.userInfo);
//   const userRole = user?.role;
//   console.log("User role:", userRole);

//   const [workDescription, setWorkDescription] = useState("");
//   const [charges, setCharges] = useState([
//     { label: "Designing", amount: "" },
//     { label: "Printing", amount: "" },
//     { label: "Production", amount: "" },
//   ]);
//   const [newChargeLabel, setNewChargeLabel] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("cash");

//   // useEffect(() => {
//   //   if (order?.billingDetails) {
//   //     setWorkDescription(order.billingDetails.workDescription || "");
//   //     setCharges(order.billingDetails.charges || []);
//   //     setPaymentMethod(order.billingDetails.paymentMethod || "cash");
//   //   }
//   // }, [order]);
//   useEffect(() => {
//     if (order?.billingDetails) {
//       setWorkDescription(order.billingDetails.workDescription || "");

//       const defaultLabels = ["Designing", "Printing", "Production"];
//       const existingCharges = order.billingDetails.charges || [];

//       const mergedCharges = defaultLabels.map(label => {
//         const found = existingCharges.find(item => item.label === label);
//         return found ? found : { label, amount: "" };
//       });

//       // Add any additional custom charges (not in default list)
//       const otherCharges = existingCharges.filter(
//         item => !defaultLabels.includes(item.label)
//       );

//       setCharges([...mergedCharges, ...otherCharges]);
//       setPaymentMethod(order.billingDetails.paymentMethod || "cash");
//     }
//   }, [order]);


//   const handleAddCharge = () => {
//     if (!newChargeLabel.trim()) return toast.error("Enter charge name");
//     setCharges([...charges, { label: newChargeLabel, amount: "" }]);
//     setNewChargeLabel("");
//   };

//   const handleChangeAmount = (index, value) => {
//     const updated = [...charges];
//     updated[index].amount = value.replace(/[^0-9]/g, "");
//     setCharges(updated);
//   };

//   const getTotalAmount = () => {
//     return charges.reduce((total, item) => total + Number(item.amount || 0), 0);
//   };

//   // const handleSubmit = async () => {
//   //   try {
//   //     const billingData = {
//   //       billingDetails: {
//   //         workDescription,
//   //         charges,
//   //         total: getTotalAmount(),
//   //         paymentMethod,
//   //       },
//   //     };
//   //     await updateBilling({ id: orderId, billingDetails: billingData.billingDetails }).unwrap();
//   //     toast.success("Billing submitted");
//   //   } catch (err) {
//   //     toast.error("Billing update failed");
//   //   }
//   // };
//   const handleSubmit = async () => {
//     try {
//       const billingData = {
//         billingDetails: {
//           workDescription,
//           charges: charges.map((item) => ({
//             label: item.label,
//             amount: Number(item.amount), // ✅ convert to Number
//           })),
//           total: getTotalAmount(),
//           paymentMethod,
//         },
//       };

//       await updateBilling({ id: orderId, billingDetails: billingData.billingDetails }).unwrap();
//       toast.success("Billing submitted");
//     } catch (err) {
//       console.error("Billing error:", err); // ✅ log exact error
//       toast.error("Billing update failed");
//     }
//   };

//   const handleMarkAsPaid = async () => {
//     try {
//       await markAsPaid(orderId).unwrap();
//       toast.success("Marked as paid");
//     } catch (err) {
//       toast.error("Failed to mark as paid");
//     }
//   };

//   const handleGenerateInvoice = () => {
//     navigate(`/invoice/${orderId}`);
//   };


//   if (isLoading || !order) return <div className="text-center">Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-lg space-y-6">
//       <h2 className="text-xl font-semibold text-indigo-600 mb-4">
//         Billing for Order #{orderId}
//       </h2>

//       {/* ✅ Customer and Order Info */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded p-4 bg-gray-50">
//         <div>
//           <p className="font-semibold">Customer Name:</p>
//           <p>{order?.walkInCustomer?.name || order?.onlineCustomer?.name || "-"}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Phone:</p>
//           <p>{order?.walkInCustomer?.phone || "-"}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Job Type:</p>
//           <p>{order?.jobType}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Order Type:</p>
//           <p>{order?.orderType}</p>
//         </div>
//       </div>

//       {/* ✅ Work Description */}
//       <div>
//         <label className="block mb-1 font-medium">Work Description (optional)</label>
//         <textarea
//           rows={3}
//           value={workDescription}
//           onChange={(e) => setWorkDescription(e.target.value)}
//           className="w-full border rounded px-3 py-2"
//         />
//       </div>

//       {/* ✅ Charges Section */}
//       <div className="space-y-3">
//         <p className="font-semibold text-gray-700">Charges:</p>
//         {charges.map((item, index) => (
//           <div key={index} className="flex items-center gap-3">
//             <span className="w-32 font-medium">{item.label}</span>
//             <div className="flex items-center w-full">
//               <FaRupeeSign className="text-gray-500 mr-1" />
//               <input
//                 type="text"
//                 value={item.amount}
//                 onChange={(e) => handleChangeAmount(index, e.target.value)}
//                 className="border rounded px-3 py-1 w-full"
//               />
//             </div>
//           </div>
//         ))}

//         {/* ✅ Add Custom Charge */}
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             value={newChargeLabel}
//             onChange={(e) => setNewChargeLabel(e.target.value)}
//             placeholder="Add other charge"
//             className="border px-3 py-1 rounded w-full"
//           />
//           <button
//             onClick={handleAddCharge}
//             className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//           >
//             <FaPlus />
//           </button>
//         </div>
//       </div>

//       {/* ✅ Total & Payment Method */}
//       <div className="flex justify-between items-center font-semibold text-lg text-indigo-600 border-t pt-4">
//         <span>Total</span>
//         <span>₹ {getTotalAmount()}</span>
//       </div>

//       <div>
//         <label className="block mb-1 font-medium">Payment Method</label>
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         >
//           <option value="cash">Cash</option>
//           <option value="gpay">GPay</option>
//         </select>
//       </div>

//       {/* ✅ Action Buttons */}
//       <div className="flex flex-col sm:flex-row gap-3 justify-end mt-4">
//         <button
//           onClick={handleSubmit}
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//         >
//           Submit Billing
//         </button>

//         {/* {(userRole === "admin" || userRole === "receptionist") && (
//           <button
//             onClick={handleMarkAsPaid}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Mark as Paid
//           </button>
//         )} */}
//         {userRole === "admin" &&
//           order?.billingDetails?.paymentMethod !== "credit" &&
//           !order?.billingDetails?.isPaid && (
//             <button
//               onClick={handleMarkAsPaid}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               Mark as Paid
//             </button>
//           )}
//         <button onClick={handleGenerateInvoice} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
//           Generate invoice
//         </button>
//       </div>
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>

//   );
// };

// export default BillingDetailsPage;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useUpdateBillingMutation,
  useMarkOrderAsPaidMutation,
} from "../slices/orderSlice";
import { useSelector } from "react-redux";
import { FaPlus, FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BillingDetailsPage = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading, refetch } = useGetOrderByIdQuery(orderId);
  const [updateBilling] = useUpdateBillingMutation();
  const [markAsPaid] = useMarkOrderAsPaidMutation();

  const user = useSelector((state) => state.auth.userInfo);
  const userRole = user?.role;

  const [workDescription, setWorkDescription] = useState("");
  const [charges, setCharges] = useState([]);
  const [newChargeLabel, setNewChargeLabel] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
  if (order?.billingDetails) {
    setWorkDescription(order.billingDetails.workDescription || "");

    const defaultLabels = ["Designing", "Printing", "Production"];
    const existingCharges = order.billingDetails.charges || [];

    const mergedCharges = defaultLabels.map((label) => {
      const found = existingCharges.find((item) => item.label === label);
      return found ? found : { label, amount: "" };
    });

    const otherCharges = existingCharges.filter(
      (item) => !defaultLabels.includes(item.label)
    );

    // 🔧 Deep clone to avoid modifying frozen Redux objects
    const clonedCharges = [...mergedCharges, ...otherCharges].map(item => ({ ...item }));
    setCharges(clonedCharges);

    setPaymentMethod(order.billingDetails.paymentMethod || "cash");

    if (!order.billingDetails.total) {
      setIsEditing(true); // First time billing
    }
  }
}, [order]);



  const handleAddCharge = () => {
    if (!newChargeLabel.trim()) return toast.error("Enter charge name");
    setCharges([...charges, { label: newChargeLabel, amount: "" }]);
    setNewChargeLabel("");
  };

  const handleChangeAmount = (index, value) => {
    const updated = [...charges];
    updated[index].amount = value.replace(/[^0-9]/g, "");
    setCharges(updated);
  };

  const handleDeleteCharge = (index) => {
    const updated = [...charges];
    updated.splice(index, 1);
    setCharges(updated);
  };

  const getTotalAmount = () => {
    return charges.reduce((total, item) => total + Number(item.amount || 0), 0);
  };

  const handleSubmit = async () => {
    try {
      const billingData = {
        billingDetails: {
          workDescription,
          charges: charges.map((item) => ({
            label: item.label,
            amount: Number(item.amount),
          })),
          total: getTotalAmount(),
          paymentMethod,
        },
      };

      await updateBilling({ id: orderId, billingDetails: billingData.billingDetails }).unwrap();
      toast.success("Billing submitted");
      setIsEditing(false); // lock again after submit
      refetch();
    } catch (err) {
      console.error("Billing error:", err);
      toast.error("Billing update failed");
    }
  };

  const handleMarkAsPaid = async () => {
    try {
      await markAsPaid(orderId).unwrap();
      toast.success("Marked as paid");
      refetch();
    } catch (err) {
      toast.error("Failed to mark as paid");
    }
  };

  const handleGenerateInvoice = () => {
    navigate(`/invoice/${orderId}`);
  };

  const handleEditBilling = () => {
    setIsEditing(true); // unlock fields
  };

  if (isLoading || !order) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-lg space-y-6">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">
        Billing for Order #{orderId}
      </h2>

      {/* Customer Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded p-4 bg-gray-50">
        <div>
          <p className="font-semibold">Customer Name:</p>
          <p>{order?.walkInCustomer?.name || order?.onlineCustomer?.name || "-"}</p>
        </div>
        <div>
          <p className="font-semibold">Phone:</p>
          <p>{order?.walkInCustomer?.phone || "-"}</p>
        </div>
        <div>
          <p className="font-semibold">Job Type:</p>
          <p>{order?.jobType}</p>
        </div>
        <div>
          <p className="font-semibold">Order Type:</p>
          <p>{order?.orderType}</p>
        </div>
      </div>

      {/* Work Description */}
      <div>
        <label className="block mb-1 font-medium">Work Description (optional)</label>
        <textarea
          rows={3}
          value={workDescription}
          onChange={(e) => setWorkDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
          disabled={!isEditing}
        />
      </div>

      {/* Charges */}
      <div className="space-y-3">
        <p className="font-semibold text-gray-700">Charges:</p>
        {charges.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="w-32 font-medium">{item.label}</span>
            <div className="flex items-center w-full gap-2">
              <FaRupeeSign className="text-gray-500" />
              <input
                type="text"
                value={item.amount}
                onChange={(e) => handleChangeAmount(index, e.target.value)}
                className="border rounded px-3 py-1 w-full"
                disabled={!isEditing}
              />
              {/* Only allow delete for custom charges AND when editing */}
              {!["Designing", "Printing", "Production"].includes(item.label) && isEditing && (
                <button
                  onClick={() => handleDeleteCharge(index)}
                  className="text-red-500 hover:text-red-700 font-bold text-lg"
                  title="Remove"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add other charge */}
        {isEditing && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newChargeLabel}
              onChange={(e) => setNewChargeLabel(e.target.value)}
              placeholder="Add other charge"
              className="border px-3 py-1 rounded w-full"
            />
            <button
              onClick={handleAddCharge}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              <FaPlus />
            </button>
          </div>
        )}
      </div>

      {/* Total + Payment */}
      <div className="flex justify-between items-center font-semibold text-lg text-indigo-600 border-t pt-4">
        <span>Total</span>
        <span>₹ {getTotalAmount()}</span>
      </div>

      <div>
        <label className="block mb-1 font-medium">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          disabled={!isEditing}
        >
          <option value="cash">Cash</option>
          <option value="gpay">GPay</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end mt-4">
        {isEditing ? (
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Submit Billing
          </button>
        ) : (
          userRole === "admin" && (
            <button
              onClick={handleEditBilling}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Edit Billing
            </button>
          )
        )}

        {userRole === "admin" &&
          order?.billingDetails?.paymentMethod !== "credit" &&
          !order?.billingDetails?.isPaid && (
            <button
              onClick={handleMarkAsPaid}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Mark as Paid
            </button>
          )}

        <button
          onClick={handleGenerateInvoice}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Generate Invoice
        </button>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default BillingDetailsPage;

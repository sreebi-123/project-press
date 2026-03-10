// import React, { useState } from "react";
// import {
//   useGetDesignCompleteOrdersQuery,
//   useMarkOrderAsPrintedMutation,
// } from "../slices/orderSlice";
// import DesignPreviewModal from "../pages/DesignPreview";

// const PrintingDashboard = () => {
//   const { data, isLoading, error } = useGetDesignCompleteOrdersQuery();
//   const [markAsPrinted] = useMarkOrderAsPrintedMutation();
//   const [selectedDesign, setSelectedDesign] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleViewDesign = (designUrl) => {
//     setSelectedDesign(designUrl);
//     setModalOpen(true);
//   };

//   const handleMarkAsPrinted = async (orderId) => {
//     try {
//       await markAsPrinted(orderId).unwrap();
//       refetch(); // refresh after updating status
//     } catch (err) {
//       console.error("Error marking as printed:", err);
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">Failed to load orders</p>;

//   // ✅ backend response format: { orders: [] }
//   const orders = data?.orders || [];

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Completed Orders for Printing</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-500">No completed orders available.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => {
//             const customerName =
//               order.walkInCustomer?.name ||
//               order.onlineCustomer?.name ||
//               "Unknown";

//             return (
//               <div
//                 key={order._id}
//                 className="border p-4 rounded shadow flex justify-between items-center"
//               >
//                 <div className="space-y-1">
//                   <p>
//                     <strong>Customer:</strong> {customerName}
//                   </p>
//                   <p>
//                     <strong>Job Type:</strong> {order.jobType || "N/A"}
//                   </p>
//                   <p>
//                     <strong>Order ID:</strong> {order._id}
//                   </p>
//                   <p>
//                     <strong>Status:</strong>{" "}
//                     {order.status?.replaceAll("_", " ")}
//                   </p>
//                 </div>
//                 <div className="space-x-2">
//   <button
//     onClick={() => handleViewDesign(order._id)}
//     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//   >
//     View Design
//   </button>

//   <button
//     onClick={() => handleMarkAsPrinted(order._id)}
//     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//   >
//     Mark as Printed
//   </button>
// </div>

//               </div>
//             );
//           })}
//         </div>
//       )}

//       {modalOpen && selectedDesign && (
//         <DesignPreviewModal
//           imageUrl={selectedDesign}
//           onClose={() => setModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default PrintingDashboard;

import React, { useState } from "react";
import {
  useGetDesignCompleteOrdersQuery,
  useMarkOrderAsPrintedMutation,
} from "../slices/orderSlice";
import DesignPreviewModal from "../pages/DesignPreview";

const PrintingDashboard = () => {
  const { data, isLoading, error, refetch } = useGetDesignCompleteOrdersQuery();
  const [markAsPrinted] = useMarkOrderAsPrintedMutation();
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDesign = (order) => {
    // prefer designFiles[0] or designFileUrl if present
    const url = order.designFiles?.[0] || order.designFileUrl || null;
    setSelectedDesign(url);
    setModalOpen(true);
  };

  const handleMarkAsPrinted = async (orderId) => {
    try {
      await markAsPrinted(orderId).unwrap();
      // refresh list after status change
      if (refetch) refetch();
    } catch (err) {
      console.error("Error marking as printed:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load orders</p>;

  // backend response format: { orders: [] }
  const orders = data?.orders || [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Completed Orders for Printing</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No completed orders available.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const customerName =
              order.walkInCustomer?.name ||
              order.onlineCustomer?.name ||
              "Unknown";

            return (
              <div
                key={order._id}
                className="border p-4 rounded shadow flex justify-between items-center"
              >
                <div className="space-y-1">
                  <p>
                    <strong>Customer:</strong> {customerName}
                  </p>
                  <p>
                    <strong>Job Type:</strong> {order.jobType || "N/A"}
                  </p>
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {order.status?.replaceAll("_", " ")}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleViewDesign(order)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View Design
                  </button>

                  <button
                    onClick={() => handleMarkAsPrinted(order._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Mark as Printed
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && selectedDesign && (
        <DesignPreviewModal
          imageUrl={selectedDesign}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PrintingDashboard;
